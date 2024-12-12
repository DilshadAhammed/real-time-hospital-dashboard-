// seed.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/adminModel'); // Adjust path as needed to match where User model is defined
require('dotenv').config();

const adminData = {
  name: 'Admin',
  email: 'dilshadnakunnath@gmail.com',
  password: 'admin1553CU63D',
  role: 'admin',
};

async function seedAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');


    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);

    // Create and save the admin user
    const admin = new Admin({
      name: adminData.name,
      email: adminData.email,
      password: hashedPassword,
      role: adminData.role,
    });

    await admin.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedAdmin();
