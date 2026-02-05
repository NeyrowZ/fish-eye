import { prisma } from '../src/lib/prisma.js';
import photographers from './data/photographer.json' with { type: 'json' };
import medias from './data/media.json' with { type: 'json' };

async function main() {
    await prisma.photographer.createMany({
        data: photographers
    });

    await prisma.media.createMany({
        data: medias
    });
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })