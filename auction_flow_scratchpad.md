# Miden Auction Flow Scratchpad

## 1. Auction Creation
- User creates an auction on testnet via dApp UI.
- Mints a custom token (with name, optional image/metadata) as the auction item.
- Sets auction details: name, end date/time, etc.
- Auction creator's account ID is provided (for receiving bids and payment).

## 2. Bidding Phase
- Bidders send private notes to the auction creator's account ID.
- Each note contains the bid value (not the actual payment, just the bid amount).
- Notes are encrypted so only the auction creator can decrypt and see the bids.
- Bids are only accepted before the auction end date/time.

## 3. Auction Ends
- Auction creator decrypts all received notes, picks the highest bid.
- Creator publicly posts the winner's address (not the amount).
- Winner receives a note (or UI prompt) telling them to pay the winning amount.

## 4. Payment Phase
- Only the winner sees the "Pay" button in the UI.
- dApp creates a payment note for the auction creator, with:
  - The correct amount (as fixed by the winning bid)
  - The official Miden testnet token as the asset
  - The auction creator's account ID as the recipient
- Only the winner should be able to do this (enforced in UI).

## 5. Claiming the Auction Item
- Once payment is received, the auction creator transfers the auctioned token/NFT to the winner.

---

## Key Technical Constraints & Enforcement
- You cannot prevent anyone from creating a payment note, but the auction creator only accepts payment from the winner's account, for the correct amount and token.
- The note script can require that only the auction creator can claim the note.
- Most enforcement is off-chain (by the auction creator and dApp UI), not on-chain.
- No on-chain enforcement that only the winner can pay, unless using escrow or advanced contracts.

---

## User Account Flow
- Users manage accounts via mnemonic/keystore (no MetaMask-style connect wallet).
- dApp or CLI loads the account from mnemonic/keystore, derives account ID.
- All actions (bidding, payment) are signed with the user's private key.

---

## What You Cannot Do (Yet)
- No on-chain enforcement that only the winner can pay and only the correct amount is accepted, unless using escrow or advanced contracts.
- Cannot prevent others from sending payment notes, but can ignore them if not from the winner or for the wrong amount. 