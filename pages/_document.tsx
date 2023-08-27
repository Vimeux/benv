import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head />
      <body className='bg-white dark:bg-zinc-800 dark:text-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
