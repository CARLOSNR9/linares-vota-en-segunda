import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AnimatedCounter({ value, duration = 1, prefix = "", suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value, 10);
      if (isNaN(end)) {
        setCount(value);
        return;
      }
      
      const totalFrames = Math.round((duration * 1000) / 16); // 60fps
      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        // Ease out quad
        const easeOutProgress = progress * (2 - progress);
        const currentCount = Math.round(end * easeOutProgress);

        if (frame === totalFrames) {
          clearInterval(counter);
          setCount(end);
        } else {
          setCount(currentCount);
        }
      }, 16);

      return () => clearInterval(counter);
    }
  }, [value, duration, isInView]);

  return (
    <span ref={ref} className="inline-block">
      {prefix}
      {typeof count === 'number' ? new Intl.NumberFormat('es-CO').format(count) : count}
      {suffix}
    </span>
  );
}
