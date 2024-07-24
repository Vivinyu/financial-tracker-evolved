const { Schema, model } = require('mongoose');

const incomeSchema = new Schema({
  source: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Income = model('Income', incomeSchema);

module.exports = Income;