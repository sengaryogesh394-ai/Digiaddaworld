
'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  endDate?: Date | string;
  discountPercentage?: number;
}

const CountdownTimer = ({ endDate, discountPercentage = 85 }: CountdownTimerProps) => {
  const calculateTimeLeft = () => {
    // Use provided endDate or default to 24 hours from now
    const targetDate = endDate ? new Date(endDate) : new Date(Date.now() + 24 * 60 * 60 * 1000);
    const difference = +targetDate - +new Date();
    
    let timeLeft = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60))),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set initial time left on client-side to avoid hydration mismatch
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const timerComponents = Object.keys(timeLeft).map(interval => {
    const value = timeLeft[interval as keyof typeof timeLeft];

    return (
        <div key={interval} className="text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <div className="text-2xl md:text-4xl font-bold bg-white dark:bg-gray-800 p-3 rounded-lg shadow-inner" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {String(value).padStart(2, '0')}
            </div>
            <div className="text-xs md:text-sm uppercase text-gray-500 dark:text-gray-400 mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{interval}</div>
        </div>
    );
  });

  return (
    <div className="space-y-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {discountPercentage > 0 && (
        <div className="text-center">
          <span className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full text-xl font-bold animate-pulse" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {discountPercentage}% OFF - Limited Time!
          </span>
        </div>
      )}
      <div className="flex justify-center gap-4">
        {timerComponents.length ? timerComponents : <span style={{ fontFamily: 'Poppins, sans-serif' }}>Time's up!</span>}
      </div>
    </div>
  );
};

export default CountdownTimer;
