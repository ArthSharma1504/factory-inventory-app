const Consumption = require('../models/Consumption');
const Product = require('../models/Product');

exports.createConsumption = async (req, res) => {
  try {
    const { productId, departmentId, quantity, consumptionDate, purpose } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.currentStock < quantity) return res.status(400).json({ message: 'Insufficient stock' });

    const consumption = new Consumption({
      product: productId,
      department: departmentId,
      quantity,
      consumptionDate,
      purpose,
    });
    await consumption.save();

    // Update product stock
    product.currentStock -= quantity;
    await product.save();

    res.status(201).json(consumption);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getConsumptions = async (req, res) => {
  try {
    const consumptions = await Consumption.find().populate('product department');
    res.status(200).json(consumptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getConsumptionById = async (req, res) => {
  try {
    const consumption = await Consumption.findById(req.params.id).populate('product department');
    if (!consumption) return res.status(404).json({ message: 'Consumption not found' });
    res.status(200).json(consumption);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};