import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { client } from "../prismic-configuration";
import { RichText } from "prismic-reactjs";

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Boxhead</title>
      </Head>
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
    </div>
  );
}

export async function getStaticProps() {
  const home = await client.getSingle("shop-home");

  return {
    props: {
      home
    }
  };
}
