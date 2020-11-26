import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { client } from "../prismic-configuration";
import { RichText } from "prismic-reactjs";
import Image from "next/image";
import NavBar from "./components/navbar";

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{RichText.asText(props?.home?.data?.headline)}</title>
      </Head>
      <NavBar />
      <main className={styles.main}>
        <h1 className="text-gray-900 font-semibold text-6xl leading-tight">
          {RichText.asText(props?.home?.data?.headline)}
        </h1>
        <p className="text-gray-600 font-normal text-lg leading-thin">
          {RichText.asText(props?.home?.data?.description)}
        </p>
        <Link href="/product">
          <a className="text-gray-900 text-lg mt-6">Browse &rarr;</a>
        </Link>
      </main>

      <footer className={styles.footer}>Powered by caffeine</footer>
    </div>
  );
}

export async function getStaticProps() {
  const home = await client.getSingle("shop-home");

  return {
    props: {
      home,
    },
  };
}
