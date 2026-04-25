export default function handler(req, res) {
  const key = process.env.ANTHROPIC_API_KEY
  return res.status(200).json({
    hasKey: !!key,
    keyPrefix: key ? key.substring(0, 12) + '...' : 'NOT FOUND',
    nodeEnv: process.env.NODE_ENV,
  })
}
