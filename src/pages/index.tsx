import styles from '@/styles/Home.module.css';
import { Inter } from 'next/font/google';
import Head from 'next/head';
// import { prove } from "tlsn-js";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  async function getDefault() {

    const { prove, verify } = (await import('tlsn-js'))

    console.time('prove');
    const proof = await prove('https://swapi.dev/api/people/1', {
      method: 'GET',
      maxTranscriptSize: 16384,
      notaryUrl: 'http://localhost:7047',
      websocketProxyUrl: 'ws://0.0.0.0:55688',
    });
    console.timeEnd('prove');
    console.log("proof", proof)

    console.time('verify');
    const result = await verify(proof);
    console.timeEnd('verify');

    console.log(result);
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <button onClick={getDefault}>Get</button>
      </main>
    </>
  )
}
