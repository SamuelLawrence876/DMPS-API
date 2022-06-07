const CloudProduct = require("../models/CloudProductRequest/CloudProduct");

const createNewOrder = async (req, res) => {
  const { FullName, Email, price, wallet, discount, createdAt } = req.body;
  try {
    const order = await CloudProduct.create({
      FullName: FullName,
      price: price,
      Email: Email,
      wallet: wallet,
      discount: discount,
      createdAt: createdAt,
    });

    console.log(order);

    res.status(201).json({ success: `Order Made!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createNewOrder,
};
