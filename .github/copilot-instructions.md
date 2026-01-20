# Copilot Instructions for BridgeNotary PWA

## Project Overview
**BridgeNotary PWA** is a Progressive Web App replicating the React web app (bridgenotary-react) with offline capabilities, service workers, and installability. The original web stack uses React 18, TypeScript, Vite, TailwindCSS, and React Router v7.

## Architecture & Key Concepts

### Directory Structure (from bridgenotary-react)
```
src/
  components/
    layout/          # RouteLayout (with <Outlet/>), Layout wrapper
    common/          # Reusable atoms: ErrorBoundary, TawkChat, LoadingSpinner
    ui/              # UI molecules: buttons, cards, mega-menu
  features/          # Feature modules: apostille, ron (RON = Remote Online Notarization)
  pages/             # Route pages with index.tsx; lazy-loaded via React.lazy()
  services/          # API calls, form submission, RON service
  styles/            # TailwindCSS customizations, animations (index.css)
  types/             # TypeScript interfaces
  utils/             # formValidation.ts, featureFlags.ts, classNames.ts
  assets/            # Images organized: generalImages, ronImages, apostilleImages, etc.
```

### Critical Patterns to Adopt
- **Path Aliases**: Use `@/` prefix for imports from `src/` (configured in vite/tsconfig)
- **Lazy Loading**: Pages loaded via `React.lazy()` + `<Suspense>` with `<LoadingSpinner>`
- **Feature Flags**: `featureFlags.ts` controls apostille/loan-signing visibility
- **Service Worker**: For PWA—add caching strategies, background sync, offline fallback
- **Form Validation**: Centralized in `src/utils/formValidation.ts` with phone/email formatting

## Development Workflows

### Setup & Installation
```bash
npm install                    # Install dependencies
npm run dev                    # Vite dev server on http://localhost:5173
npm run build                  # Production build (outputs to dist/)
npm run test                   # Jest + React Testing Library
npm run server:dev             # Backend server (Node.js Express) - if needed
npm run start:all              # Concurrently run dev + server:dev
```

### Running Locally
- **Dev mode**: `npm run dev` runs Vite with HMR (hot module replacement)
- **Preview build**: `npm run preview` tests production build locally
- **For PWA testing**: Build first (`npm run build`), then serve dist/ with http-server or similar
- **Service Worker inspection**: DevTools → Application → Service Workers

### Testing & Building
- **Unit/Component Tests**: Jest + React Testing Library (`npm run test`)
- **Build Output**: Vite outputs to `dist/` (static assets, no server needed for static hosting)
- **Lazy Loading**: Pages are code-split via `React.lazy()` for smaller bundles
- **Feature Flags**: Toggle apostille/loan-signing features via `featureFlags.ts` environment variables

## Critical Patterns & Conventions

### Routing & Lazy Loading
- **Router Config** (App.tsx): Uses React Router v7 with dynamic imports
- **Lazy Components**: Wrap each route with `React.lazy()` for code splitting
- **Suspense Fallback**: Use `<LoadingSpinner>` from `@/components/common`
- **Example**: `const HomePage = React.lazy(() => import("@/pages/home"));`
- **Feature-Gated Routes**: Conditionally import via `featureFlags.enableApostille` to hide routes from build

### Form Submission & Validation
- **Validation**: Centralized in `src/utils/formValidation.ts`
- **Services**: API calls in `src/services/formSubmissionService.ts` or `ronService.ts`
- **Phone Formatting**: `formatPhoneNumber()` applied before submission
- **Error Handling**: Set field-level errors; display in `ErrorAlert` component
- **State Pattern**: `{ formData, errors, isSubmitting, successMessage }`

### Hero Images & Feature-Specific Assets
- Images organized in `src/assets/` by category: `generalImages`, `ronImages`, `apostilleImages`, `travelImages`, `loanSigningImages`
- Hero sections use gradient overlays + background images with TailwindCSS
- Image rotation on 404 page and hero sections varies by feature flags
- **Path**: Import as `import { ronImages } from "@/assets/images"`

