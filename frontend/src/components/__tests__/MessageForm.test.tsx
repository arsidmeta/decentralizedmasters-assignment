import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import MessageForm from '../MessageForm'

describe('MessageForm', () => {
  const mockProps = {
    message: '',
    setMessage: vi.fn(),
    onSign: vi.fn(),
    isSigning: false,
    error: null,
  }

  it('renders the form correctly', () => {
    render(<MessageForm {...mockProps} />)
    
    expect(screen.getByText('Sign a Message')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Type your message here...')).toBeInTheDocument()
    expect(screen.getByText('Sign Message')).toBeInTheDocument()
  })

  it('calls setMessage when textarea changes', () => {
    render(<MessageForm {...mockProps} />)
    
    const textarea = screen.getByPlaceholderText('Type your message here...')
    fireEvent.change(textarea, { target: { value: 'Test message' } })
    
    expect(mockProps.setMessage).toHaveBeenCalledWith('Test message')
  })

  it('calls onSign when sign button is clicked', () => {
    render(<MessageForm {...mockProps} message="Test message" />)
    
    const signButton = screen.getByText('Sign Message')
    fireEvent.click(signButton)
    
    expect(mockProps.onSign).toHaveBeenCalled()
  })

  it('disables sign button when message is empty', () => {
    render(<MessageForm {...mockProps} message="" />)
    
    const signButton = screen.getByText('Sign Message')
    expect(signButton).toBeDisabled()
  })

  it('disables sign button when signing', () => {
    render(<MessageForm {...mockProps} message="Test" isSigning={true} />)
    
    const signButton = screen.getByText('Signing...')
    expect(signButton).toBeDisabled()
  })

  it('displays error message when error is provided', () => {
    render(<MessageForm {...mockProps} error="Test error" />)
    
    expect(screen.getByText('Test error')).toBeInTheDocument()
  })

  it('shows loading state when signing', () => {
    render(<MessageForm {...mockProps} message="Test" isSigning={true} />)
    
    expect(screen.getByText('Signing...')).toBeInTheDocument()
    expect(screen.queryByText('Sign Message')).not.toBeInTheDocument()
  })
})

