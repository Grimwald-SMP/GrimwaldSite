const STATIC_URL = "https://static.grimwald.xyz/static/";

export interface World {
    id: string;
    name: string;
    description?: string;
    date?: string;
    image?: string;
    version?: string;
    modded?: boolean;
    modlist?: string;
    link?: string;
}

interface RawWorldData {
    id: string;
    name: string;
    description?: string;
    date?: string;
    image?: string;
    version?: string;
    modded?: boolean;
    modlist?: string;
    link?: string;
}

function parseWorldsJson(data: RawWorldData[]): World[] {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        date: item.date,
        image: item.image ? url(item.image) : undefined,
    }));
}

function url(path: string): string {
    return STATIC_URL + path;
}

function fetchStatic(path: string): Promise<Response> {
    return fetch(url(path));
}

export async function getAvailableWorlds(): Promise<World[]> {
    const res = await fetchStatic("/worlds/worlds.json");
    const data = await res.json();
    return parseWorldsJson(data);
}

export async function getWorldThumbnailURL(id: string) {
    const img = await fetchStatic(`/worlds/thumbnails/${id}.png`);
    if (!img.ok) return false;
    return url(`/worlds/thumbnails/${id}.png`);
}

export async function getWorldDownloadURL(id: string) {
    return url(`/worlds/downloads/${id}.zip`);
}
