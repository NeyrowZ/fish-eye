import styles from './page.module.css';
import { getAllPhotographers } from '../lib/prisma-db';
import Header from '@/src/components/Header/Header';
import Portrait from '@/src/components/Portrait/Portrait';
import Link from 'next/link';

export default async function Home() {
    const photographers = await getAllPhotographers();
    return (
        <>
            <Header title="Nos photographes" />
            <section className={styles.photographers}>
                {photographers.map((p) => (
                    <div key={p.id} className={styles.photographer}>
                        <Link href={`/photographers/${p.id}`}>
                            <Portrait photographer={p}/>
                            <h2>{p.name}</h2>
                        </Link>
                        <div className={styles.details}>
                            <span className={styles.location}>{p.city}, {p.country}</span>
                            <span className={styles.tagline}>{p.tagline}</span>
                            <span className={styles.price}>{p.price}€/jour</span>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}