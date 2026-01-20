# BridgeNotary PWA - Developer Quick Reference

## Start Development

```bash
npm install                      # First time only
npm run dev                      # Dev server: http://localhost:5173
npm run start:all               # Dev + backend server
npm run build                   # Production build
npm run preview                 # Test production locally
```

## Project Structure at a Glance

| Directory | Purpose |
|-----------|---------|
| `src/components/layout` | Main layout wrapper |
| `src/components/common` | Reusable: ErrorBoundary, LoadingSpinner, TawkChat |
| `src/components/ui` | Buttons, cards, forms |
| `src/pages/` | Route components (home, ron, apostille) |
| `src/features/` | Feature modules (apostille, ron) |
| `src/services/` | API calls (formSubmissionService, ronService) |
| `src/utils/` | Helpers (formValidation, featureFlags, classNames) |
| `src/styles/` | Global CSS with Tailwind |
| `src/types/` | TypeScript interfaces |
| `src/assets/` | Images (organized by category) |
| `src/sw.ts` | Service worker (caching, offline sync) |
| `public/` | Static assets |
| `server/` | Express backend (Node.js) |

## Key Files to Know

| File | What It Does |
|------|--------------|
| `vite.config.ts` | Vite + PWA config, path aliases |
| `tailwind.config.js` | Colors, fonts, animations |
| `src/App.tsx` | Router, lazy loading, 404 page |
| `src/utils/featureFlags.ts` | Control apostille/RON/loan-signing visibility |
| `src/utils/formValidation.ts` | Email/phone validation, formatting |
| `src/sw.ts` | Caching strategies, background sync |
| `.github/copilot-instructions.md` | AI agent guide |

## Common Tasks

### Add a New Page

1. Create `src/pages/newpage/index.tsx`:
```typescript
export default function NewPage() {
  return <div>New page content</div>
}
```

2. Add route to `src/App.tsx`:
```typescript
const NewPage = React.lazy(() => import('@/pages/newpage'))
// In Routes:
<Route path="/newpage" element={<NewPage />} />
```

### Add a New Component

1. Create `src/components/MyComponent.tsx`
2. Export from `src/components/ui/index.ts` (if shared):
```typescript
export { MyComponent } from './MyComponent'
```
3. Import with alias: `import { MyComponent } from '@/components/ui'`

### Add Form Validation

Edit `src/utils/formValidation.ts`:
```typescript
export function validateNewField(value: string): boolean {
  // Your validation logic
}
```

### Add Feature Flag

1. Edit `src/utils/featureFlags.ts`:
```typescript
enableNewFeature: import.meta.env.VITE_ENABLE_NEW_FEATURE !== 'false'
```

2. Use in code:
```typescript
if (featureFlags.enableNewFeature) {
  // Show feature
}
```

3. Control via env: `.env.local`
```env
VITE_ENABLE_NEW_FEATURE=true
```

### Test Forms Offline

1. DevTools → Network → Offline ☑️
2. Fill & submit form
3. Form saves to IndexedDB automatically
4. Go back online
5. Service worker syncs automatically

### Debug Service Worker

```
DevTools → Application → Service Workers
- Check if registered
- View caches
- Check for errors
```

Clear everything:
```
DevTools → Application → Clear site data
```

## Imports Cheat Sheet

```typescript
// Components
import { LoadingSpinner, ErrorBoundary } from '@/components/common'
import { MyComponent } from '@/components/ui'

// Utilities
import { featureFlags } from '@/utils/featureFlags'
import { validateEmail, formatPhoneNumber } from '@/utils/formValidation'
import { classNames } from '@/utils/classNames'

// Services
import { submitRequestForm } from '@/services/formSubmissionService'

// Types
import type { RequestForm, User } from '@/types'

// Assets
import { ronImages, apostilleImages } from '@/assets/images'
```

## Environment Variables

```env
# .env.local
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENABLE_APOSTILLE=true
VITE_ENABLE_RON=true
VITE_ENABLE_LOAN_SIGNING=true
```

## Tailwind Classes Quick Ref

```
.button-primary         # Blue button
.button-outline         # Blue outline button
.button-secondary       # Gray button
.input-field           # Form input styling
.card                  # Card with shadow
.hero-section          # Background image container
.hero-overlay          # Dark overlay for hero
.hero-content          # Content wrapper (text-white, centered)
```

## Color Reference

- **Primary Blue** (`proof`): `#0046FA`
- **Light Gray**: `#F5F5F5`
- **Dark Gray**: `#4A4A4A`

## Common Errors & Fixes

| Error | Fix |
|-------|-----|
| Module not found `@/...` | Check path in import, verify tsconfig.json alias |
| Service worker not updating | Clear cache in DevTools, restart dev server |
| Form not submitting offline | Check IndexedDB in Application tab |
| Page not loading | Check that lazy import path is correct |
| Tailwind classes not working | Run `npm run dev` or rebuild CSS |
| API call failing locally | Make sure `npm run server:dev` is running on :3000 |

## Testing

```bash
npm run test           # Run tests
npm run test:watch    # Watch mode
npm run type-check    # TypeScript errors
```

## Build & Deploy

```bash
npm run build          # Creates dist/ folder
npm run preview        # Test build locally
# Deploy dist/ to any static host (Netlify, Vercel, etc)
```

**Note**: PWA requires HTTPS in production

---

**More Help**: See [README.md](README.md) or [SETUP.md](SETUP.md)
