const maapingRespone = (status, data, message) => {
  const dataRespone = {
    status: status,
    data: data,
    message: message,
  };

  return dataRespone;
};

module.exports = maapingRespone;
