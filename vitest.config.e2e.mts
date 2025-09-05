import tsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'
import { compilerOptions, exclude } from './tsconfig.json'

export default defineConfig({
  build: {
    outDir: compilerOptions.outDir,
  },
  plugins: [
    tsConfigPaths(),
  ],
  test: {
    globals: true,
    exclude: [...exclude, '.idea', '.git', '.cache'],
    include: ['**/(*.)?(e2e-test|e2e-spec).{js,ts}'],
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      reporter: ['text', 'json', 'html'],
    },
  },
})
