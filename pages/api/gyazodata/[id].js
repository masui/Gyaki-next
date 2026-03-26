import https from 'https'

export default function handler(req, res) {
  const { id } = req.query

  https.get(`https://i.gyazo.com/${id}.png`, (proxyRes) => {
    res.setHeader('Content-Type', proxyRes.headers['content-type'] || 'image/png')
    proxyRes.pipe(res)
  }).on('error', () => {
    res.status(502).send('Failed to fetch image')
  })
}
