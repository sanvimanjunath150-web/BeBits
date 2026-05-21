const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  category: { 
    type: String, 
    enum: ['Books', 'Electronics', 'Lab Gear', 'Other'],
    default: 'Other'
  },
  status: { 
    type: String,
    enum: ['Available', 'Sold'],
    default: 'Available'
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
