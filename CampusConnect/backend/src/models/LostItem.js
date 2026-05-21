const mongoose = require('mongoose');

const lostItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itemName: { type: String, required: true },
  description: { type: String, required: true },
  lastSeenLocation: { type: String },
  dateLost: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['Reported Lost', 'Searching', 'Found at Campus', 'Returned'],
    default: 'Reported Lost'
  },
  adminNotes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('LostItem', lostItemSchema);
