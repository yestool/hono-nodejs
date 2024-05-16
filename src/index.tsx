import 'dotenv/config';
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger';
import { serveStatic } from '@hono/node-server/serve-static'
import index from './pages';
import { env } from 'hono/adapter'

const app = new Hono()

app.use(logger())
app.use('/static/*', serveStatic({ root: './' }))

app.route('/', index)


app.get('/env', (c) => {
  // NAME is process.env.NAME on Node.js or Bun
  // NAME is the value written in `wrangler.toml` on Cloudflare
  const { NAME } = env<{ NAME: string }>(c)
  return c.text(NAME)
})

const port = 3000;


console.log('Starting server...', "http://localhost:" + port, process.env.DATABASE_PATH)
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
