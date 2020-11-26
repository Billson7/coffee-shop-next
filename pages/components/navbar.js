import Link from "next/link";
import styles from "../../styles/singleProduct.module.css";

export default function NavBar() {
  return (
    <div className={styles.nav}>
      <div>
        <div className="inline-block text-gray-700 text-center px-4 py-2 m-2">
          <Link href="/">
            <a> Home </a>
          </Link>{" "}
        </div>
        |
        <div className="inline-block text-gray-700 text-center px-4 py-2 m-2">
          <Link href="/product">
            <a>Products </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
