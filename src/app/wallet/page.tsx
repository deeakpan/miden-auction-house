"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { WalletMultiButton } from "@demox-labs/miden-wallet-adapter-reactui";
import { useWallet } from "@demox-labs/miden-wallet-adapter-react";
import { WebClient, AccountId } from "@demox-labs/miden-sdk";
import { FaSpinner } from "react-icons/fa";

export default function Wallet() {
  const { publicKey, connected } = useWallet();
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [webClient, setWebClient] = useState<WebClient | null>(null);

  useEffect(() => {
    // Initialize the WebClient
    async function setupClient() {
      const client = await WebClient.createClient();
      setWebClient(client);
    }
    setupClient();
  }, []);

  useEffect(() => {
    if (!connected || !publicKey || !webClient) {
      setAssets([]);
      setError(null);
      return;
    }

    let cancelled = false;
    async function fetchAssets() {
      setLoading(true);
      setError(null);
      try {
        if (webClient && publicKey) {
          await webClient.syncState();
          const account = await webClient.getAccount(AccountId.fromHex(publicKey));
          if (account) {
            const vault = account.vault();
            const assets = vault.fungibleAssets();
            if (!cancelled) setAssets(assets);
          } else {
            if (!cancelled) setAssets([]);
          }
        }
      } catch (e: any) {
        console.error("Error fetching assets:", e);
        if (!cancelled) setError(e.message || "Failed to fetch assets");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchAssets();
    return () => {
      cancelled = true;
    };
  }, [connected, publicKey, webClient]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800 px-4 py-8">
      <div className="w-full max-w-md bg-neutral-900 rounded-2xl shadow-xl p-6 border border-neutral-800">
        <h1 className="text-2xl font-bold text-orange-400 mb-4 text-center">Miden Wallet</h1>
        <div className="flex flex-col items-center gap-6">
          <WalletMultiButton className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg py-2 px-4 transition-colors shadow w-full" />
        </div>

        {/* Asset display section */}
        {connected && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-neutral-200 mb-2 text-center">Your Assets</h2>
            {loading ? (
              <div className="flex justify-center items-center py-4">
                <FaSpinner className="animate-spin text-orange-400 text-2xl" />
              </div>
            ) : error ? (
              <div className="text-red-400 text-center py-2">{error}</div>
            ) : assets.length === 0 ? (
              <div className="text-neutral-400 text-center py-2">No assets found.</div>
            ) : (
              <ul className="divide-y divide-neutral-800">
                {assets.map((asset, i) => (
                  <li key={i} className="py-2 flex flex-col gap-1">
                    <span className="text-neutral-300 text-sm">Token: <span className="font-mono text-orange-300">{asset.faucetId().toString()}</span></span>
                    <span className="text-neutral-200 font-bold">Balance: {asset.amount().toString()}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="mt-6 text-center">
          <Link href="/">
            <span className="text-orange-400 hover:underline text-sm">&larr; Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 