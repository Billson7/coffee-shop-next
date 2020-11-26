import Link from "next/link";
import styles from "../../styles/singleProduct.module.css";
import { client } from "../../prismic-configuration";
import { RichText } from "prismic-reactjs";
import Prismic from "prismic-javascript";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/navbar";

function Product(props) {
  const router = useRouter();
  const { uid } = router.query;

  return (
    <div className={styles.container}>
      <Head>
        <title>{RichText.asText(props?.posts?.data?.title)}</title>
      </Head>

      <NavBar />

      <main className={styles.main}>
        <div className=" m-auto w-5/12">
          <img
            className="object-contain rounded-xl shadow-xl m-4"
            src={props?.posts?.data?.image?.url}
            alt={props?.posts?.data?.image?.alt}
          />
        </div>
        <div className="m-auto w-5/12">
          <div className="text-gray-600 text-sm">
            Bean Type: {props?.posts?.data?.bean_types}
          </div>
          <h1 className="text-gray-900font-semibold text-3xl leading-tight mt-2">
            {RichText.asText(props?.posts?.data?.title)}
          </h1>
          <p className="mt-2">
            £{props?.posts?.data?.price}{" "}
            <span className="text-gray-600 text-sm mt-6">/ per bag</span>
          </p>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-6">
            Add to Bag
          </button>
          <p className="text-gray-900 font-normal text-base leading-tight mt-6">
            {RichText.asText(props?.posts?.data?.description)}
          </p>
          <div>
            <p className="text-gray-900 font-semibold text-md leading-relaxed mt-6">
              {RichText.render(props?.posts?.data?.coffeeinfo)}
            </p>
          </div>

          <Link href={`/product/`}>
            <a>
              <div className="text-gray-600 text-sm mt-6">
                &larr; Return to Products
              </div>
            </a>
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
