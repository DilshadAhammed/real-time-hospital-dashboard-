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

    // OLD Field (Keep this for existing modules)
    availability: {
        type: Boolean,
        default: false // Simple available/unavailable toggle
    },

    // NEW Features (For Scheduled Availability)
    availabilitySlots: [
        {
            date: { type: String, required: true }, // YYYY-MM-DD
            startTime: { type: String, required: true }, // HH:MM
            endTime: { type: String, required: true }
        }
    ],

    recurringAvailability: [
        {
            day: { type: String, required: true }, // e.g., "Monday"
            startTime: { type: String, required: true },
            endTime: { type: String, required: true }
        }
    ],

    emergencyOverride: {
        type: Boolean,
        default: false // If doctor suddenly becomes unavailable
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
