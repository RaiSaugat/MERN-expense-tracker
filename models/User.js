const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please enter user name'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Please enter email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expenses: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Expense',
    },
  ],
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);
