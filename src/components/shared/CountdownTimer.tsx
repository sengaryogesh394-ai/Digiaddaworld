'use client';

import { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    // Set a future date for the countdown. For demonstration, let's set it 24 hours from now.
    const difference = +new Date().setHours(24, 0, 0, 0) - +new Date();
    let timeLeft = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
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

    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = Object.keys(timeLeft).map(interval => {
    if (!timeLeft[interval as keyof typeof timeLeft]) {
      return null;
    }

    return (
        <div key={interval} className="text-center">
            <div className="text-2xl md:text-4xl font-bold bg-white dark:bg-gray-800 p-3 rounded-lg shadow-inner">
                {String(timeLeft[interval as keyof typeof timeLeft]).padStart(2, '0')}
            </div>
            <div className="text-xs md:text-sm uppercase text-gray-500 dark:text-gray-400 mt-1">{interval}</div>
        </div>
    );
  });

  return (
    <div className="flex justify-center gap-4">
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
};

export default CountdownTimer;
