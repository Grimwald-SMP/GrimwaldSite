"use client"

import {useEffect, useState} from "react";

export default function CountUp({startEpoch}: { startEpoch: number }) {
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        const update = () => {
            const now = Math.floor(Date.now() / 1000);
            setElapsed(now - startEpoch);
        };

        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, [startEpoch]);

    const secondsInMinute = 60;
    const secondsInHour = 3600;
    const secondsInDay = 86400;
    const secondsInMonth = 2629746;
    const secondsInYear = 31556952;

    const years = Math.floor(elapsed / secondsInYear);
    const months = Math.floor((elapsed % secondsInYear) / secondsInMonth);
    const days = Math.floor((elapsed % secondsInMonth) / secondsInDay);
    const hours = Math.floor((elapsed % secondsInDay) / secondsInHour);
    const minutes = Math.floor((elapsed % secondsInHour) / secondsInMinute);
    const seconds = elapsed % secondsInMinute;

    return (
        <div className="grid grid-flow-col gap-2 md:gap-5 text-center auto-cols-max">
            {[
                {label: "years", value: years, digits: 1},
                {label: "months", value: months, digits: 2},
                {label: "days", value: days, digits: 2},
                {label: "hours", value: hours, digits: 2},
                {label: "min", value: minutes, digits: 2},
                {label: "sec", value: seconds, digits: 2},
            ].map(({label, value, digits}) => {
                if (value === 0) return null;

                return (
                    <div
                        key={label}
                        className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content"
                    >
                          <span className="countdown font-mono text-3xl md:text-5xl">
                              <span
                                style={{"--value": value, "--digits": digits} as React.CSSProperties}
                                aria-live="polite"
                                aria-label={`${value} ${label}`}
                              >
                              {value}
                              </span>
                          </span>
                          {label}
                    </div>
            )})}
        </div>
    );
}