### Component Structure
- **Layout**: `<RouteLayout>` wraps routed pages with `<Outlet/>`; `<Layout>` for standalone wrappers
- **Common Components**: `ErrorBoundary`, `TawkChat`, `LoadingSpinner`, `ErrorAlert`, `SuccessAlert`
- **UI Components**: Buttons, cards, mega-menu (Headless UI + Heroicons)
- **Feature Components**: Feature-specific components under `src/features/{apostille,ron}/`

### State & Props
- No Redux—use React Context or local component state
- Pass props down; avoid prop drilling with Context when needed
- Memoization: Use `useMemo()` for expensive computations (e.g., image selection)
- Error state: `{ field: string, message: string }[]` for multiple validation errors

## Integration Points

### Backend API (Express Server)
- **Base URL**: Configured in `.env` (e.g., `REACT_APP_API_URL`)
- **Server**: Located in `server/` directory; run via `npm run server:dev`
- **Endpoints**: Form submission endpoint (`POST /api/request-form`), RON-specific endpoints
- **CORS**: Handled by Express middleware (development)
- **Error Handling**: Catch errors in try-catch within component, display in UI

### SendGrid Email Integration
- **Service**: `@sendgrid/mail` for email notifications (API key in `.env`)
- **Usage**: Send confirmation emails on form submission
- **Server-side**: Implement in `server/` handlers

### Form Submission Flow
1. User fills form (NotaryForm, CourierRequestForm, GeneralInquiryForm)
2. `validateRequestForm()` checks required fields, email, phone format, consent
3. If valid: format phone, call `submitRequestForm()` → `POST /api/request-form`
4. On success: show `SuccessAlert`, reset form
5. On error: show `ErrorAlert` with user-friendly message

## Code Style & Patterns

### TypeScript Usage
- Define props interfaces for all components: `interface MyComponentProps { ... }`
- Use `type` for data models, `interface` for component contracts
- Strict null checks enabled; avoid `any` types
- Import paths: Use `@/components` aliases if configured in `tsconfig.json`

### Naming Conventions
- Components: PascalCase (`DocumentViewer.tsx`)
- Utils/helpers: camelCase (`formatDate.ts`)
- Constants: UPPER_SNAKE_CASE (`MAX_DOCUMENT_SIZE`)
- CSS classes: kebab-case (`document-viewer__header`)

### Common Pitfalls to Avoid
- **Service Worker Caching**: Old app code stays cached; use versioning in `manifest.json`
- **Sensitive Data in State**: Don't store passwords or API keys in Redux state
- **Unhandled Rejections**: Always `.catch()` promises or use try-catch in async functions
- **Memory Leaks**: Cancel API requests when components unmount

## File Structure Examples

### Adding a New Feature
1. Create component in `src/components/FeatureName/`
2. Create service in `src/services/` if it involves API calls
3. Add types to `src/types/` (e.g., `types/document.ts`)
4. Add state to store (reducer + actions)
5. Add tests: `FeatureName.test.tsx`
6. Register route in main router/navigation

### API Call Example
```typescript
// src/services/documentService.ts
export async function fetchDocument(id: string) {
  const response = await fetch(`/api/documents/${id}`);
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
}

// src/hooks/useDocument.ts
export function useDocument(id: string) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchDocument(id).then(setData).catch(setError);
  }, [id]);
  return { data, error };
}
```

## Debugging & Troubleshooting

- **Service Worker Issues**: Clear cache in DevTools → Application → Clear storage
- **State Not Updating**: Verify reducer returns new object (immutability)
- **API Timeouts**: Check network tab; increase timeout or improve backend performance
- **PWA Not Installing**: Verify `manifest.json` is valid; check HTTPS (required for production)

---

**Last Updated**: January 2026. Update this file as project structure evolves.
