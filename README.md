Ecosphere — Corporate ESG Platform

A full-stack ESG (Environmental, Social, Governance) platform with a gamified
engagement layer, **EcoQuest Arena**.

## What's in this package

```
ecosphere/
├── index.html              ← Interactive frontend prototype (open directly in a browser)
└── backend/
    ├── schema.sql           ← Full MySQL schema (18 tables, seeded departments & badges)
    ├── server.js            ← Express REST API (auth, CRUD, RBAC, security middleware)
    ├── package.json          ← Backend dependencies
    └── .env.example          ← Environment variable template (copy to .env)
```

## Running the frontend prototype
`index.html` is fully self-contained (HTML/CSS/JS, no build step) and uses
in-browser persistent storage so you can click through the entire product —
signup, login, environmental goals CRUD, CSR activities, governance, the
EcoQuest Arena game, reports, and settings — end to end. It's a **UI/UX
reference**; wire it to the real API below for production use.

## Running the backend
```bash
cd backend
npm install
cp .env.example .env        # fill in real DB credentials + JWT secret
mysql -u root -p < schema.sql
npm start
```
The API listens on `PORT` (default 4000) and exposes REST endpoints under
`/api/*` — auth, `goals`, `csr`, `participation`, `policies`, `audits`,
`issues`, `challenges`, `leaderboard`, `badges`, `rewards`, `departments`,
`categories`, and `me` (profile).

## Design system
- **Palette:** forest green `#1B4332`, sage `#74A57F`, tidal blue `#2C6E7F`,
  parchment `#F6F2E9`, matte gold accent `#C9A227` — a corporate-friendly,
  matte earthy theme with a full dark mode.
- **Type:** Fraunces (display/serif) for headings, Public Sans for body copy,
  JetBrains Mono for data/metrics.

## The Game: EcoQuest Arena
Live challenges, individual + department leaderboards, unlockable badges,
a points-based rewards store, celebratory confetti bursts on milestones, and
an animated arena hero banner.

## Security measures (backend)
1. **Password hashing** — bcrypt, cost factor 12; plaintext passwords are
   never stored or logged.
2. **Authentication** — short-lived JWT access tokens (15 min) + rotating
   refresh tokens stored as httpOnly, secure, `SameSite=strict` cookies.
3. **SQL injection prevention** — 100% parameterized queries via `mysql2`;
   no string concatenation into SQL anywhere.
4. **Account lockout** — 5 failed logins triggers a 15-minute lock and an
   audit-log entry.
5. **Rate limiting** — stricter limits on `/api/auth/*`, general limits on
   all `/api/*` routes, to blunt brute-force and scraping.
6. **Input validation & sanitization** — `express-validator` on every
   mutating route; `xss-clean` strips script injection; `hpp` blocks HTTP
   parameter pollution.
7. **Secure headers** — `helmet()` sets a Content-Security-Policy, HSTS,
   X-Frame-Options, and related headers.
8. **CORS allow-list** — no wildcard origins in production.
9. **RBAC** — role checks (`Employee` / `HR` / `Manager` / `Admin`) gate
   sensitive actions (e.g. only HR can create CSR activities and approve
   participation proofs; only Admin/Manager can open audits or resolve
   issues).
10. **Audit trail** — every create/update/delete and login/lock event is
    written to `audit_log` with user, IP, and timestamp.
11. **File upload hardening** — `multer` restricts uploads to JPEG/PNG/WEBP,
    caps size at 4MB, and writes randomized filenames outside any
    executable path.
12. **Secrets management** — DB credentials and the JWT signing key are
    read from environment variables (`.env`, git-ignored), never hardcoded.
13. **Generic error responses** — clients receive safe, generic error
    messages; full stack traces are logged server-side only.

## Five additional unique features beyond the brief
1. **Points ledger** (`points_ledger` table) — a full audit trail of every
   point earned or spent, so nothing about the game economy is a black box.
2. **Rewards Store** — redeem EcoQuest points for real perks (WFH days,
   vouchers, tree-planting, lunch with the CEO), not just cosmetic badges.
3. **Custom Report Builder** — pick-and-choose modules to assemble a
   tailored ESG report on demand.
4. **Live Notification Center** with granular per-category toggles
   (challenge reminders, approval requests, audit alerts, etc).
5. **Account lockout + security audit log**, giving admins visibility into
   suspicious login activity — a control most internal tools skip.

## Note on this deliverable
This package favors a realistic, deployable architecture over a hosted demo:
the frontend runs standalone in any browser right now, and the backend is
production-shaped Express/MySQL code you can deploy to your own
infrastructure and connect the frontend to (swap the in-browser storage
calls for `fetch()` calls to the `/api/*` routes).
