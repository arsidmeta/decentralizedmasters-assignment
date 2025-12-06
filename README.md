# Web3 Message Signer & Verifier

A modern full-stack Web3 application that enables seamless authentication with Dynamic.xyz embedded wallets, message signing, and server-side signature verification.

## Overview

This application demonstrates a complete Web3 authentication and message signing workflow. Users can authenticate using email through Dynamic.xyz's headless SDK, sign custom messages with their embedded wallet, and verify signatures on the backend using ethers.js.

## Features

- **Headless Authentication**: Email-based authentication with Dynamic.xyz embedded wallets
- **Message Signing**: Sign any custom message with your Web3 wallet
- **Signature Verification**: Server-side signature verification using ethers.js
- **Signature History**: Persistent local storage of all signed messages
- **Modern UI**: Responsive dark theme with Tailwind CSS
- **Type Safety**: Full TypeScript implementation across frontend and backend
- **Test Coverage**: Comprehensive test suite with Vitest

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tool and dev server
- **Dynamic.xyz SDK** - Headless wallet authentication
- **Wagmi** - React Hooks for Ethereum
- **React Query** - Data fetching and state management
- **Tailwind CSS** - Utility-first CSS framework
- **Vitest** - Unit testing framework

### Backend
- **Node.js** with Express
- **TypeScript** - Type-safe development
- **ethers.js** - Ethereum library for signature verification
- **CORS** - Cross-origin resource sharing
- **Vitest** - Testing framework

## Prerequisites

- Node.js 18+ and npm
- Dynamic.xyz account and environment ID
- Git

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd decentralizedmasters-assignment
```

### 2. Install Dependencies

Install all dependencies from the root directory:

```bash
npm run install:all
```

Or install separately:

```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

### 3. Environment Setup

#### Frontend

Create a `.env` file in the `frontend` directory:

```bash
cd frontend
echo "VITE_DYNAMIC_API_KEY=your_dynamic_environment_id_here" > .env
```

Get your Dynamic.xyz environment ID:
1. Sign up at [Dynamic.xyz](https://www.dynamic.xyz/)
2. Create a new project
3. Copy your environment ID from the dashboard

#### Backend

Create a `.env` file in the `backend` directory (optional):

```bash
cd backend
echo "PORT=3001" > .env
```

### 4. Run the Application

**Development mode (both services):**

```bash
npm run dev
```

This starts:
- Backend server: `http://localhost:3001`
- Frontend dev server: `http://localhost:3000`

**Run services separately:**

```bash
# Backend only
cd backend && npm run dev

# Frontend only
cd frontend && npm run dev
```

### 5. Build for Production

```bash
# Frontend
cd frontend
npm run build
npm run preview

# Backend
cd backend
npm run build
npm start
```

## Testing

### Frontend Tests

```bash
cd frontend
npm test
```

Run with UI:

```bash
npm run test:ui
```

### Backend Tests

```bash
cd backend
npm test
```

## Project Structure

```
.
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthSection.tsx          # Authentication UI
│   │   │   ├── MessageForm.tsx          # Message input and signing
│   │   │   ├── MessageSigner.tsx        # Main component
│   │   │   ├── SignatureHistory.tsx     # History display
│   │   │   └── __tests__/               # Component tests
│   │   ├── App.tsx                      # Root component
│   │   ├── main.tsx                     # Entry point
│   │   └── index.css                    # Global styles
│   ├── index.html
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── verifySignature.ts       # API route handler
│   │   │   └── __tests__/               # Route tests
│   │   ├── services/
│   │   │   ├── signatureVerifier.ts     # Verification logic
│   │   │   └── __tests__/               # Service tests
│   │   └── index.ts                     # Express server
│   └── package.json
└── package.json                          # Workspace config
```

## API Documentation

### POST /api/verify-signature

Verifies an Ethereum message signature.

**Request Body:**
```json
{
  "message": "Hello, Web3!",
  "signature": "0x..."
}
```

**Success Response (200):**
```json
{
  "isValid": true,
  "signer": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "originalMessage": "Hello, Web3!"
}
```

**Error Responses:**
- `400` - Invalid request (missing or invalid parameters)
- `500` - Server error

## Architecture Decisions

### Monorepo Structure
Using npm workspaces for unified dependency management and streamlined development workflow.

### TypeScript
Full TypeScript implementation ensures type safety and improved developer experience across the entire codebase.

### Component Architecture
Clear separation of concerns with dedicated components for authentication, message signing, and history display.

### LocalStorage Persistence
Message history is stored locally in the browser, providing persistence without requiring backend storage.

### Dynamic.xyz Integration
- Headless SDK implementation for maximum control and customization
- Embedded wallet feature for seamless user onboarding
- Wagmi connector integration for consistent Ethereum interactions

### UI/UX Design
- Dark theme with gradient accents for modern Web3 aesthetic
- Mobile-first responsive design
- Comprehensive loading states and error handling
- Accessible semantic HTML and keyboard navigation

### Security
- Server-side signature verification using ethers.js
- Input validation on both frontend and backend
- Comprehensive error handling with user-friendly messages

## Future Enhancements

- Multi-factor authentication with Dynamic.xyz MFA
- Backend database for cross-session signature history
- Rate limiting on API endpoints
- Optional message encryption
- WebSocket support for real-time updates
- Export functionality for signature history (JSON/CSV)
- Pre-defined message templates
- Multi-network support

## Troubleshooting

### Frontend Issues

**Dynamic.xyz connection fails:**
- Verify `VITE_DYNAMIC_API_KEY` is set correctly in `.env`
- Ensure your Dynamic.xyz project is active
- Check that you're using the correct environment ID

**Build errors:**
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Verify Node.js version is 18 or higher

### Backend Issues

**Port already in use:**
- Change the `PORT` in `backend/.env`
- Or kill the process using port 3001

**Signature verification fails:**
- Ensure ethers.js version compatibility
- Verify message format matches the signed message exactly

## License

This project is part of a take-home assignment.

## Author

Built by **arsidmeta** as a demonstration of full-stack Web3 development capabilities.

---

**Note:** This application requires a valid Dynamic.xyz environment ID to function. Sign up at [Dynamic.xyz](https://www.dynamic.xyz/) to get started.
