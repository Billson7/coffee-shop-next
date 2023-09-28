import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Product.module.css";
import { client } from "../prismic-configuration";
import Prismic from "prismic-javascript";
import { RichText } from "prismic-reactjs";
import NavBar from "./components/navbar";

export default function Shop(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{RichText.asText(props?.product?.data?.headline)}</title>
      </Head>
      <NavBar />
      <main className={styles.main}>
        <h1 className="text-gray-900 font-semibold text-6xl leading-tight">
          {RichText.asText(props?.product?.data?.headline)}
        </h1>
        <p className="text-gray-600 font-normal text-lg leading-thin">
          {RichText.asText(props?.product?.data?.description)}
        </p>
        <Link href="/">
          <a className="text-gray-900 text-lg mt-6">&larr; Return home</a>
        </Link>
      </main>
      <div className={styles.grid}>
        {props?.posts?.results.map((post) => (
          <div key={post?.uid} className={styles.card}>
            <Link href={`/products/${post.uid}`}>
              <a>
                <img
                  className="object-cover shadow-xl"
                  src={post?.data?.image?.url}
                  alt={post?.data?.image?.alt}
                />
                <div className="p-6">
                  <p className="font-semibold text-md leading-tight truncate">
                    {RichText.asText(post?.data?.title)}
                  </p>
                  <p className="mt-1">
                    £{post?.data?.price}{" "}
                    <span className="text-gray-600 text-sm">/ per bag</span>
                  </p>

                  <p className="text-gray-900 text-sm mt-4">
                    More information &rarr;
                  </p>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
      <footer className={styles.footer}>Powered by caffeine</footer>
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
