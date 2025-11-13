const winston = require('winston');

// Setup winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'backend.log' }),
    new winston.transports.Console()
  ]
});
const validator = require('validator');
const rateLimit = require('express-rate-limit');

// Apply rate limiting to sensitive endpoints
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('./db');

const app = express();
const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:3000'];
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy: Not allowed by CORS'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());

// Create Stripe Checkout session
app.post('/create-checkout-session', limiter, async (req, res) => {
  let { amount, name, email, intendedCustomer } = req.body;
  // Sanitize and validate input
  name = validator.escape(String(name ?? ''));
  email = String(email ?? '').trim();
  intendedCustomer = validator.escape(String(intendedCustomer ?? ''));
  if (amount === undefined || name === '' || email === '') return res.status(400).json({ error: 'Missing required fields.' });
  if (!validator.isEmail(email)) return res.status(400).json({ error: 'Invalid email address.' });
  if (!validator.isInt(String(amount), { min: 1 })) return res.status(400).json({ error: 'Invalid amount.' });
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price_data: { currency: 'usd', product_data: { name: `Sponsor: ${name}` }, unit_amount: amount * 100 }, quantity: 1 }],
      mode: 'payment',
      success_url: process.env.FRONTEND_URL + '/sponsors?success=true',
      cancel_url: process.env.FRONTEND_URL + '/sponsors?canceled=true',
      metadata: { intendedCustomer, sponsorName: name, sponsorEmail: email },
      customer_email: email,
    });
    logger.info('Stripe session created', { name, email, amount, intendedCustomer });
    res.json({ url: session.url });
  } catch (err) {
    logger.error('Stripe error', { error: err.message, name, email, amount });
    res.status(500).json({ error: 'Stripe error.' });
  }
});

// Save sponsor (demo, not real payment)
app.post('/api/sponsors', limiter, async (req, res) => {
  let { name, email, amount } = req.body;
  // Sanitize and validate input
  name = validator.escape(String(name ?? ''));
  email = String(email ?? '').trim();
  if (amount === undefined || name === '' || email === '') return res.status(400).json({ error: 'Missing required fields.' });
  if (!validator.isEmail(email)) return res.status(400).json({ error: 'Invalid email address.' });
  if (!validator.isInt(String(amount), { min: 1 })) return res.status(400).json({ error: 'Invalid amount.' });
  try {
    const sponsorId = await db.addSponsor({ name, email, amount });
    logger.info('Sponsor saved', { name, email, amount, sponsorId });
    res.json({ demo: true, sponsorId });
  } catch (err) {
    logger.error('DB error', { error: err.message, name, email, amount });
    res.status(500).json({ error: 'DB error.' });
  }
});

// Get sponsors
app.get('/api/sponsors', async (req, res) => {
  try {
    const sponsors = await db.getSponsors();
    res.json(sponsors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error.' });
  }
});


module.exports = app;
