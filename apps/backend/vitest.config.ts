import { defineConfig, configDefaults } from 'vitest/config'

export default defineConfig({
  test: {
    // Never pick up compiled test copies from a local `tsc` build. dist/ is
    // gitignored and rebuilt inside Docker, but if it exists on disk (e.g. after
    // `pnpm build`) vitest would also collect dist/**/*.test.js and report
    // phantom file failures (the CJS output can't load under vitest), even
    // though all real tests pass. Excluding dist keeps `pnpm build && pnpm test`
    // clean.
    exclude: [...configDefaults.exclude, '**/dist/**'],
  },
})
