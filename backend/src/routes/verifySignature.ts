import { Router } from 'express'
import { verifyMessage } from '../services/signatureVerifier.js'

const router = Router()

interface VerifyRequest {
  message: string
  signature: string
}

router.post('/verify-signature', async (req, res) => {
  try {
    const { message, signature }: VerifyRequest = req.body

    // Validate input
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Message is required and must be a string',
      })
    }

    if (!signature || typeof signature !== 'string') {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Signature is required and must be a string',
      })
    }

    // Verify the signature
    const result = await verifyMessage(message, signature)

    res.json({
      isValid: result.isValid,
      signer: result.signer,
      originalMessage: message,
    })
  } catch (error) {
    console.error('Error verifying signature:', error)
    res.status(500).json({
      error: 'Failed to verify signature',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

export default router

