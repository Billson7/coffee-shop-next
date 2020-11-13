import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Product.module.css";
import Image from "next/image";
import { client } from "../prismic-configuration";
import Prismic from "prismic-javascript";
import { RichText } from "prismic-reactjs";

export default function Shop(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{RichText.asText(props?.product?.data?.headline)}</title>
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
          {RichText.asText(props?.product?.data?.headline)}
        </h1>
        <p className={styles.description}>
          {RichText.asText(props?.product?.data?.description)}
        </p>
        <Link href="/">
          <a className={styles.footer}>&larr; Return home</a>
        </Link>
      </main>

      <div className={styles.grid}>
        {props?.posts?.results.map((post) => (
          <div key={post?.uid} className={styles.card}>
            <Link href={`/products/${post.uid}`}>
              <a>
                <img width={300} height={300} src={post?.data?.image?.url} />

                <p>{RichText.asText(post?.data?.title)}</p>
                <p>More information &rarr;</p>
              </a>
            </Link>
          </div>
        ))}
      </div>

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
  const product = await client.getSingle("shop-products");
  const posts = await client.query(
    Prismic.Predicates.at("document.type", "page"),
    { orderings: "[my.post.date desc]" }
  );

  return {
    props: {
      product,
      posts,
    },
  };
}
