import { describe, it, expect } from 'vitest'
import { verifyMessage } from '../signatureVerifier.js'
import { Wallet } from 'ethers'

describe('signatureVerifier', () => {
  it('should verify a valid signature', async () => {
    const wallet = Wallet.createRandom()
    const message = 'Hello, Web3!'
    
    // Sign the message
    const signature = await wallet.signMessage(message)
    
    // Verify the signature
    const result = await verifyMessage(message, signature)
    
    expect(result.isValid).toBe(true)
    expect(result.signer.toLowerCase()).toBe(wallet.address.toLowerCase())
  })

  it('should reject an invalid signature', async () => {
    const wallet = Wallet.createRandom()
    const message = 'Hello, Web3!'
    const wrongMessage = 'Wrong message!'
    
    // Sign the message
    const signature = await wallet.signMessage(message)
    
    // Try to verify with wrong message
    const result = await verifyMessage(wrongMessage, signature)
    
    expect(result.isValid).toBe(false)
  })

  it('should reject a malformed signature', async () => {
    const message = 'Hello, Web3!'
    const invalidSignature = '0xinvalid'
    
    const result = await verifyMessage(message, invalidSignature)
    
    expect(result.isValid).toBe(false)
  })

  it('should handle empty message', async () => {
    const wallet = Wallet.createRandom()
    const message = ''
    
    const signature = await wallet.signMessage(message)
    const result = await verifyMessage(message, signature)
    
    expect(result.isValid).toBe(true)
    expect(result.signer.toLowerCase()).toBe(wallet.address.toLowerCase())
  })

  it('should handle long messages', async () => {
    const wallet = Wallet.createRandom()
    const message = 'A'.repeat(1000)
    
    const signature = await wallet.signMessage(message)
    const result = await verifyMessage(message, signature)
    
    expect(result.isValid).toBe(true)
    expect(result.signer.toLowerCase()).toBe(wallet.address.toLowerCase())
  })
})

