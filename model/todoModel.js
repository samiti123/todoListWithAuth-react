import mongoose from 'mongoose';

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auth',
  },
});

export default mongoose.model('Todo', todoSchema);
