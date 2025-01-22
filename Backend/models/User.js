const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Simple email regex
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: { type: String, required: true, minlength: 8 },
    contactNumber: { type: String },
    location: { type: String },
    role: { type: String, enum: ['sponsor', 'seeker'], required: true, default: 'seeker' },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

// Pre-save hook for password hashing
UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
