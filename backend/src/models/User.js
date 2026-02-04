const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  strongTopics: [String],
  weakTopics: [String],
  accuracy: {
    type: Number,
    default: 0,
  },
  progress: {
    type: Map,
    of: {
      level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
      score: { type: Number, default: 0 },
      attempts: { type: Number, default: 0 }
    },
    default: {}
  }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
