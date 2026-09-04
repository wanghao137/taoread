import Fastify, { type FastifyInstance } from 'fastify'
import cors from '@fastify/cors'

export interface BuildAppOptions {
  allowedOrigin?: string | boolean
  logger?: boolean
}

export async function buildApp(options: BuildAppOptions = {}): Promise<FastifyInstance> {
  const app = Fastify({
    logger: options.logger ?? false,
  })

  await app.register(cors, {
    origin: options.allowedOrigin ?? true,
  })

  app.get('/api/health', async () => ({
    ok: true,
    service: 'taoread-server',
    time: new Date().toISOString(),
  }))

  return app
}
