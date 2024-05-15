const generatePagging = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.page_size) || 10;
  const sortBy = req.query.sort_by || "id";
  const orderBy = req.query.order_by || "asc";
  const offset = (page - 1) * pageSize;

  req.pagging = {
    page,
    pageSize,
    sortBy,
    orderBy,
    offset,
  };
  next();
};

module.exports = generatePagging;
