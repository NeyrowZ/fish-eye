"use client";
import styles from "./Contact.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Contact({ name }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button onClick={() => setIsOpen(true)} className={styles.contact}>Contactez-moi</button>
            {isOpen && <div className={styles.modal}>
                <form>
                    <div className={styles.header}>
                        <h1>Contactez-moi<br />{name}</h1>
                        <FontAwesomeIcon icon={faXmark} onClick={() => setIsOpen(false)} />
                    </div>
                    <div className={styles.fields}>
                        <div className={styles.field}>
                            <label for="firstname">Prénom</label>
                            <input type="text" id="firstname"/>
                        </div>
                        <div className={styles.field}>
                            <label for="lastname">Nom</label>
                            <input type="text" id="lastname"/>
                        </div>
                        <div className={styles.field}>
                            <label for="email">Email</label>
                            <input type="email" id="email"/>
                        </div>
                        <div className={styles.field}>
                            <label for="message">Votre message</label>
                            <textarea id="message" rows="3"></textarea>
                        </div>
                    </div>
                    <button type="submit">Envoyer</button>
                </form>
            </div>}
        </>
    );
}