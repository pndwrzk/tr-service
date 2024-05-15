const dataRespone = require("../utils/respone");
const message = require("../contants/messageRespone");
const customerModel = require("../models/customerModel");
const schemaValidation = require("../utils/validationSchema");
const bcrypt = require("bcryptjs");

const create = async (req, res) => {
  try {
    const errorValidation = schemaValidation.addCustomerValidation.validate(
      req.body
    ).error;
    if (errorValidation) {
      return res
        .status(402)
        .json(dataRespone(message.error.status, null, errorValidation.message));
    }

    const customers = await customerModel.getCustomerByEmail(req.body.email);
    if (customers.length !== 0) {
      return res
        .status(400)
        .json(
          dataRespone(message.error.status, null, message.error.emailTaken)
        );
    }

    idCustomer = await customerModel.saveCustomer(req.body);
    return res
      .status(200)
      .json(
        dataRespone(
          message.success.status,
          { id: idCustomer },
          message.success.create
        )
      );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(dataRespone(message.error.status, null, error.message));
  }
};

const update = async (req, res) => {
  try {
    const idCustomer = req.params.id;
    const errorValidation = schemaValidation.addCustomerValidation.validate(
      req.body
    ).error;
    if (errorValidation) {
      return res
        .status(402)
        .json(dataRespone(message.error.status, null, errorValidation.message));
    }
    const customers = await customerModel.getCustomerByEmail(req.body.email);
    if (customers.length !== 0) {
      const customer = customers[0];
      if (customer.id === idCustomer) {
        return res
          .status(400)
          .json(
            dataRespone(message.error.status, null, message.error.emailTaken)
          );
      }
    }
    const affectedRows = await customerModel.updateCustomerById(
      idCustomer,
      req.body
    );

    if (affectedRows === 0) {
      return res
        .status(404)
        .json(dataRespone(message.error.status, null, message.error.notFound));
    }
    return res
      .status(200)
      .json(
        dataRespone(
          message.success.status,
          { id: idCustomer },
          message.success.update
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(dataRespone(message.error.status, null, error.message));
  }
};

const retriveAll = async (req, res) => {
  try {
    const employess = await customerModel.getAllCustomer();
    res
      .status(200)
      .json(
        dataRespone(message.success.status, employess, message.success.getData)
      );
  } catch (error) {
    return res
      .status(500)
      .json(dataRespone(message.error.status, null, error.message));
  }
};

const retrive = async (req, res) => {
  try {
    const idCustomer = req.params.id;
    const customers = await customerModel.getCustomerById(idCustomer);
    if (customers.length > 0) {
      const customer = customers[0];
      return res
        .status(200)
        .json(
          dataRespone(message.success.status, customer, message.success.getData)
        );
    }
    return res
      .status(404)
      .json(dataRespone(message.error.status, null, message.error.notFound));
  } catch (error) {
    return res
      .status(500)
      .json(dataRespone(message.error.status, null, error.message));
  }
};

const destroy = async (req, res) => {
  try {
    const idCustomer = req.params.id;
    const affectedRows = await customerModel.deleteById(idCustomer);
    if (affectedRows === 0) {
      return res
        .status(404)
        .json(dataRespone(message.error.status, null, message.error.notFound));
    }
    return res
      .status(200)
      .json(
        dataRespone(
          message.success.status,
          { id: idCustomer },
          message.success.delete
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(dataRespone(message.error.status, null, error.message));
  }
};

module.exports = {
  create,
  update,
  retrive,
  destroy,
  retriveAll,
};
