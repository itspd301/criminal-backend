const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const router = require('./route');

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Debugging logs
console.log("🚀 Server is starting...");

// ✅ Default Route
app.get("/", (req, res) => {
    res.send("Backend is working!");
});

// ✅ Register API Routes
app.use('/api', router);

// ✅ Debugging: Log all routes
app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        console.log(`📌 Registered Route: ${r.route.path}`);
    }
});

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.log("❌ MongoDB Connection Error:", err));

// ✅ Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
