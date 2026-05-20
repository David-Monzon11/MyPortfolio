import { useRef, useCallback, useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import ChannelLabel from './ChannelLabel';
import './Carousel.css';

const GAP = 2;
const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

function CarouselItem({ item, index, itemWidth, trackItemOffset, x }) {
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
  const rotateY = useTransform(x, range, [60, 0, -60], { clamp: true });

  return (
    <motion.div
      className="carousel-item"
      style={{ width: itemWidth, rotateY }}
    >
      <div className="carousel-item__header">
        <span className="carousel-item__icon-wrap">{item.icon}</span>
      </div>
      <div className="rack-divider-line" />
      <div className="carousel-item__body">
        <h3 className="carousel-item__title">{item.title}</h3>
        {item.subtitle && (
          <p className="carousel-item__subtitle">{item.subtitle}</p>
        )}
        <p className="carousel-item__desc">{item.description}</p>
      </div>
    </motion.div>
  );
}

export default function Carousel({
  items = [],
  channelLabel = '',
  channelIndex = '',
  baseWidth = 280,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
}) {
  const extraItems = loop ? 3 : 0;
  const [position, setPosition] = useState(extraItems);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [transitionType, setTransitionType] = useState('tween');

  const containerRef = useRef(null);
  const x = useMotionValue(0);

  const itemWidth = baseWidth - GAP;
  const trackItemOffset = itemWidth + GAP;

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setTransitionType('tween');
    setPosition(prev => (!loop ? Math.min(prev + 1, items.length - 1) : prev + 1));
  }, [isAnimating, loop, items.length]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setTransitionType('tween');
    setPosition(prev => (!loop ? Math.max(prev - 1, 0) : prev - 1));
  }, [isAnimating, loop]);

  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info;
    if (offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD) handleNext();
    else if (offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD) handlePrev();
  };

  useEffect(() => {
    if (!autoplay || (pauseOnHover && isHovered) || isAnimating) return;
    const id = setInterval(handleNext, autoplayDelay);
    return () => clearInterval(id);
  }, [autoplay, autoplayDelay, isHovered, isAnimating, handleNext, pauseOnHover]);

  const itemsForRender = useMemo(() => {
    if (!loop) return items;
    const result = [];
    for (let i = -extraItems; i < items.length + extraItems; i++) {
      result.push(items[((i % items.length) + items.length) % items.length]);
    }
    return result;
  }, [items, loop, extraItems]);

  const effectiveTransition =
    transitionType === 'jump'
      ? { duration: 0 }
      : isAnimating
      ? SPRING_OPTIONS
      : { type: 'tween', duration: 0.5 };

  return (
    <div className="carousel-wrapper">
      {channelLabel && (
        <ChannelLabel label={channelLabel} index={channelIndex} />
      )}
      <div
        ref={containerRef}
        className="carousel-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="carousel-track"
          drag={isAnimating ? false : 'x'}
          style={{
            width: itemWidth,
            gap: `${GAP}px`,
            perspective: 1000,
            perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
            x,
          }}
          onDragEnd={handleDragEnd}
          animate={{ x: -(position * trackItemOffset) }}
          transition={effectiveTransition}
          onAnimationStart={() => setIsAnimating(true)}
          onAnimationComplete={() => {
            if (transitionType === 'jump') {
              setTransitionType('tween');
              setIsAnimating(false);
              return;
            }
            setIsAnimating(false);
            if (loop) {
              if (position >= items.length + extraItems) {
                setTransitionType('jump');
                setPosition(position - items.length);
              } else if (position < extraItems) {
                setTransitionType('jump');
                setPosition(position + items.length);
              }
            }
          }}
        >
          {itemsForRender.map((item, index) => (
            <CarouselItem
              key={`${item?.id ?? index}-${index}`}
              item={item}
              index={index}
              itemWidth={itemWidth}
              trackItemOffset={trackItemOffset}
              x={x}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
