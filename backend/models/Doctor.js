// models/Doctor.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    specialty: {
        type: String,
        required: true
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
    availability: {
        type: Boolean,
        default: false // Set default availability to false
    },
    role: { type: String, default: 'doctor' }
});

// Password hashing middleware
doctorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('Doctor', doctorSchema);
