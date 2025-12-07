import { verifyMessage as ethersVerifyMessage } from 'ethers'

export interface VerificationResult {
  isValid: boolean
  signer: string
}

/**
 * Verifies an Ethereum message signature using ethers.js
 * @param message - The original message that was signed
 * @param signature - The signature to verify
 * @returns Verification result with validity and signer address
 */
export async function verifyMessage(
  message: string,
  signature: string
): Promise<VerificationResult> {
  try {
    // Recover the signer address from the signature
    const recoveredAddress = await ethersVerifyMessage(message, signature)

    // Normalize addresses to lowercase for comparison
    const normalizedRecovered = recoveredAddress.toLowerCase()

    return {
      isValid: true,
      signer: normalizedRecovered,
    }
  } catch (error) {
    // If verification fails, the signature is invalid
    console.error('Signature verification failed:', error)
    return {
      isValid: false,
      signer: '0x0000000000000000000000000000000000000000',
    }
  }
}

