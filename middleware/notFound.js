// route not found
const notFound = (req, res) => {
  res.status(404).send({ message: "unknown route" });
};

module.exports = notFound;
