import styles from "../../styles/Product.module.css";
import Head from "next/head";
import { client } from "../../prismic-configuration";
import Prismic from "prismic-javascript";

export default function Product(props) {
  return (
    <div>
      {props.posts.results.map(post => (
        <>
          <div key={post?.uid} className={styles.container}>
            <Head>
              <title>{post?.uid}</title>
            </Head>
          </div>
          <div>
            <h1>{props?.post?.data?.title}</h1>
            <h1>hello</h1>
            <h4>{props?.post?.data?.description}</h4>
            <img
              src={props?.post?.data?.image?.url}
              src={props?.post?.data?.image?.alt}
            />
          </div>
        </>
      ))}
    </div>
  );
}

export async function getStaticPaths() {
  const res = await client.query(
    Prismic.Predicates.at("document.type", "page"),
    { orderings: "[my.post.date desc]" }
  );
  const posts = await res.json();
  const paths = posts.map(post => ({
    params: { id: post.uid }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps() {
  const posts = await client.query(
    Prismic.Predicates.at("document.type", "page"),
    { orderings: "[my.post.date desc]" }
  );
  return {
    props: {
      posts
    }
  };
}
