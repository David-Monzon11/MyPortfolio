import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './RackCard.css';

export default function RackCard({ unit = 'U1', label = '', index = '01', children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className={`rack-card ${className}`}
      initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
      animate={isInView ? { clipPath: 'inset(0 0 0% 0)', opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      <span className="rack-unit-id">{unit}</span>
      {children}
    </motion.div>
  );
}
