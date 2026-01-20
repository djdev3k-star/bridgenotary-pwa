/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_ENABLE_APOSTILLE: string
  readonly VITE_ENABLE_RON: string
  readonly VITE_ENABLE_LOAN_SIGNING: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
