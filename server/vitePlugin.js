import { loadEnv } from 'vite'
import { handlePaymentRequest } from './payment.js'

export default function paymentApiPlugin() {
  return {
    name: 'ezycertify-payment-api',
    configureServer(server) {
      const env = {
        ...process.env,
        ...loadEnv(server.config.mode, process.cwd(), ''),
      }

      server.middlewares.use(async (req, res, next) => {
        const url = String(req.url || '').split('?')[0]
        if (!url.startsWith('/api')) {
          next()
          return
        }

        try {
          const handled = await handlePaymentRequest(req, res, env)
          if (!handled) next()
        } catch (err) {
          console.error('Payment API error:', err)
          if (!res.headersSent) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Payment API failed.' }))
          }
        }
      })
    },
  }
}
