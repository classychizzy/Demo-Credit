# DemoCredit — Codebase Documentation

## What the App Is

DemoCredit is a fintech wallet API built with Node.js, Express, TypeScript, and Knex (MySQL). It lets users register, verify their identity (KYC), open wallet accounts, and move money — fund a wallet, transfer between DemoCredit users, withdraw, or send to external banks.

The app is structured around a strict **layered architecture**: every HTTP request travels through the same chain before anything happens to the database.

---

## How a Request Moves Through the App

```
HTTP Request
    │
    ▼
Route (src/routes/)
    │  defines the URL, HTTP method, and what middleware runs
    ▼
Middleware (authenticateToken, validateDto, rateLimiter)
    │  authenticates the token, validates the request body, applies rate limits
    ▼
Controller (src/controllers/)
    │  reads from req, calls the service, writes to res
    ▼
Service (src/services/)
    │  holds the business logic — guards, checks, computations
    ▼
Model (src/models/)
    │  talks to the database via Knex
    ▼
Database (MySQL via Knex)
```

The controller never contains business logic. The service never touches `req` or `res`. This separation means you can test a service in isolation without spinning up Express.

Every service method returns a `ResponseDto`:

```ts
{ status_code: number, success: boolean, message: string, data?: T }
```

The controller simply does:

```ts
const response = await this.service.doSomething(...)
return res.status(response.status_code).json(response)
```

---

## Middleware

There are three middleware pieces that appear on almost every route.

**`authenticateToken`** — verifies the JWT access token on the `Authorization` header and attaches the decoded user payload to `req.user`. Routes that carry this middleware require a valid logged-in session.

**`validateDto(SomeDTO)`** — uses `class-validator` to check that the request body matches the shape and rules declared in the DTO class. If validation fails, it returns a 400 before the controller is ever called.

**`loginRateLimiter` / `fundRateLimiter` / `transferRateLimiter`** — Express rate limiters that cap how many times a client can hit sensitive endpoints within a time window, guarding against brute force and abuse.

---

## Modules

### 1. Users — `/api/users`

The identity layer. Handles registration, login, password management, and token lifecycle.

**Routes → Controller → Service**

| Method | Path | What it does |
|--------|------|--------------|
| POST | `/register/me` | Creates a new user |
| POST | `/login` | Returns access + refresh tokens |
| POST | `/refresh` | Swaps a refresh token for a new pair |
| POST | `/logout` | Revokes the refresh token |
| POST | `/forgot-password` | Generates a reset token (logged to console in dev) |
| POST | `/reset-password` | Consumes reset token, sets new password |
| PATCH | `/change-password` | Changes password while authenticated |

**`UsersService`** (`src/services/auth/user.service.ts`)

- `RegisterUserService` — before creating a user it calls `KarmaService.isBlacklisted()` against both the email and BVN. If either is on the Lendsqr Adjutor blacklist the user is rejected with a 403. If not, the user is inserted.
- `loginService` — verifies password with bcrypt, issues a short-lived JWT access token and a longer-lived refresh token. The refresh token is stored hashed in the `refresh_tokens` table.
- `rotateRefreshToken` — validates the stored refresh token, revokes it, and issues a fresh pair. This is token rotation: each refresh can only be used once.
- `logoutService` — revokes the refresh token so it can never be rotated again.
- `forgotPassword` / `resetPassword` / `changePassword` — standard password management. In production the reset link would be emailed; in dev it is printed to the console.

**`KarmaService`** (`src/services/karma.service.ts`)

Calls the Lendsqr Adjutor API (`/v2/verification/karma/{identity}`) to check if a given email or BVN appears in a shared industry blacklist. A 404 from the API means the identity is clean. Any other error causes a fail-closed rejection — if the check can't run, onboarding is blocked. When `ADJUTOR_API_KEY` is not set (local dev), the check is skipped with a warning.

---

### 2. KYC — `/api/kyc`

Know Your Customer. Users must submit bank details and a government ID before they can transact. This is the compliance gate.

**Routes**

| Method | Path | Auth | What it does |
|--------|------|------|--------------|
| POST | `/` | Yes | Submit or resubmit KYC documents |
| GET | `/me` | Yes | Check your current KYC status |

**`KYCService`** (`src/services/kyc.service.ts`)

- `submitKYC` — validates the bank code against a local list of Nigerian banks. Derives the `account_name` from the user's name in the database (simulating an account name lookup). Marks `bvn_verified: true` (this would call a real BVN API in production). Inserts a new KYC record or updates the existing one if resubmitting. Status starts as `pending`. A `setTimeout` fires after 5 seconds to auto-approve — this simulates the admin review flow you'd have in production.
- `getKYCStatus` — returns the KYC record for the authenticated user so they can see whether they are `pending`, `verified`, or `failed`.

The `kyc_status` field on the `kyc` table drives what a user is allowed to do. You can check `req.user.kyc_status` (embedded in the JWT) or query the KYC table directly before allowing sensitive operations.

---

### 3. Accounts — `/api/accounts`

