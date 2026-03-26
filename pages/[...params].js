import Head from 'next/head'
import { useEffect } from 'react'
import { initDraw } from '../lib/draw'

export async function getServerSideProps(context) {
  const segments = context.params.params || []

  if (segments.length === 1 || segments.length === 2) {
    return {
      props: {
        id: segments[0],
        imageId: segments[1] || null,
      },
    }
  }

  return { notFound: true }
}

export default function DrawPage({ id, imageId }) {
  useEffect(() => {
    const cleanup = initDraw(id, imageId)
    return cleanup
  }, [id, imageId])

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, target-densitydpi=device-dpi, user-scalable=no" />
        <title>楽ギャキ</title>
      </Head>
      <style jsx global>{`
        body {
          background: whitesmoke;
          margin: 0;
          padding: 0;
        }
        canvas {
          background: white;
        }
      `}</style>
      <div id="draw-container" />
    </>
  )
}
