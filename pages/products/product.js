import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { client } from "../../prismic-configuration";
import Prismic from "prismic-javascript";
import { RichText } from "prismic-reactjs";

export default function Shop(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>PRODUCT</title>
      </Head>

      <>
        <main className={styles.main}>
          <h1>{RichText.asText(props?.posts?.data?.title)}</h1>
          <p>{RichText.asText(props?.posts?.data?.description)}</p>
          <img
            src={props?.posts?.data?.image?.url}
            alt={props?.posts?.data?.image?.alt}
          />
        </main>
        <Link href="/product">
          <a className={styles.footer}>&larr; Return to Products</a>
        </Link>
      </>

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
  const posts = await client.getByUID("page", "coffee-1");
  return {
    props: {
      posts
    }
  };
}
