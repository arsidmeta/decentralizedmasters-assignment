import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import SignatureHistory from '../SignatureHistory'
import { SignatureRecord } from '../MessageSigner'

describe('SignatureHistory', () => {
  const mockHistory: SignatureRecord[] = [
    {
      id: '1',
      message: 'Hello World',
      signature: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      timestamp: Date.now(),
      verificationResult: {
        isValid: true,
        signer: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        originalMessage: 'Hello World',
      },
    },
    {
      id: '2',
      message: 'Invalid message',
      signature: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      timestamp: Date.now() - 1000,
      verificationResult: {
        isValid: false,
        signer: '0x0000000000000000000000000000000000000000',
        originalMessage: 'Invalid message',
      },
    },
  ]

  it('renders history items', () => {
    const onClear = vi.fn()
    render(<SignatureHistory history={mockHistory} onClear={onClear} />)
    
    expect(screen.getByText('Signature History')).toBeInTheDocument()
    expect(screen.getByText('Hello World')).toBeInTheDocument()
    expect(screen.getByText('Invalid message')).toBeInTheDocument()
  })

  it('shows valid status for valid signatures', () => {
    const onClear = vi.fn()
    render(<SignatureHistory history={[mockHistory[0]]} onClear={onClear} />)
    
    expect(screen.getByText('Valid')).toBeInTheDocument()
  })

  it('shows invalid status for invalid signatures', () => {
    const onClear = vi.fn()
    render(<SignatureHistory history={[mockHistory[1]]} onClear={onClear} />)
    
    expect(screen.getByText('Invalid')).toBeInTheDocument()
  })

  it('calls onClear when clear button is clicked', () => {
    const onClear = vi.fn()
    render(<SignatureHistory history={mockHistory} onClear={onClear} />)
    
    const clearButton = screen.getByText('Clear History')
    clearButton.click()
    
    expect(onClear).toHaveBeenCalled()
  })

  it('renders empty state when history is empty', () => {
    const onClear = vi.fn()
    render(<SignatureHistory history={[]} onClear={onClear} />)
    
    expect(screen.getByText('Signature History')).toBeInTheDocument()
  })
})

