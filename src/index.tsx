import 'dotenv/config';
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger';
import { serveStatic } from '@hono/node-server/serve-static'
import index from './pages';

const app = new Hono()

app.use(logger())
app.use('/static/*', serveStatic({ root: './' }))

app.route('/', index)

const port = 3000;


console.log('Starting server...', "http://localhost:" + port, process.env.DATABASE_PATH)
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
