export default defineNitroConfig({
  typescript: {
    tsConfig: {
      compilerOptions: {
        strict: true,
        noEmit: true,
        moduleResolution: 'bundler',
      },
    },
  },
  compatibilityDate: '2024-11-22',
})
