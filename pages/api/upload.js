import https from 'https'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed')
    return
  }

  const { id, data } = req.body
  const base64Data = data.replace(/^.*base64,/, '')
  const imageBuffer = Buffer.from(base64Data, 'base64')

  const boundary = '----BOUNDARYBOUNDARY----'
  const parts = [
    `--${boundary}\r\n`,
    `content-disposition: form-data; name="id"\r\n`,
    `\r\n`,
    `${id}\r\n`,
    `--${boundary}\r\n`,
    `content-disposition: form-data; name="imagedata"; filename="gyazo.com"\r\n`,
    `\r\n`,
  ]

  const head = Buffer.from(parts.join(''))
  const tail = Buffer.from(`\r\n--${boundary}--\r\n`)
  const body = Buffer.concat([head, imageBuffer, tail])

  const options = {
    hostname: 'upload.gyazo.com',
    port: 443,
    path: '/upload.cgi',
    method: 'POST',
    headers: {
      'Content-Length': body.length,
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'User-Agent': 'Gyazo/1.0',
    },
  }

  const proxyReq = https.request(options, (proxyRes) => {
    let responseData = ''
    proxyRes.on('data', (chunk) => { responseData += chunk })
    proxyRes.on('end', () => {
      res.status(200).send(responseData)
    })
  })

  proxyReq.on('error', () => {
    res.status(502).send('Upload failed')
  })

  proxyReq.write(body)
  proxyReq.end()
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}
