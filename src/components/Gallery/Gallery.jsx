"use client";
import styles from "./Gallery.module.css";
import Select from "@/src/components/Select/Select";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Gallery({ medias }) {
    const [sort, setSort] = useState("popularity");
    const options = [
        { label: "Popularité", value: "popularity" },
        { label: "Date", value: "date" },
        { label: "Titre", value: "title" }
    ];
    const sortedMedias = [...medias].sort((a, b) => {
        if (sort === "popularity") return b.likes - a.likes;
        if (sort === "date") return new Date(b.date) - new Date(a.date);
        if (sort === "title") return a.title.localeCompare(b.title);
        return 0;
    });
    return (
        <section className={styles.gallery}>
            <div className={styles.filter}>
                <span>Trier par</span>
                <Select options={options} value={sort} onChange={setSort} />
            </div>
            <div className={styles.medias}>
                {sortedMedias.map((m, i) => (
                    <div key={i} className={styles.media}>
                        {m.image && <img src={`/media/${m.image}`} alt={m.title} />}
                        {m.video &&
                            <video autoPlay muted loop>
                                <source src={`/media/${m.video}`} type="video/mp4" />
                            </video>
                        }
                        <div className={styles.details}>
                            <h2>{m.title}</h2>
                            <span>
                                {m.likes}
                                <FontAwesomeIcon icon={faHeart} />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}