const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const router = require('./route');

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Default Route (Prevents 404)
app.get("/", (req, res) => {
    res.send("Backend is working!");
});

// ✅ Use Routes
app.use('/api', router);

// ✅ Connect to MongoDB (Replace with your MongoDB Atlas URI)
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));

// ✅ Start the Server (Use process.env.PORT for Vercel)
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
