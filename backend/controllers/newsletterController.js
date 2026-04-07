const Newsletter = require("../models/Newsletter");

const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    const subscriber = await Newsletter.create({ email });

    res.status(201).json(subscriber);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  subscribeNewsletter,
};