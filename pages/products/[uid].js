// pages/product/[id].js
import Link from "next/link";
import styles from "../../styles/singleProduct.module.css";
import { client } from "../../prismic-configuration";
import { RichText } from "prismic-reactjs";
import Prismic from "prismic-javascript";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
function Product(props) {
  const router = useRouter();
  const { uid } = router.query;

  return (
    <div className={styles.container}>
      <Head>
        <title>{RichText.asText(props?.posts?.data?.title)}</title>
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
        <div className={styles.image}>
          <img
            src={props?.posts?.data?.image?.url}
            alt={props?.posts?.data?.image?.alt}
          />
        </div>
        <div className={styles.information}>
          <h1>{RichText.asText(props?.posts?.data?.title)}</h1>
          <h3 className={styles.productTitle}>£{props?.posts?.data?.price}</h3>
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

export default Product;
export async function getStaticPaths() {
  const res = await client.query(
    Prismic.Predicates.at("document.type", "page"),
    {
      orderings: "[my.post.date desc]",
    }
  );

  const paths = res?.results?.map(({ uid }) => ({ params: { uid } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const posts = await client.getByUID("page", `${params.uid}`);

  return {
    props: {
      posts,
    },
  };
}
