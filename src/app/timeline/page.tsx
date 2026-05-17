import FABTop from "@/app/ui/FABTop";
import { timelineData } from './ui/TimelineData';
import dynamic from 'next/dynamic';

// Dynamically import SeasonSection with loading state
const SeasonSection = dynamic(() => import('./ui/SeasonSection'), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>,
  ssr: true // Keep SSR for SEO
});

export default function TimelinePage() {
  const seasons = Object.entries(timelineData);

  return (
    <div className="flex flex-col items-center justify-center">
      <section className="w-full bg-neutral-200 flex flex-col items-center text-center gap-4 py-16 md:py-20 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-neutral-content">
          Grimwald SMP Timeline
        </h1>
        <p className="max-w-lg text-base text-neutral-content/80">
          Here&apos;s a large look at the history of the Grimwald SMP.
        </p>

        <nav className="flex flex-wrap justify-center gap-2 max-w-lg mt-4" aria-label="Season navigation">
          {seasons.map(([seasonKey]) => (
            <a
              key={seasonKey}
              href={`#${seasonKey}`}
              className="px-4 py-2 bg-base-200 hover:bg-primary hover:text-primary-content rounded-lg shadow-sm transition-colors duration-200 text-sm font-medium"
            >
              {seasonKey.charAt(0).toUpperCase() + seasonKey.substring(1, 6) + " " + seasonKey.substring(6)}
            </a>
          ))}
        </nav>
      </section>

      {seasons.map(([seasonKey, seasonData], seasonIndex) => (
        <SeasonSection
          key={seasonKey}
          seasonKey={seasonKey}
          seasonData={seasonData}
          seasonIndex={seasonIndex}
        />
      ))}

      <FABTop />
    </div>
  );
}