import { loadEnv } from 'vite'
import app from './index.js'

export default function paymentApiPlugin() {
  return {
    name: 'ezycertify-api-plugin',
    configureServer(server) {
      // Load environment variables into process.env
      const env = loadEnv(server.config.mode, process.cwd(), '')
      Object.assign(process.env, env)

      // Mount Express backend directly into Vite development server
      server.middlewares.use(app)
    },
  }
}
