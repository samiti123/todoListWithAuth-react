import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

export default mongoose.model('Auth', userSchema);
