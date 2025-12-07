import { describe, it, expect, beforeEach } from 'vitest'
import request from 'supertest'
import express from 'express'
import verifySignatureRouter from '../verifySignature.js'
import { Wallet } from 'ethers'

const app = express()
app.use(express.json())
app.use('/api', verifySignatureRouter)

describe('POST /api/verify-signature', () => {
  it('should verify a valid signature', async () => {
    const wallet = Wallet.createRandom()
    const message = 'Test message'
    const signature = await wallet.signMessage(message)

    const response = await request(app)
      .post('/api/verify-signature')
      .send({ message, signature })
      .expect(200)

    expect(response.body.isValid).toBe(true)
    expect(response.body.signer.toLowerCase()).toBe(wallet.address.toLowerCase())
    expect(response.body.originalMessage).toBe(message)
  })

  it('should reject invalid signature', async () => {
    const wallet = Wallet.createRandom()
    const message = 'Test message'
    const wrongMessage = 'Wrong message'
    const signature = await wallet.signMessage(message)

    const response = await request(app)
      .post('/api/verify-signature')
      .send({ message: wrongMessage, signature })
      .expect(200)

    expect(response.body.isValid).toBe(false)
  })

  it('should return 400 for missing message', async () => {
    const wallet = Wallet.createRandom()
    const signature = await wallet.signMessage('test')

    const response = await request(app)
      .post('/api/verify-signature')
      .send({ signature })
      .expect(400)

    expect(response.body.error).toBe('Invalid request')
  })

  it('should return 400 for missing signature', async () => {
    const response = await request(app)
      .post('/api/verify-signature')
      .send({ message: 'test' })
      .expect(400)

    expect(response.body.error).toBe('Invalid request')
  })

  it('should return 400 for invalid message type', async () => {
    const response = await request(app)
      .post('/api/verify-signature')
      .send({ message: 123, signature: '0x123' })
      .expect(400)

    expect(response.body.error).toBe('Invalid request')
  })

  it('should return 400 for invalid signature type', async () => {
    const response = await request(app)
      .post('/api/verify-signature')
      .send({ message: 'test', signature: 123 })
      .expect(400)

    expect(response.body.error).toBe('Invalid request')
  })
})

