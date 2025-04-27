const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('../routes/productRoutes');
const purchaseRoutes = require('../routes/purchaseRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/purchases', purchaseRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('Factory Inventory Backend API');
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});