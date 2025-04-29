const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/index');
const Product = require('../models/Product');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

describe('Product API', () => {
  let token;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create a test user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = new User({ username: 'testuser', password: hashedPassword });
    await user.save();

    // Generate JWT
    token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Product.deleteMany({});
  });

  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Detergent',
        category: 'Cleaning',
        unit: 'Liters',
        currentStock: 100,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'Detergent');
  });

  it('should get all products', async () => {
    await new Product({
      name: 'Detergent',
      category: 'Cleaning',
      unit: 'Liters',
      currentStock: 100,
    }).save();

    const res = await request(app)
      .get('/api/products')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('name', 'Detergent');
  });

  it('should return 401 for unauthorized access', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        name: 'Detergent',
        category: 'Cleaning',
        unit: 'Liters',
        currentStock: 100,
      });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'No token provided');
  });
});