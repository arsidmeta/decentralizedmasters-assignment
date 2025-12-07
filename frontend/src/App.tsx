import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import MessageSigner from "./components/MessageSigner";

const queryClient = new QueryClient();

const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

function App() {
  const dynamicApiKey = import.meta.env.VITE_DYNAMIC_API_KEY || "";

  if (!dynamicApiKey) {
    return (
      <div className="min-h-screen flex flex-col items-center p-8 max-w-6xl mx-auto">
        <div className="text-center p-8 bg-bg-secondary rounded-xl border border-error mt-16">
          <h1 className="text-error mb-4">Configuration Error</h1>
          <p>Please set VITE_DYNAMIC_API_KEY in your .env file</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <DynamicContextProvider
        settings={{
          environmentId: dynamicApiKey,
        }}
      >
        <WagmiProvider config={wagmiConfig}>
          <DynamicWagmiConnector>
            <div className="min-h-screen flex flex-col items-center p-8 max-w-6xl mx-auto md:p-8 p-4">
              <MessageSigner />
            </div>
          </DynamicWagmiConnector>
        </WagmiProvider>
      </DynamicContextProvider>
    </QueryClientProvider>
  );
}

export default App;
