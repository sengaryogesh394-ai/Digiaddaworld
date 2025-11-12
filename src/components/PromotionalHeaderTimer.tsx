'use client';

import { useEffect, useState } from 'react';

interface PromotionalHeaderTimerProps {
  endDate?: Date;
}

export default function PromotionalHeaderTimer({ endDate }: PromotionalHeaderTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    if (!endDate) return;

    const calculateTimeLeft = () => {
      const difference = new Date(endDate).getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (!endDate) return null;

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center shadow-md">
        <span className="text-xl md:text-2xl font-bold text-black" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs text-white mt-1 font-medium">{label}</span>
    </div>
  );

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <TimeUnit value={timeLeft.days} label="Days" />
      <span className="text-white text-2xl font-bold">:</span>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="text-white text-2xl font-bold">:</span>
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <span className="text-white text-2xl font-bold">:</span>
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
}
