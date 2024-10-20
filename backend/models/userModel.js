const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please Enter your name"]
    },
    district: {
        type: String,
        required: [true, "please Enter your district"]
    },
    address: {
        type: String,
        required: [true, "please Enter your address"]

    },
    t_local_body:{
        type: String,
        required:[true,"please Enter your type of local body"]
    },
    n_local_body:{
        type: String,
        required:[true,"please Enter your name of local body"]
    },
    email:{
        type: String,
        required: [true, "please Enter your email"],
        unique: true
    },
    mobile: {
        type: Number,
        required: [true, "please Enter your Mobile No"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "please Enter your password"],
        // minlength: [8, "password must be at least 8 characters"],
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)