A user can hold multiple wallet accounts (e.g. savings, current). An account has a 10-digit account number and a balance.

**Routes**

| Method | Path | Auth | What it does |
|--------|------|------|--------------|
| POST | `/` | Yes | Open a new wallet account |
| GET | `/me` | Yes | List all your accounts |
| GET | `/:account_number` | No | Look up any account by number |

**`AccountService`** (`src/services/account/account.service.ts`)

- `createAccount` — generates a random 10-digit account number, looping until it finds one that isn't already taken. Sets the account name from the user's first and last name.
- `getMyAccounts` — returns all accounts belonging to the authenticated user.
- `getAccountByNumber` — public lookup used during transfers to resolve a destination account.

---

### 4. Wallet — `/api/wallet`

Money movement. All wallet operations require authentication and a valid transaction PIN.

**Routes**

| Method | Path | Auth | Rate limited | What it does |
|--------|------|------|-------------|--------------|
| POST | `/fund` | Yes | Yes | Deposit money into your account |
| POST | `/transfer` | Yes | Yes | Send money to another DemoCredit account |
| POST | `/withdraw` | Yes | No | Withdraw money from your account |
| POST | `/interbank-transfer` | Yes | Yes | Send money to a different bank |

**`WalletService`** (`src/services/wallet/wallet.service.ts`)

Every write operation uses a Knex **database transaction** (`db.transaction(trx => ...)`). This means the balance update and the transaction record are written atomically — if either fails, both roll back and no money is lost or created.

- `fundAccount` — verifies the account belongs to the calling user, then atomically increments the balance and inserts a `DEPOSIT` transaction record.
- `transferFunds` — verifies the PIN, checks there are no same-account transfers, confirms sufficient balance, then atomically debits the source and credits the destination. Inserts a transaction record on both sides with the same `session_id` so the debit and credit can be linked.
- `withdrawFunds` — verifies the PIN, checks balance, atomically decrements the balance and records a `WITHDRAWAL` transaction.
- `interBankTransfer` — verifies the PIN, debits the source account, and records the transfer with the destination bank's details. The money leaving the system is recorded but there is no incoming credit (the receiving bank handles that side).

`verifyPin` is a private helper that fetches the stored bcrypt hash from `users_pin` and compares it against the plain PIN sent in the request.

---

### 5. PIN — `/api/pin`

A 4–6 digit transaction PIN separate from the account password. It must be set before any transfer or withdrawal.

**Routes**

| Method | Path | Auth | What it does |
|--------|------|------|--------------|
| POST | `/set` | Yes | Set a PIN for the first time |
| PATCH | `/change` | Yes | Change PIN (requires current PIN) |
| POST | `/verify` | Yes | Check if a given PIN is correct |
| POST | `/reset` | Yes | Reset PIN using account password |

**`PinService`** (`src/services/pin/pin.service.ts`)

- `setPin` — blocks if a PIN already exists (use change instead). Hashes the PIN with bcrypt before storing.
- `changePin` — verifies the old PIN matches before allowing the change. Blocks identical old/new PINs.
- `verifyPin` — purely a check; used by consumers who need to validate a PIN without changing anything.
- `resetPin` — uses the account password as the second factor to bypass the old PIN, useful when the user has forgotten it. Creates a PIN record if none exists.

---

### 6. Address — `/api/addresses`

Stores a user's residential address, primarily for KYC and compliance purposes.

**Routes**

| Method | Path | Auth | What it does |
|--------|------|------|--------------|
| POST | `/` | Yes | Save your address (one per user) |
| GET | `/me` | Yes | Retrieve your address |
| PUT | `/me` | Yes | Update your address |

**`AddressService`** (`src/services/address/address.service.ts`) — straightforward CRUD with a uniqueness guard so each user can only have one address record.

---

### 7. Banks — `/api/banks`

A read-only reference list of supported Nigerian banks and their codes. The KYC submission validates `bank_code` against this list.

The source of truth is the static array in `src/data/bank.ts`. The `BankService` (`src/services/bank/bank.service.ts`) reads from this list rather than the database.

---

## Key Data Relationships

```
users
  │
  ├── kyc (1:1)         — KYC record and verification status
  ├── addresses (1:1)   — residential address
  ├── users_pin (1:1)   — hashed transaction PIN
  ├── refresh_tokens    — active refresh token records
  └── accounts (1:many) — wallet accounts
        └── transactions (1:many) — every debit/credit on that account
```

---

## How to Test Without Real Documents

Because this is a simulated environment, the KYC flow accepts placeholder values:

```json
{
  "account_number": "0123456789",
  "bank_code": "044",
  "id_type": "nin",
  "id_number": "12345678901",
  "id_document_url": "https://example.com/id.jpg",
  "utility_bill_url": "https://example.com/bill.jpg"
}
```

Any non-empty string works for the URLs. The bank code must match one of the codes in `src/data/bank.ts` (e.g. `044` for Access Bank, `058` for GTB). The service auto-approves after 5 seconds via `setTimeout`.
