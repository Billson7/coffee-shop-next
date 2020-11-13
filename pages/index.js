import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { client } from "../prismic-configuration";
import { RichText } from "prismic-reactjs";
import Image from "next/image";

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{RichText.asText(props?.home?.data?.headline)}</title>
      </Head>
      <div className={styles.nav}>
        <Link href="/">
          <a> Home </a>
        </Link>{" "}
        ~~~~~~
        <Link href="/product">
          <a> Product </a>
        </Link>
      </div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          {RichText.asText(props?.home?.data?.headline)}
        </h1>
        <p className={styles.description}>
          {RichText.asText(props?.home?.data?.description)}
        </p>
        <Link href="/product">
          <a className={styles.footer}>Browse &rarr;</a>
        </Link>
        <img
          className={styles.heroImage}
          src={props?.home?.data?.image?.url}
          alt={props?.home?.data?.image?.alt}
        />
      </main>

      <footer className={styles.footer}>
        Powered by{" "}
        <Image
          width={60}
          height={20}
          src="/caffeine.png"
          alt="Caffeine Logo"
          className={styles.logo}
        />
      </footer>
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
