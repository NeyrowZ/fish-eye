import styles from "./Portrait.module.css";

export default function Portrait({ photographer }) {
    return (
        <img className={styles.portrait} src={`/portrait/${photographer.portrait}`} alt={photographer.name}/>
    );
}