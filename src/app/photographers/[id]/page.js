import styles from "./page.module.css";
import { getAllMediasForPhotographer, getPhotographer } from "@/src/lib/prisma-db";
import Portrait from "@/src/components/Portrait/Portrait";
import Header from "@/src/components/Header/Header";
import Gallery from "@/src/components/Gallery/Gallery";

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
                <button>Contactez-moi</button>
                <Portrait photographer={p} />
            </section>
            <Gallery medias={medias} />
            <div className={styles.price}>
                <span>
                    {medias.reduce((sum, media) => sum + media.likes, 0).toLocaleString("fr-FR")}
                    <img src="/assets/like.svg"/>
                </span>
                <span>{p.price}€ / jour</span>
            </div>
        </>
    );
}