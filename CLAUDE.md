# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the dev server at http://localhost:3000
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run prod` — build + start in one shot
- `npm run lint` — ESLint (Next.js core-web-vitals config)

There is no test runner configured.

## Stack

- **Next.js 16** (App Router) with the React Compiler enabled (`babel-plugin-react-compiler`).
- **React 19** — server components are the default; client components opt in with `"use client"`.
- **NextAuth v5 (beta)** with Google as the only provider. Config lives in [app/_lib/auth.js](app/_lib/auth.js); the route handler at [app/api/auth/[...nextauth]/route.js](app/api/auth/[...nextauth]/route.js) just re-exports `GET`/`POST` from there.
- **Supabase** as the database (cabins, guests, bookings, settings tables). Single shared client in [app/_lib/supabase.js](app/_lib/supabase.js) using `SUPABASE_URL` / `SUPABASE_KEY` env vars.
- **Tailwind v4** via `@tailwindcss/postcss` — no `tailwind.config.js` content scanning needed; config-as-CSS lives in `app/_styles/globals.css`.
- Path alias `@/*` → repo root (see [jsconfig.json](jsconfig.json)). Imports look like `@/app/_components/Foo` or `@/app/_lib/data-service`.

## Architecture

**Folder convention.** Anything under `app/` with a leading underscore is non-routable: [app/_components/](app/_components/) holds shared UI, [app/_lib/](app/_lib/) holds server-only modules (`auth.js`, `data-service.js`, `actions.js`, `supabase.js`), [app/_styles/](app/_styles/) holds CSS.

**Data flow.** Pages are async server components that call functions in [app/_lib/data-service.js](app/_lib/data-service.js) directly — no API layer in between. The only `app/api/*` route is the NextAuth handler; everything else is server-rendered or driven by server actions. Mutations go through `"use server"` functions in [app/_lib/actions.js](app/_lib/actions.js), which hit Supabase and then call `revalidatePath` to refresh route data.

**Auth gating.** Route protection is implemented in [proxy.js](proxy.js) (Next.js 16 renamed `middleware.js` → `proxy.js`; it works the same way). The matcher currently only covers `/account`. Inside server actions, `await auth()` returns the session and `session.user.guestId` is populated by the `session` callback in `auth.js` — that callback looks up the Supabase `guests` row by email on every session resolution.

**Guest record bootstrap.** The `signIn` NextAuth callback in `auth.js` creates a `guests` row on first login if one doesn't exist. Downstream code can assume the guest row exists whenever a session does.

**Reservation date picker.** Date selection on cabin pages flows through a client `ReservationProvider` ([app/_components/ReservationContext.js](app/_components/ReservationContext.js)) wrapping the whole app in the root layout. `DateSelector` writes the range; `ReservationForm` reads it. Don't replace this with prop drilling — it crosses the server/client boundary deliberately.

**Static generation.** Cabin detail pages use `generateStaticParams` ([app/cabins/[cabinId]/page.js](app/cabins/[cabinId]/page.js)) — adding new cabins requires no code change but does require a rebuild for them to be pre-rendered.

**Image domains.** Remote image hosts are allowlisted in [next.config.mjs](next.config.mjs): Supabase storage, Google profile images (`lh3.googleusercontent.com`), and country flag CDN (`flagcdn.com`). Add new hosts there before using `next/image` with them.

## React 19 / Server Action gotchas

- `<form action={serverAction}>` **auto-resets uncontrolled inputs** after a successful submission. The reset uses the `defaultValue` that was set when the input *mounted*, which can be stale even after `revalidatePath`. For forms that edit existing records, give the `<form>` a `key` derived from the record's data so it remounts with fresh defaults — see [app/_components/UpdateProfileForm.js](app/_components/UpdateProfileForm.js) for the pattern.
- Use the `SubmitButton` wrapper ([app/_components/SubmitButton.js](app/_components/SubmitButton.js)) inside forms to show pending state via `useFormStatus`.
