import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useAccount, useSignMessage } from "wagmi";
import { useState, useEffect } from "react";
import AuthSection from "./AuthSection";
import MessageForm from "./MessageForm";
import SignatureHistory from "./SignatureHistory";

export interface SignatureRecord {
  id: string;
  message: string;
  signature: string;
  timestamp: number;
  verificationResult?: {
    isValid: boolean;
    signer: string;
    originalMessage: string;
  };
}

const STORAGE_KEY = "web3_message_signatures";

function MessageSigner() {
  const { isAuthenticated, primaryWallet, setShowAuthFlow } =
    useDynamicContext();
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [message, setMessage] = useState("");
  const [isSigning, setIsSigning] = useState(false);
  const [history, setHistory] = useState<SignatureRecord[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Get wallet address from either source
  const walletAddress = address || primaryWallet?.address;

  // Close auth modal when authentication is successful
  useEffect(() => {
    if (isAuthenticated) {
      setShowAuthFlow(false);
    }
  }, [isAuthenticated, setShowAuthFlow]);

  // Debug: Log wallet connection status
  useEffect(() => {
    if (isAuthenticated) {
      console.log("Auth status:", {
        isAuthenticated,
        hasPrimaryWallet: !!primaryWallet,
        primaryWalletAddress: primaryWallet?.address,
        wagmiAddress: address,
        isConnected,
        walletAddress,
      });
    }
  }, [isAuthenticated, primaryWallet, address, isConnected, walletAddress]);

  // Load history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load history from localStorage", e);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
  }, [history]);

  const handleSignMessage = async () => {
    if (!message.trim()) {
      setError("Please enter a message to sign");
      return;
    }

    if (!isAuthenticated || !primaryWallet) {
      setError(
        "Please connect your wallet first. Make sure you have completed the authentication flow."
      );
      return;
    }

    if (!walletAddress) {
      setError(
        "Wallet address not available yet. Please wait for the connection to complete."
      );
      return;
    }

    setIsSigning(true);
    setError(null);

    try {
      // Sign the message
      const signature = await signMessageAsync({
        message: message.trim(),
      });

      // Send to backend for verification
      const apiUrl = import.meta.env.VITE_API_URL || "";
      const apiEndpoint = apiUrl 
        ? `${apiUrl}/api/verify-signature`
        : "/api/verify-signature";
      
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message.trim(),
          signature,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to verify signature");
      }

      const verificationResult = await response.json();

      // Add to history
      const newRecord: SignatureRecord = {
        id: Date.now().toString(),
        message: message.trim(),
        signature,
        timestamp: Date.now(),
        verificationResult,
      };

      setHistory((prev) => [newRecord, ...prev]);
      setMessage("");
    } catch (err) {
      console.error("Error signing message:", err);
      setError(err instanceof Error ? err.message : "Failed to sign message");
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <header className="text-center mb-12 py-8">
        <h1 className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          Web3 Message Signer
        </h1>
        <p className="text-text-secondary text-lg md:text-xl">
          Sign and verify messages with your Web3 wallet
        </p>
      </header>

      {!isAuthenticated ? (
        <AuthSection />
      ) : (
        <div className="flex flex-col gap-8">
          <div className="bg-bg-secondary border border-border rounded-xl p-6 shadow-md">
            <div className="flex flex-col gap-2">
              <span className="text-text-secondary text-sm font-medium">Connected Wallet:</span>
              <span className="font-mono text-primary-light text-base break-all p-3 bg-bg-tertiary rounded-lg">
                {walletAddress ||
                  (isAuthenticated && primaryWallet
                    ? "Connecting..."
                    : "Not connected")}
              </span>
            </div>
            {isAuthenticated && !walletAddress && (
              <div className="mt-4 p-3 bg-warning/10 border border-warning rounded-lg text-warning text-sm">
                {primaryWallet
                  ? "Wallet connection in progress. Please wait a moment..."
                  : "Waiting for wallet to be created..."}
              </div>
            )}
          </div>

          <MessageForm
            message={message}
            setMessage={setMessage}
            onSign={handleSignMessage}
            isSigning={isSigning}
            error={error}
          />

          {history.length > 0 && (
            <SignatureHistory
              history={history}
              onClear={() => {
                setHistory([]);
                localStorage.removeItem(STORAGE_KEY);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default MessageSigner;
