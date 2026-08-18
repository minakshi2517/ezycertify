import app from './server/index.js'

const PORT = Number(process.env.PORT || 5000)

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Ezycertify Server] Production server successfully listening on port ${PORT}`)
})
