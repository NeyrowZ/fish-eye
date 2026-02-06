import styles from "./Carousel.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Carousel({ isOpen, onClose, medias, index }) {
    const [current, setCurrent] = useState(index || 0);

    useEffect(() => {
        setCurrent(index);
    }, [index]);

    const prev = () => setCurrent((c) => (c - 1 + medias.length) % medias.length);
    const next = () => setCurrent((c) => (c + 1) % medias.length);

    const m = medias[current];
    return (
        <>
            {isOpen && <div className={styles.modal}>
                <div className={styles.content}>
                    <FontAwesomeIcon icon={faChevronLeft} onClick={prev}/>
                    <div className={styles.media}>
                        {m.image && <img src={`/media/${m.image}`} alt={m.title} />}
                        {m.video &&
                            <video autoPlay muted loop>
                                <source src={`/media/${m.video}`} type="video/mp4" />
                            </video>
                        }
                    </div>
                    <FontAwesomeIcon icon={faChevronRight} onClick={next}/>
                    <span>{m.title}</span>
                    <FontAwesomeIcon icon={faXmark} className={styles.close} onClick={onClose} />
                </div>
            </div>}
        </>
    );
}