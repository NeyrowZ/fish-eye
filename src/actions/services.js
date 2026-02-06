"use server";
import { updateNumberOfLikes } from "@/src/lib/prisma-db";

export const updateLikes = async (mediaId, newNumberOfLikes) => {
    await updateNumberOfLikes(mediaId, newNumberOfLikes)
}