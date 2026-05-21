const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  category: {
    type: String,
    enum: ['Hackathon', 'Club Meet', 'Festival', 'Other'],
    default: 'Other'
  },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
