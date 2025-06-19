"use client";
import Image from "next/image";
import { FaPlusCircle, FaClock, FaWallet, FaHourglassEnd, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import React from "react";

const mockAuctions = [
  {
    id: 1,
    name: 'CAPRICE',
    image: '/public/globe.svg',
    description: 'A rare digital collectible with unique traits.',
    item: '4000 CAPRICE',
    endDate: '2024-07-10T18:00:00',
    ended: false,
    creator: '0xA1B2...C3D4',
    creatorAvatar: '/public/window.svg',
  },
  {
    id: 2,
    name: 'Miden Gem',
    image: '/public/window.svg',
    description: 'A sparkling gem from the Miden universe.',
    item: '20000 GOLD',
    endDate: '2024-07-12T20:00:00',
    ended: false,
    creator: '0xE5F6...A7B8',
    creatorAvatar: '/public/globe.svg',
  },
  {
    id: 3,
    name: 'Shadow Art',
    image: '/public/file.svg',
    description: 'A mysterious piece of generative art.',
    item: '700 GEMSTONE',
    endDate: '2024-07-01T15:30:00',
    ended: true,
    creator: '0xC9D0...E1F2',
    creatorAvatar: '/public/file.svg',
  },
];

const navLinks = [
  { name: 'Start Auction', icon: <FaPlusCircle />, href: '#' },
  { name: 'Pending Auctions', icon: <FaHourglassEnd />, href: '#' },
  { name: 'Wallet', icon: <FaWallet />, href: '#' },
];

function timeLeft(endDate: string) {
  const end = new Date(endDate).getTime();
  const now = Date.now();
  const diff = end - now;
  if (diff <= 0) return 'Ended';
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m left`;
}

export default function Home() {
  const [tab, setTab] = useState<'live' | 'ended'>('live');
  const [activeNav, setActiveNav] = useState('Start Auction');
  const filteredAuctions = mockAuctions.filter(a => tab === 'live' ? !a.ended : a.ended);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 flex font-sans">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-56 bg-neutral-900 border-r border-neutral-800 shadow-2xl py-8 px-4 gap-6 min-h-screen">
        <div className="flex flex-col items-center mb-4">
          <div className="text-xl font-extrabold font-serif text-orange-400 tracking-tight">Miden AuctionHouse</div>
        </div>
        <hr className="border-t-2 border-orange-400 mb-2" />
        <nav className="flex flex-col gap-2 mt-0">
          {navLinks.map((link, idx) => (
            <React.Fragment key={link.name}>
              <a
                href={link.href}
                onClick={() => setActiveNav(link.name)}
                className={`flex items-center gap-2 px-3 py-2 rounded font-medium text-base transition-colors ${activeNav === link.name ? 'bg-orange-500/10 text-orange-400 border-l-4 border-orange-400' : 'text-neutral-200 hover:bg-neutral-800 hover:text-orange-300'}`}
              >
                <span className={activeNav === link.name ? 'text-orange-400' : 'text-orange-300'}>{link.icon}</span>
                {link.name}
              </a>
              {idx < navLinks.length - 1 && <hr className="border-t border-neutral-700 mx-2" />}
            </React.Fragment>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Nav */}
        <nav className="md:hidden w-full px-4 py-3 flex items-center justify-between bg-neutral-900 border-b border-neutral-800 shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-lg font-extrabold font-serif text-orange-400 tracking-tight">Miden AuctionHouse</span>
          </div>
          <div className="relative">
            <input type="checkbox" id="menu-toggle" className="peer hidden" />
            <label htmlFor="menu-toggle" className="flex flex-col cursor-pointer">
              <span className="w-7 h-1 bg-neutral-300 mb-1 rounded transition-all"></span>
              <span className="w-7 h-1 bg-neutral-300 mb-1 rounded transition-all"></span>
              <span className="w-7 h-1 bg-neutral-300 rounded transition-all"></span>
            </label>
            <div className="absolute right-0 mt-2 w-44 bg-neutral-900 rounded-lg shadow-lg py-2 flex-col gap-2 hidden peer-checked:flex z-20 border border-neutral-800">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveNav(link.name)}
                  className={`block px-4 py-2 text-neutral-200 hover:bg-neutral-800 hover:text-orange-300 ${activeNav === link.name ? 'bg-orange-500/10 text-orange-400 border-l-4 border-orange-400' : ''}`}
                >
                  <span className="inline-block mr-2 align-middle text-orange-300">{link.icon}</span>
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Tabs */}
        <div className="w-full max-w-3xl mx-auto px-2 pt-8 pb-2 flex gap-2 md:gap-6">
          <button
            className={`px-5 py-2 rounded-full font-semibold text-base md:text-lg transition-colors border-2 ${tab === 'live' ? 'border-orange-400 text-orange-300 bg-neutral-800 shadow' : 'border-transparent text-neutral-400 bg-transparent'}`}
            onClick={() => setTab('live')}
          >
            Live Auctions
          </button>
          <button
            className={`px-5 py-2 rounded-full font-semibold text-base md:text-lg transition-colors border-2 ${tab === 'ended' ? 'border-orange-400 text-orange-300 bg-neutral-800 shadow' : 'border-transparent text-neutral-400 bg-transparent'}`}
            onClick={() => setTab('ended')}
          >
            Ended
          </button>
        </div>

        {/* Auction Feed */}
        <main className="max-w-3xl mx-auto px-2 pb-8">
          <div className="flex flex-col gap-8">
            {filteredAuctions.length === 0 ? (
              <div className="text-center text-neutral-500 py-12 text-lg font-medium">No auctions to display.</div>
            ) : (
              filteredAuctions.map((auction) => (
                <div
                  key={auction.id}
                  className="bg-neutral-900 rounded-3xl shadow-xl flex flex-col md:flex-row items-center md:items-stretch gap-6 p-6 border border-neutral-800 hover:shadow-2xl transition-shadow group"
                >
                  <div className="w-full md:w-48 flex-shrink-0 flex items-center justify-center">
                    <Image
                      src={auction.image}
                      alt={auction.name}
                      width={120}
                      height={120}
                      className="rounded-2xl object-contain bg-neutral-800 shadow-md"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between w-full">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl font-bold font-serif text-neutral-100">{auction.name}</span>
                    </div>
                    <div className="text-xs text-neutral-400 mb-2">Item: <span className="text-orange-300 font-semibold">{auction.item}</span></div>
                    <p className="text-neutral-300 mb-3 text-sm md:text-base">{auction.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="flex items-center gap-2 text-xs text-neutral-400">
                        <FaClock className="text-orange-400" />
                        {auction.ended ? 'Ended' : timeLeft(auction.endDate)}
                      </span>
                      {tab === 'live' ? (
                        <button className="bg-orange-500 text-white px-6 py-2 rounded-xl font-semibold shadow hover:bg-orange-600 transition-colors text-base group-hover:scale-105 group-hover:shadow-lg transform">Bid</button>
                      ) : (
                        <span className="bg-neutral-800 text-neutral-500 px-5 py-2 rounded-xl font-semibold text-base cursor-not-allowed">Ended</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-3">
                      <FaUserCircle className="text-neutral-500 text-base" />
                      <span className="text-xs text-neutral-400">{auction.creator}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
