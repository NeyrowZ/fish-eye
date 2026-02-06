import styles from "./page.module.css";
import { getAllMediasForPhotographer, getPhotographer } from "@/src/lib/prisma-db";
import Header from "@/src/components/Header/Header";
import Contact from "@/src/components/Contact/Contact";
import Portrait from "@/src/components/Portrait/Portrait";
import Gallery from "@/src/components/Gallery/Gallery";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default async function PhotographerPage({ params }) {
    const { id } = await params;
    const p = await getPhotographer(parseInt(id));
    const medias = await getAllMediasForPhotographer(parseInt(id));
    return (
        <>
            <Header />
            <section className={styles.banner}>
                <div className={styles.details}>
                    <h1>{p.name}</h1>
                    <span className={styles.location}>{p.city}, {p.country}</span>
                    <span className={styles.tagline}>{p.tagline}</span>
                </div>
                <Contact name={p.name}/>
                <Portrait photographer={p} />
            </section>
            <Gallery medias={medias} />
            <div className={styles.price}>
                <span>
                    {medias.reduce((sum, media) => sum + media.likes, 0).toLocaleString("fr-FR")}
                    <FontAwesomeIcon icon={faHeart} />
                </span>
                <span>{p.price}€ / jour</span>
            </div>
        </>
    );
}