"use client";
import styles from "./Gallery.module.css";
import Select from "@/src/components/Select/Select";
import Carousel from "../Carousel/Carousel";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Gallery({ medias, photographer }) {
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

    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const openModalAt = (index) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    const [totalLikes, setTotalLikes] = useState(medias.reduce((sum, media) => sum + media.likes, 0));
    const [likedIds, setLikedIds] = useState([]);

    const handleLike = (mediaId) => {
        if (likedIds.includes(mediaId)) {
            setLikedIds(prev => prev.filter(id => id !== mediaId));
            setTotalLikes(prev => prev - 1);
        } else {
            setLikedIds(prev => [...prev, mediaId]);
            setTotalLikes(prev => prev + 1);
        }
    };

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
                            <span className={likedIds.includes(m.id) ? styles.liked : ''} onClick={() => handleLike(m.id)}>
                                {m.likes + (likedIds.includes(m.id) ? 1 : 0)}
                                <FontAwesomeIcon icon={faHeart} />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <Carousel isOpen={isOpen} onClose={() => setIsOpen(false)} medias={sortedMedias} index={currentIndex} />
            <div className={styles.price}>
                <span>
                    {totalLikes.toLocaleString("fr-FR")}
                    <FontAwesomeIcon icon={faHeart} />
                </span>
                <span>{photographer.price}€ / jour</span>
            </div>
        </section>
    );
}