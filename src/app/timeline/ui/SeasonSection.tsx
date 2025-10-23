'use client';

import { memo } from 'react';
import { SeasonData } from './TimelineData';
import { TimelineEvent } from './TimelineEvent';

interface SeasonSectionProps {
  seasonKey: string;
  seasonData: SeasonData;
  seasonIndex: number;
}

const SeasonSection = memo(({ seasonKey, seasonData, seasonIndex }: SeasonSectionProps) => {
  return (
    <section
      id={seasonKey}
      className="w-full relative min-h-screen flex flex-col items-center py-12 md:py-16 px-2 md:px-4"
      style={{
        backgroundImage: `url(${seasonData.background})`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl px-2 md:px-0">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-primary">
          Season {seasonIndex + 1}
        </h2>

        {/* Desktop Timeline */}
        <ul className="timeline timeline-snap-icon timeline-vertical hidden md:block">
          {seasonData.events.map((event, eventIndex) => (
            <TimelineEvent
              key={eventIndex}
              event={event}
              eventIndex={eventIndex}
              isLast={eventIndex === seasonData.events.length - 1}
              isMobile={false}
            />
          ))}
        </ul>

        {/* Mobile Timeline */}
        <div className="flex flex-col gap-6 md:hidden">
          {seasonData.events.map((event, eventIndex) => (
            <TimelineEvent
              key={eventIndex}
              event={event}
              eventIndex={eventIndex}
              isLast={eventIndex === seasonData.events.length - 1}
              isMobile={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

SeasonSection.displayName = 'SeasonSection';

export default SeasonSection;
