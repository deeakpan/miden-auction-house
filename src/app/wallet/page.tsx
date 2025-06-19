"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { WalletMultiButton } from "@demox-labs/miden-wallet-adapter-reactui";
import { useWallet } from "@demox-labs/miden-wallet-adapter-react";

export default function Wallet() {
  const { publicKey, connected, disconnect } = useWallet();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800 px-4 py-8">
      <div className="w-full max-w-md bg-neutral-900 rounded-2xl shadow-xl p-6 border border-neutral-800">
        <h1 className="text-2xl font-bold text-orange-400 mb-4 text-center">Miden Wallet</h1>
        <div className="flex flex-col items-center gap-6">
          <WalletMultiButton className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg py-2 px-4 transition-colors shadow w-full" />
          {connected && (
            <>
              <div className="w-full text-center mb-4">
                <div className="text-neutral-300 text-sm mb-2">Connected Account</div>
                <div className="text-orange-300 font-mono text-lg break-all">{publicKey?.toString()}</div>
              </div>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg py-2 px-4 transition-colors shadow w-full"
                onClick={disconnect}
              >
                Disconnect
              </button>
            </>
          )}
        </div>
        <div className="mt-6 text-center">
          <Link href="/">
            <span className="text-orange-400 hover:underline text-sm">&larr; Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 