import { useDynamicContext } from '@dynamic-labs/sdk-react-core'

function AuthSection() {
  const { setShowAuthFlow } = useDynamicContext()

  const handleLogin = () => {
    setShowAuthFlow(true)
  }

  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="bg-bg-secondary border border-border rounded-2xl p-8 md:p-12 text-center shadow-lg max-w-lg w-full">
        <h2 className="text-3xl mb-4 text-text">Connect Your Wallet</h2>
        <p className="text-text-secondary mb-8 leading-relaxed">
          Sign in with Dynamic.xyz to get started. We'll create an embedded wallet
          for you to sign messages securely.
        </p>
        <button 
          className="bg-gradient-primary text-white border-none py-4 px-8 text-lg font-semibold rounded-lg cursor-pointer transition-all duration-300 w-full mb-4 hover:-translate-y-0.5 hover:shadow-[0_6px_12px_rgba(99,102,241,0.4)] active:translate-y-0" 
          onClick={handleLogin}
        >
          Sign In with Email
        </button>
        <p className="text-text-secondary text-sm italic">
          Your wallet will be created automatically when you sign in
        </p>
      </div>
    </div>
  )
}

export default AuthSection

