import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>楽ギャキ - Gyazoお絵描き</title>
      </Head>
      <style jsx>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
          color: #333;
          line-height: 1.7;
        }
        .container {
          max-width: 720px;
          margin: 0 auto;
          padding: 24px;
        }
        h1 {
          font-size: 1.8em;
          margin-bottom: 16px;
        }
        a {
          color: #0066cc;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        .gallery {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 20px 0;
        }
        .gallery img {
          height: 100px;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        }
        .try-button {
          display: inline-block;
          font-size: 1.2em;
          background: #333;
          color: #fff;
          padding: 12px 28px;
          border-radius: 6px;
          margin: 20px 0;
        }
        .try-button:hover {
          background: #555;
          text-decoration: none;
        }
        ul {
          padding-left: 1.5em;
        }
        li {
          margin-bottom: 6px;
        }
        footer {
          margin-top: 32px;
          padding-top: 16px;
          border-top: 1px solid #ddd;
          color: #888;
          font-size: 0.9em;
        }
      `}</style>
      <div className="container">
        <h1>楽ギャキ - Gyazoお絵描き</h1>

        <div className="gallery">
          <img src="https://gyazo.com/0b859e407cdb3cbf1066a44a9368a018.png" />
          <img src="https://gyazo.com/747b880b4349fcb597224098904d21bd.png" />
          <img src="https://gyazo.com/89c0e409e02a9ae2e4ef509d6e4faf21.png" />
          <img src="https://gyazo.com/f586f6445a081873268bf48322e4879b.png" />
          <img src="https://gyazo.com/393acad6a753ed519c4bd3f242db22fb.png" />
          <img src="https://gyazo.com/cf139b72c14c86d56c1a710624c4f97c.png" />
          <img src="https://gyazo.com/b8b9b57ee21bc78f4aebdafe0a8edfd6.png" />
        </div>

        <ul>
          <li><b>楽ギャキはタブレットやパソコンのブラウザで描いた絵をすぐに<a href="https://gyazo.com/">Gyazo</a>にアップロードするシステムです。</b></li>
          <li>http://Gyaki.org/<i>GyazoID</i> にアクセスして絵を描いた後で「UP」ボタンを押すと描いた絵がGyazoにアップされます。
            <ul>
              <li><i>GyazoID</i>はGyazoユーザを識別する16進数文字列です</li>
              <ul>
                <li>Macでは ~/Library/Gyazo/id に書いてあります</li>
                <li>Windowsでは C:\Users\ (YOUR COMPUTER&apos;S USER NAME) \AppData\Roaming\Gyazo\id.txt にあります</li>
              </ul>
              <li>描いた絵やキャプチャした画像のリストを
                <a href="https://gyazo.com/history">https://gyazo.com/history</a>
                で見ることができます。</li>
            </ul>
          </li>
          <li>ソースは<a href="https://github.com/masui/Gyaki">GitHub</a>に置いてあります。</li>
        </ul>

        <a href="/01234567890123456789" className="try-button">楽ギャキを試してみる</a>

        <footer>
	  &copy; 2013-2026 Toshiyuki Masui
          <a href="mailto:masui@pitecan.com">masui@pitecan.com</a>
          {' / '}
          <a href="https://twitter.com/masui">@masui</a>
        </footer>
      </div>
    </>
  )
}
