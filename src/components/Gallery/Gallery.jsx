"use client";
import styles from "./Gallery.module.css";
import Select from "@/src/components/Select/Select";
import { useState } from "react";

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
                                {/* <svg className={styles.like} viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg"><path fill="#901C1C" d="M8.75 18.35L7.48125 17.03C2.975 12.36 0 9.28 0 5.5C0 2.42 2.1175 0 4.8125 0C6.335 0 7.79625 0.81 8.75 2.09C9.70375 0.81 11.165 0 12.6875 0C15.3825 0 17.5 2.42 17.5 5.5C17.5 9.28 14.525 12.36 10.0188 17.04L8.75 18.35Z" /></svg> */}
                                <img src="/assets/like.svg" className={styles.like} />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}