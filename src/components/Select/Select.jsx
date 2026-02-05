"use client";
import styles from "./Select.module.css";
import { useState, useRef, useEffect } from "react";

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
                {selected?.label || "Select…"}
                <img src="/assets/arrow.svg" alt="Select Arrow"/>
            </button>

            {open && (
                <ul className={styles.dropdown}>
                    {sortedOptions.map((o, i) => (
                        <li key={o.value}
                            className={styles.option}
                            onClick={() => {
                                onChange(o.value);
                                setOpen(false);
                            }}>{o.label}{i == 0 && <img src="/assets/arrow.svg"/>}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}