import { SignatureRecord } from "./MessageSigner";

interface SignatureHistoryProps {
  history: SignatureRecord[];
  onClear: () => void;
}

function SignatureHistory({ history, onClear }: SignatureHistoryProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const truncateSignature = (signature: string) => {
    return `${signature.slice(0, 20)}...${signature.slice(-10)}`;
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6 md:flex-row flex-col md:items-center items-start gap-4">
        <h2 className="text-2xl text-text">Signature History</h2>
        <button 
          className="bg-transparent border border-border text-text-secondary py-2 px-4 rounded-lg cursor-pointer text-sm transition-all duration-200 hover:bg-bg-tertiary hover:text-text hover:border-error"
          onClick={onClear}
        >
          Clear History
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {history.map((record) => (
          <div
            key={record.id}
            className={`bg-bg-secondary border border-border rounded-xl p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
              record.verificationResult?.isValid 
                ? "border-l-4 border-l-success" 
                : "border-l-4 border-l-error"
            }`}
          >
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-border md:flex-row flex-col md:items-center items-start gap-2">
              <div className={`flex items-center gap-2 py-1.5 px-3 rounded-md text-sm font-semibold ${
                record.verificationResult?.isValid
                  ? "bg-success/10 text-success"
                  : "bg-error/10 text-error"
              }`}>
                {record.verificationResult?.isValid ? "Valid" : "Invalid"}
              </div>
              <span className="text-text-secondary text-sm">
                {formatDate(record.timestamp)}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-text-secondary text-sm font-medium uppercase tracking-wider">Message:</span>
                <span className="text-text text-[0.95rem] break-words">{record.message}</span>
              </div>

              {record.verificationResult && (
                <div className="flex flex-col gap-1">
                  <span className="text-text-secondary text-sm font-medium uppercase tracking-wider">Signer:</span>
                  <span className="font-mono text-primary-light bg-bg-tertiary p-2 rounded-md text-[0.95rem] break-words">
                    {truncateAddress(record.verificationResult.signer)}
                  </span>
                </div>
              )}

              <div className="flex flex-col gap-1">
                <span className="text-text-secondary text-sm font-medium uppercase tracking-wider">Signature:</span>
                <span className="font-mono text-primary-light bg-bg-tertiary p-2 rounded-md text-[0.95rem] break-words">
                  {truncateSignature(record.signature)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SignatureHistory;
