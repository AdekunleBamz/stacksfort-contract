# Smart Contract - Stacks Multisig Vaults
[![CI](https://github.com/stacksgov/stacksfort-contract/actions/workflows/main.yml/badge.svg)](https://github.com/stacksgov/stacksfort-contract/actions/workflows/main.yml)

This directory contains the Clarity smart contract implementation for the Stacks Multisig Vaults project.

## Clarity Version

- **Current Version**: Clarity 4 (live on mainnet since Bitcoin block 923222)
- **Clarity 4 Status**: ✅ Active - See [CLARITY4-IMPLEMENTATION-PLAN.md](./CLARITY4-IMPLEMENTATION-PLAN.md) for implementation details
- **Note**: Clarinet 3.6.1 has limited local support, but contracts deploy and run correctly on mainnet/testnet

### Clarity 4 Features Planned

This contract will leverage Clarity 4 features for enhanced security and functionality:

1. **`restrict-assets?`** - Post-conditions for safer token transfers (Issue #7)
   - Prevents token contracts from moving unauthorized assets
   - Automatic rollback on security violations

2. **`stacks-block-time`** - Transaction expiration mechanism (Issue #15)
   - Time-based transaction expiration
   - Prevents execution of stale proposals

3. **`contract-hash?`** - Token contract verification (Issue #7 enhancement)
   - Verify token contracts match expected code
   - Enhanced security for token interactions

4. **`to-ascii?`** - Enhanced logging (Issues #2, #6, #7)
   - Human-readable transaction logs
   - Better debugging and monitoring

5. **`secp256r1-verify`** - Passkey support (Future enhancement)
   - Hardware-secured wallet support
   - Biometric transaction signing

**Note**: Clarity 4 features are being implemented incrementally. See the [implementation plan](./CLARITY4-IMPLEMENTATION-PLAN.md) for detailed roadmap.

## Project Structure

```
smart-contract/
├── contracts/                    # Clarity smart contract files (.clar)
│   └── multisig.clar            # Main multisig contract
├── tests/                        # Test files (.test.ts)
│   └── 00-contract-setup.test.ts
├── settings/                     # Configuration files for different networks
│   ├── Devnet.toml              # Development network settings
│   └── Testnet.toml             # Testnet deployment settings
├── deployments/                  # Deployment plans
│   └── (generated deployment files)
├── Clarinet.toml                 # Clarinet configuration
├── package.json                  # Node.js dependencies
├── README.md                     # This file
├── CLARITY4-IMPLEMENTATION-PLAN.md  # Clarity 4 feature implementation plan
├── issues.md                     # Project issues and tasks
└── clarity-smartcontract-guide.md   # Clarity development guide
```

## Overview

The multisig vault contract enables secure multi-signature wallet functionality on Stacks. It supports:

- **Multiple Signers**: Up to 100 signers can be configured
- **Flexible Thresholds**: Configurable signature requirements (e.g., 2/3, 4/5, 8/10)
- **STX Transfers**: Native Stacks token transfers
- **SIP-010 Token Support**: Support for fungible tokens like sBTC
- **Off-chain Signing**: Signatures are collected off-chain and verified on-chain

## Key Features

1. **Initialization**: One-time setup by contract owner to configure signers and threshold
2. **Transaction Submission**: Any signer can submit a transaction proposal
3. **Off-chain Signing**: Signers sign transaction hashes off-chain
4. **On-chain Execution**: Transactions execute only after threshold signatures are verified
5. **Transaction Types**: Supports both STX and SIP-010 token transfers

## Contract Functions

### Public Functions

- `initialize` - Initialize the multisig with signers and threshold (owner only, one-time)
- `submit-txn` - Submit a new transaction proposal (signers only)
- `execute-stx-transfer-txn` - Execute a pending STX transfer transaction
- `execute-token-transfer-txn` - Execute a pending SIP-010 token transfer transaction

### Read-Only Functions

- `hash-txn` - Get the hash of a transaction for signing
- `extract-signer` - Extract and verify a signer from a signature

### Private Functions

- `count-valid-unique-signature` - Helper to count valid unique signatures

## Development Setup

Refer to the main project `set.md` file for detailed setup instructions.

Quick start:
1. Install Clarinet
2. Install Node.js dependencies: `npm install`
3. Run tests: `npm run test`

## Testing

Tests are written using Vitest and the Clarinet SDK. Run tests with:

```bash
npm run test
```

## Deployment

### Mainnet Deployed Contracts

The following contracts are deployed on Stacks mainnet:
- MultiSig (stacksfort-v1): SP3TXKY0REKG6P3W6ACFB615N5556EC8VYS4MFA4D.stacksfort-v1


To deploy to testnet:

```bash
clarinet deployments generate --testnet --low-cost
clarinet deployment apply -p deployments/default.testnet-plan.yaml
```

## Dependencies

### Contract Dependencies

- **SIP-010 Trait**: `SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard`
  - Standard interface for fungible tokens
  - Used for SIP-010 token transfers

### Testing Dependencies

- **`@stacks/clarinet-sdk`** (v3.11.0) - Clarity 4 compatible SDK
  - Provides simnet for local contract testing
  - Clarity 4 feature support
  - Contract deployment and interaction utilities

- **`@stacks/clarinet-sdk-wasm`** (v3.11.0) - WASM runtime for Clarity
  - WebAssembly runtime for executing Clarity contracts
  - Required for running tests locally

- **`@stacks/transactions`** (v7.2.0) - Transaction utilities for testing
  - Used in test files to create Clarity values (`Cl`)
  - Provides `signMessageHashRsv` for signature testing
  - Helper functions for transaction building in tests

- **`vitest`** (v3.2.4) - Test runner
- **`vitest-environment-clarinet`** (v3.0.2) - Clarinet test environment

## Security Considerations

- Contract can only be initialized once by the owner
- Only configured signers can submit transactions
- Transactions require minimum threshold of valid signatures
- Signatures are verified on-chain to prevent replay attacks
- Each signer can only sign a transaction once

## Clarity 4 Implementation

This project plans to leverage Clarity 4 features for enhanced security and functionality. See [CLARITY4-IMPLEMENTATION-PLAN.md](./CLARITY4-IMPLEMENTATION-PLAN.md) for:

- Detailed implementation plan for each Clarity 4 feature
- Where and how each feature will be integrated
- Testing strategy and migration plan
- Timeline and priorities

**Key Implementation Areas**:
- **Issue #7**: Token transfers with `restrict-assets?` post-conditions
- **Issue #15**: Transaction expiration using `stacks-block-time`
- **Issue #7 Enhancement**: Token contract verification with `contract-hash?`
- **Issues #2, #6, #7**: Enhanced logging with `to-ascii?`

## Resources

- [Clarity Language Documentation](https://docs.stacks.co/docs/clarity)
- [Clarity 4 Features](https://docs.stacks.co/whats-new/clarity-4-is-now-live)
- [Clarinet Documentation](https://docs.hiro.so/clarinet)
- [SIP-010 Token Standard](https://github.com/stacksgov/sips/blob/main/sips/sip-010/sip-010-fungible-token-standard.md)
- [SIP-033 & SIP-034 Specifications](https://github.com/stacksgov/sips)
