import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    paymentHistory: {
      missedPayments: { type: Number, default: 0 },
      onTimePayments: { type: Number, default: 0 },
    },
    creditUtilization: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    creditMix: {
      creditCard: Boolean,
      autoLoan: Boolean,
      homeLoan: Boolean,
      personalLoan: Boolean,
    },
    creditHistory: {
      yearsActive: { type: Number, default: 0 },
      accountAge: { type: Date },
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
