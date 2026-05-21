const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  studentId: { type: String, required: true },
  major: { type: String, required: true },
  year: { type: String },
  bio: { type: String },
  skills: [{ type: String }],
  interests: [{ type: String }],
  openToCollaborate: { type: Boolean, default: true },
  badges: [{ type: String, default: 'Student' }],
  roles: [{
    title: String,
    organization: String,
    category: String,
  }],
}, { timestamps: true });

// Password hashing middleware
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
