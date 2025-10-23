'use client';

import { memo } from 'react';
import Image from 'next/image';
import { TimelineEvent as TimelineEventType } from './TimelineData';
import { getYouTubeEmbedUrl } from './TimelineData';

interface TimelineEventProps {
  event: TimelineEventType;
  eventIndex: number;
  isLast: boolean;
  isMobile: boolean;
}

export const TimelineEvent = memo(({ event, eventIndex, isLast, isMobile }: TimelineEventProps) => {
  if (isMobile) {
    return (
      <div className="relative pl-8">
        {/* Timeline line */}
        {!isLast && (
          <div className="absolute left-1.5 top-8 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/20"></div>
        )}

        {/* Timeline dot */}
        <div className="absolute left-0 top-3 w-4 h-4 rounded-full bg-primary"></div>

        {/* Content card */}
        <div className="card bg-base-100/90 backdrop-blur-md shadow-xl">
          <div className="card-body p-4">
            {event.date && (
              <time className="font-mono italic text-xs text-primary">
                {event.date}
              </time>
            )}
            <h3 className="card-title text-lg">{event.title}</h3>
            <p className="text-sm text-base-content/80">{event.description}</p>

            {event.image && (
              <figure className="mt-3 relative w-full h-48">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={400}
                  height={225}
                  className="rounded-lg object-cover"
                  loading="lazy"
                />
              </figure>
            )}

            {event.video && (
              <div className="mt-3">
                <div className="aspect-video w-full rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={getYouTubeEmbedUrl(event.video) || ''}
                    title={event.title}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="border-0"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Desktop version
  return (
    <li>
      {eventIndex > 0 && <hr className="bg-primary"/>}
      <div className="timeline-middle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5 text-primary">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clipRule="evenodd"/>
        </svg>
      </div>
      <div className={`${eventIndex % 2 === 0 ? 'timeline-start' : 'timeline-end'} mb-10`}>
        <div className="card bg-base-100/90 backdrop-blur-md shadow-xl">
          <div className="card-body">
            {event.date && (
              <time className="font-mono italic text-sm text-primary">
                {event.date}
              </time>
            )}
            <h3 className="card-title text-xl">{event.title}</h3>
            <p className="text-base-content/80">{event.description}</p>

            {event.image && (
              <figure className="mt-4 relative w-full h-64">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="rounded-lg object-cover"
                  loading="lazy"
                />
              </figure>
            )}

            {event.video && (
              <div className="mt-4">
                <div className="aspect-video w-full rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={getYouTubeEmbedUrl(event.video) || ''}
                    title={event.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="border-0"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {!isLast && <hr className="bg-primary"/>}
    </li>
  );
});

TimelineEvent.displayName = 'TimelineEvent';
