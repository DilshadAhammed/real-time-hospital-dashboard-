const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("Could not connect to MongoDB:", error));

// Import Routes
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/doctor', require('./routes/doctorRouter'))
app.use('/api/auth/', require('./routes/authRoutes'))
app.use('/api/hospitals', require('./routes/hospitalsRouter'))
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
