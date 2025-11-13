
jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    checkout: {
      sessions: {
        create: jest.fn().mockResolvedValue({ url: 'https://stripe.com/checkout-session' })
      }
    }
  }));
});

const request = require('supertest');
const express = require('express');
const app = require('./index');

describe('API Endpoints', () => {
  it('should reject missing fields for /create-checkout-session', async () => {
    const res = await request(app)
      .post('/create-checkout-session')
      .send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Missing required fields.');
  });

  it('should reject invalid email for /create-checkout-session', async () => {
    const res = await request(app)
      .post('/create-checkout-session')
      .send({ amount: 10, name: 'Test', email: 'not-an-email' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid email address.');
  });

  it('should reject invalid amount for /create-checkout-session', async () => {
    const res = await request(app)
      .post('/create-checkout-session')
      .send({ amount: 0, name: 'Test', email: 'test@example.com' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid amount.');
  });

  it('should reject missing fields for /api/sponsors', async () => {
    const res = await request(app)
      .post('/api/sponsors')
      .send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Missing required fields.');
  });

  it('should reject invalid email for /api/sponsors', async () => {
    const res = await request(app)
      .post('/api/sponsors')
      .send({ amount: 10, name: 'Test', email: 'not-an-email' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid email address.');
  });

  it('should reject invalid amount for /api/sponsors', async () => {
    const res = await request(app)
      .post('/api/sponsors')
      .send({ amount: 0, name: 'Test', email: 'test@example.com' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid amount.');
  });
});
