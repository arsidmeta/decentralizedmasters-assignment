interface MessageFormProps {
  message: string
  setMessage: (message: string) => void
  onSign: () => void
  isSigning: boolean
  error: string | null
}

function MessageForm({ message, setMessage, onSign, isSigning, error }: MessageFormProps) {
  return (
    <div className="w-full">
      <div className="bg-bg-secondary border border-border rounded-2xl p-8 shadow-md">
        <h2 className="text-2xl mb-2 text-text">Sign a Message</h2>
        <p className="text-text-secondary mb-6 text-[0.95rem]">
          Enter any message you'd like to sign with your wallet
        </p>

        <div className="mb-6">
          <label htmlFor="message" className="block text-text font-medium mb-2 text-[0.95rem]">
            Your Message
          </label>
          <textarea
            id="message"
            className="w-full p-4 bg-bg-tertiary border border-border rounded-lg text-text text-base font-inherit resize-y transition-colors focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:opacity-60 disabled:cursor-not-allowed placeholder:text-text-secondary placeholder:opacity-60"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            rows={5}
            disabled={isSigning}
          />
        </div>

        {error && (
          <div className="bg-error/10 border border-error rounded-lg p-4 mb-6 text-error">
            {error}
          </div>
        )}

        <button
          className="w-full bg-gradient-primary text-white border-none py-4 px-8 text-lg font-semibold rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-[0_6px_12px_rgba(99,102,241,0.4)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
          onClick={onSign}
          disabled={isSigning || !message.trim()}
        >
          {isSigning ? (
            <>
              <span className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin-slow"></span>
              Signing...
            </>
          ) : (
            'Sign Message'
          )}
        </button>
      </div>
    </div>
  )
}

export default MessageForm

