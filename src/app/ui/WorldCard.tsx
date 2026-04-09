import Image from "next/image";
import { World } from "@/app/lib/worlds";

interface WorldCardProps {
    world: World;
    imageUrl: string | false | null;
    downloadUrl: string;
}

export default function WorldCard({
    world,
    imageUrl,
    downloadUrl,
}: WorldCardProps) {
    return (
        <div className="card card-border border-neutral border-3 bg-base-200 shadow-sm flex flex-col">
            {/* Thumbnail */}
            {imageUrl ? (
                <figure className="relative w-full aspect-video overflow-hidden rounded-t-xl">
                    <Image
                        src={imageUrl}
                        alt={world.name ?? "World thumbnail"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </figure>
            ) : (
                <figure className="w-full aspect-video bg-neutral flex items-center justify-center rounded-t-xl">
                    <span className="text-neutral-content opacity-30 text-md font-mono">
                        no preview
                    </span>
                </figure>
            )}

            {/* Body */}
            <div className="card-body flex flex-col gap-2 flex-1">
                <div className="flex flex-col gap-1 flex-1">
                    {/* Name + badges row */}
                    <div className="flex items-start justify-between gap-2">
                        {world.name && (
                            <h2 className="card-title text-lg">{world.name}</h2>
                        )}
                        <div className="flex gap-1 flex-shrink-0 mt-0.5">
                            {world.version && (
                                <span className="badge badge-soft badge-neutral font-mono text-xs">
                                    {world.version}
                                </span>
                            )}
                            {world.modded && (
                                <span className="badge badge-soft badge-warning text-xs">
                                    Modded
                                </span>
                            )}
                        </div>
                    </div>

                    {world.date && (
                        <time className="font-mono italic text-xs text-primary">
                            {world.date}
                        </time>
                    )}

                    {world.description && (
                        <p className="text-sm text-base-content/70 text-left leading-relaxed mt-1">
                            {world.description}
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="card-actions mt-4 flex flex-col gap-2">
                    <a
                        href={downloadUrl}
                        className="btn btn-primary btn-md w-full gap-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 4v12m0 0-4-4m4 4 4-4" />
                            <path d="M4 20h16" />
                        </svg>
                        Download World
                    </a>
                    {world.modlist && (
                        <a
                            href={world.modlist}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-dash btn-warning btn-sm w-full gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M9 12h6M9 16h6M9 8h6M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
                            </svg>
                            View Mod List
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
