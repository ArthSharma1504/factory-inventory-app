const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Cleaning', 'Maintenance', 'Other'],
  },
  unit: {
    type: String,
    required: true,
    enum: ['Liters', 'Pieces', 'Kilograms', 'Other'],
  },
  currentStock: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);