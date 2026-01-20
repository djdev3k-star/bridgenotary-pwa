# Bridge Notary PWA

Progressive Web App replicating the BridgeNotary React web app with offline capabilities, service workers, and installability.

## Quick Start

```bash
npm install
npm run dev    # Vite dev server on http://localhost:5173
npm run build  # Production build
npm run test   # Run tests
```

## Stack

- **React 18** + TypeScript
- **Vite** - Build tool with HMR
- **TailwindCSS** - Styling
- **React Router v7** - Client-side routing with lazy loading
- **Vite PWA Plugin** - Service worker & PWA manifest
- **Express** - Backend server (in `/server`)

## Project Structure

```
src/
  components/      # Reusable UI components (layout, common, ui)
  features/        # Feature modules (apostille, ron)
  pages/          # Route pages with lazy loading
  services/       # API calls & business logic
  styles/         # Global CSS with Tailwind
  types/          # TypeScript interfaces
  utils/          # Helpers (validation, formatting, feature flags)
  assets/         # Images & static assets
  sw.ts           # Service worker with caching strategies
public/           # Static assets
server/           # Express backend
```

## Key Features

### PWA Capabilities
- Offline-first with service worker caching
- Background sync for form submissions
- Install as standalone app
- Works on desktop & mobile

### Offline Support
- **Service Worker**: Network-first for APIs, cache-first for assets
- **IndexedDB**: Stores pending form submissions
- **Automatic Sync**: Background sync to submit forms when online

### Form Validation
- Email & phone validation
- Required field checking
- Phone number formatting
- Server-side validation on backend

### Feature Flags
- Apostille services (`VITE_ENABLE_APOSTILLE`)
- RON services (`VITE_ENABLE_RON`)
- Loan signing (`VITE_ENABLE_LOAN_SIGNING`)

## Development

### Running Locally

```bash
# Dev server with hot reload
npm run dev

# Dev server + backend server
npm run start:all

# Backend only
npm run server:dev

# Preview production build
npm run build && npm run preview
```

### Testing

```bash
npm run test      # Run all tests
npm run type-check # TypeScript type checking
```

### PWA Testing

1. Build: `npm run build`
2. Serve: `npx serve -s dist`
3. DevTools → Application → Service Workers to inspect

## Configuration

### Environment Variables

Create `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENABLE_APOSTILLE=true
VITE_ENABLE_RON=true
VITE_ENABLE_LOAN_SIGNING=true
```

### Tailwind Customization

Edit `tailwind.config.js` to customize colors, fonts, animations

## Patterns & Conventions

### Lazy Loading Pages

```typescript
const HomePage = React.lazy(() => import('@/pages/home'))
```

### Path Aliases

Use `@/` prefix for clean imports:

```typescript
import { LoadingSpinner } from '@/components/common'
import { formValidation } from '@/utils/formValidation'
```

### Form Validation

```typescript
import { validateRequestForm, formatPhoneNumber } from '@/utils/formValidation'

const result = validateRequestForm(formData)
if (!result.isValid) {
  // Show errors
}
```

### API Calls with Offline Support

```typescript
import { submitRequestForm } from '@/services/formSubmissionService'

const response = await submitRequestForm(formData, 'notary')
// Automatically saves to IndexedDB if offline
```

## Deployment

### Build for Production

```bash
npm run build
```

Outputs to `dist/` - ready for any static host (Netlify, Vercel, GitHub Pages)

### Requirements

- HTTPS in production (required for PWA)
- Service worker support (all modern browsers)
- Manifest.json served with correct MIME type

## Debugging

### Service Worker Issues

- DevTools → Application → Clear storage
- Reload page after changes
- Check Application tab for cache contents

### PWA Not Installing

- Verify `manifest.json` is served
- Check HTTPS (required for production)
- Use Lighthouse audit to diagnose

### Offline Testing

- DevTools → Network → Offline checkbox
- Try submitting forms without connection
- Check IndexedDB in Application tab

## Architecture Decisions

- **No Redux**: Uses React Context or local state (simpler for this scope)
- **Vite PWA Plugin**: Simplifies service worker setup vs manual registration
- **Lazy Loading**: Code-split pages for smaller bundle size
- **TailwindCSS**: Utility-first CSS for rapid development
- **Feature Flags**: Enable/disable services without rebuilding

---

For more details, see [.github/copilot-instructions.md](.github/copilot-instructions.md)
