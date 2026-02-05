import styles from "./Header.module.css";
import Link from "next/link";

export default function Header({ title }) {
    return (
        <header className={styles.header}>
            <Link href="/">
                <img src="/assets/logo.svg" alt="Fish Eye Logo"/>
            </Link>
            {title && <h1>{title}</h1>}
        </header>
    );
}