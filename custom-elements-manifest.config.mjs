import { litPlugin } from '@custom-elements-manifest/analyzer/src/features/framework-plugins/lit/lit.js'

export default {
  globs: ['src/components/**/*.ts'],
  plugins: [...litPlugin()],
  overrideModuleCreation: false,
}
