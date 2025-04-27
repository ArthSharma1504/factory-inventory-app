const mongoose = require('mongoose');

const consumptionSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  consumptionDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  purpose: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Consumption', consumptionSchema);