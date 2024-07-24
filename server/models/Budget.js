const { Schema, model } = require('mongoose');

const budgetSchema = new Schema({
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

const Budget = model('Budget', budgetSchema);

module.exports = Budget;