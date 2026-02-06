"use client";

import { updateNumberOfLikes } from "@/src/lib/prisma-db";

export default function Like({ id, amount }) {
    const handleClick = () => {
        updateNumberOfLikes(id, amount + 1);
    };

    return <span onClick={handleClick}>{amount} ❤️</span>;
}