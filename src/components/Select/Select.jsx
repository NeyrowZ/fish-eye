"use client";
import styles from "./Select.module.css";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export default function Select({ options, value, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const selected = options.find((o) => o.value === value);
    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const sortedOptions = [
        ...(selected ? [selected] : []),
        ...options.filter((o) => o.value !== value),
    ];
    return (
        <div className={styles.select} ref={ref}>
            <button onClick={() => setOpen((o) => !o)}>
                {selected.label}
                <FontAwesomeIcon icon={faChevronDown} />
            </button>
            {open && (
                <ul className={styles.dropdown}>
                    {sortedOptions.map((o, i) => (
                        <li key={o.value}
                            className={styles.option}
                            onClick={() => {
                                onChange(o.value);
                                setOpen(false);
                            }}>{o.label}{i == 0 && <FontAwesomeIcon icon={faChevronUp} />}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}