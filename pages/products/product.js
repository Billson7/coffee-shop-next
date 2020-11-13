import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/singleProduct.module.css";

import { client } from "../../prismic-configuration";
import { RichText } from "prismic-reactjs";

export default function Shop(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{props?.posts?.uid}</title>
      </Head>
      <div className={styles.nav}>
        <Link href="/">
          <a> Home </a>
        </Link>{" "}
        | |
        <Link href="/product">
          <a> Product </a>
        </Link>
        | |shit
      </div>

      <main className={styles.main}>
        <div className={styles.image}>
          <img
            src={props?.posts?.data?.image?.url}
            alt={props?.posts?.data?.image?.alt}
          />
        </div>
        <div className={styles.information}>
          <h1 className={styles.productTitle}>
            {RichText.asText(props?.posts?.data?.title)}
          </h1>
          <p>{RichText.asText(props?.posts?.data?.description)}</p>
          <div>
            <p>{RichText.render(props?.posts?.data?.coffeeinfo)}</p>
          </div>
          <br />
          <div>Bean Type: {props?.posts?.data?.bean_types}</div>
          <br />

          <Link href={`/product/`}>
            <a>&larr; Return to Products</a>
          </Link>
        </div>
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
  const posts = await client.getByUID("page", "coffee-1");
  return {
    props: {
      posts,
    },
  };
}
