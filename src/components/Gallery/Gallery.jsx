"use client";
import styles from "./Gallery.module.css";
import { useState } from "react";
import { updateLikes } from "@/src/actions/services";
import Select from "@/src/components/Select/Select";
import Carousel from "../Carousel/Carousel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Gallery({ medias, photographer }) {
    const [mediasState, setMediasState] = useState(medias);
    const [sort, setSort] = useState("popularity");

    const options = [
        { label: "Popularité", value: "popularity" },
        { label: "Date", value: "date" },
        { label: "Titre", value: "title" }
    ];

    const sortedMedias = [...mediasState].sort((a, b) => {
        if (sort === "popularity") return b.likes - a.likes
        if (sort === "date") return new Date(b.date) - new Date(a.date)
        if (sort === "title") return a.title.localeCompare(b.title)
        return 0
    });

    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openModalAt = (index) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    const handleLike = (mediaId) => {
        setMediasState(prev => prev.map(media => media.id === mediaId ? { ...media, likes: media.likes + 1 } : media));
        updateLikes(mediaId, mediasState.find(m => m.id === mediaId).likes + 1);
    }

    return (
        <section className={styles.gallery}>
            <div className={styles.filter}>
                <span>Trier par</span>
                <Select options={options} value={sort} onChange={setSort} />
            </div>
            <div className={styles.medias}>
                {sortedMedias.map((m, i) => (
                    <div key={m.id} className={styles.media}>
                        <div onClick={() => openModalAt(i)}>
                            {m.image && <img src={`/media/${m.image}`} alt={m.title} />}
                            {m.video &&
                                <video autoPlay muted loop>
                                    <source src={`/media/${m.video}`} type="video/mp4" />
                                </video>
                            }
                        </div>
                        <div className={styles.details}>
                            <h2>{m.title}</h2>
                            <span onClick={() => handleLike(m.id)}>
                                {m.likes}
                                <FontAwesomeIcon icon={faHeart} />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <Carousel isOpen={isOpen} onClose={() => setIsOpen(false)} medias={sortedMedias} index={currentIndex} />
            <div className={styles.price}>
                <span>
                    {mediasState.reduce((sum, media) => sum + media.likes, 0).toLocaleString("fr-FR")}
                    <FontAwesomeIcon icon={faHeart} />
                </span>
                <span>{photographer.price}€ / jour</span>
            </div>
        </section>
    );
}