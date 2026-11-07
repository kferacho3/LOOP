'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type TouchEvent,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { HeroSlide } from '@/content/home-hero';
import { TextLink } from './ui';
import styles from './home-hero.module.css';

type Selection = { active: number; target: number; previous: number | null };
const photoSizes = '(min-width: 1536px) 800px, (min-width: 800px) 51vw, 90vw';
const ordinal = (number: number) => String(number).padStart(2, '0');

function JournalPhoto({
  slide,
  state,
  lead,
  fade,
  onReady,
}: {
  slide: HeroSlide;
  state: 'active' | 'previous' | 'pending';
  lead: boolean;
  fade: boolean;
  onReady: () => void;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={styles.photoLayer}
      data-state={state}
      data-fade={fade || undefined}
      aria-hidden={state !== 'active' || undefined}
    >
      {failed ? (
        <p className={styles.fallback}>Photo unavailable</p>
      ) : (
        <Image
          src={slide.photo}
          alt={slide.alt}
          fill
          sizes={photoSizes}
          loading="eager"
          fetchPriority={lead ? 'high' : undefined}
          placeholder="blur"
          draggable={false}
          className={styles.photo}
          style={slide.crop}
          onLoad={onReady}
          onError={() => {
            setFailed(true);
            onReady();
          }}
        />
      )}
    </div>
  );
}

export function HomeHero({ slides }: { slides: HeroSlide[] }) {
  const [selection, setSelection] = useState<Selection>({ active: 0, target: 0, previous: null });
  const touchStart = useRef<{ clientX: number; clientY: number; identifier: number } | null>(null);
  const dots = useRef<HTMLDivElement>(null);
  const activeDot = useRef<HTMLButtonElement>(null);
  const keyboardOrigin = useRef<HTMLButtonElement | null>(null);
  const { active, target, previous } = selection;
  const count = slides.length;
  const current = slides[active];
  const photoIndexes = [...new Set([previous, active, target])].filter((index) => index !== null);
  const visibleDots = Math.min(5, count);
  const firstDot = Math.max(0, Math.min(active - Math.floor(visibleDots / 2), count - visibleDots));
  const lastDot = firstDot + visibleDots - 1;
  const dotWindow = { '--dot-count': visibleDots, '--dot-offset': -firstDot } as CSSProperties;

  useEffect(() => {
    if (keyboardOrigin.current === document.activeElement) {
      activeDot.current?.focus({ preventScroll: true });
    }
    keyboardOrigin.current = null;
  }, [active]);

  function selectPhoto(
    destination: number | ((target: number) => number),
    origin: HTMLButtonElement | null = null,
  ) {
    keyboardOrigin.current = origin;
    setSelection((state) => {
      const next = typeof destination === 'number' ? destination : destination(state.target);
      if (next === state.target) return state;
      // The previous photo is already mounted, so returning to it needs no load event.
      if (next === state.previous) return { active: next, target: next, previous: state.active };
      return { ...state, target: next };
    });
  }

  function step(direction: number, origin?: HTMLButtonElement | null) {
    selectPhoto((index) => (index + direction + count) % count, origin);
  }

  function showLoadedPhoto(index: number) {
    // Keep the current spread visible until the requested photo has decoded.
    setSelection((state) =>
      index === state.target && index !== state.active
        ? { active: index, target: index, previous: state.active }
        : state,
    );
  }

  function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
    const origin =
      event.target instanceof HTMLButtonElement && dots.current?.contains(event.target)
        ? event.target
        : null;
    switch (event.key) {
      case 'ArrowLeft':
        step(-1, origin);
        break;
      case 'ArrowRight':
        step(1, origin);
        break;
      case 'Home':
        selectPhoto(0, origin);
        break;
      case 'End':
        selectPhoto(count - 1, origin);
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  function handleSwipe(event: TouchEvent<HTMLDivElement>) {
    const start = touchStart.current;
    touchStart.current = null;
    const end = event.changedTouches[0];
    if (!start || !end || start.identifier !== end.identifier) return;
    const dx = end.clientX - start.clientX;
    const dy = end.clientY - start.clientY;
    if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.4) step(dx < 0 ? 1 : -1);
  }

  return (
    <section
      className={styles.hero}
      aria-label="The LOOP photo journal"
      aria-roledescription="carousel"
    >
      <div className={`shell ${styles.layout}`}>
        <div id="home-hero-story" className={styles.copy}>
          <div className={styles.storyStack}>
            {slides.map((slide, index) => {
              const isActive = index === active;
              const Heading = isActive ? 'h1' : 'p';
              return (
                <div
                  key={slide.photo.src}
                  className={styles.story}
                  data-active={isActive || undefined}
                  data-fade={(isActive && previous !== null) || undefined}
                  aria-hidden={!isActive || undefined}
                >
                  <p className={`eyebrow ${styles.eyebrow}`}>
                    <span aria-hidden />
                    {slide.label}
                  </p>
                  <Heading className={styles.title}>
                    {slide.title}
                    <br />
                    <span>{slide.emphasis}</span>
                  </Heading>
                  <p className={styles.body}>{slide.body}</p>
                </div>
              );
            })}
          </div>
          <div className={styles.actions}>
            <Link href={current.link.href} className="brand-button">
              {current.link.text}
              <ArrowRight size={17} aria-hidden />
            </Link>
            <TextLink href="/about">About LOOP</TextLink>
          </div>
        </div>

        <figure
          className={styles.gallery}
          aria-labelledby="home-hero-event-title"
          aria-describedby="home-hero-event-caption"
        >
          <div className={styles.frame}>
            <div
              id="home-hero-photo"
              className={styles.stage}
              onTouchStart={(event) => {
                touchStart.current = event.touches.length === 1 ? event.touches[0] : null;
              }}
              onTouchEnd={handleSwipe}
              onTouchCancel={() => {
                touchStart.current = null;
              }}
            >
              {photoIndexes.map((index) => (
                <JournalPhoto
                  key={slides[index].photo.src}
                  slide={slides[index]}
                  state={index === active ? 'active' : index === previous ? 'previous' : 'pending'}
                  lead={index === 0}
                  fade={index === active && previous !== null}
                  onReady={() => showLoadedPhoto(index)}
                />
              ))}
              <span className={styles.count} aria-hidden>
                {ordinal(active + 1)} / {ordinal(count)}
              </span>
            </div>
          </div>

          <div
            className={styles.controls}
            role="group"
            aria-label="Photo controls"
            onKeyDown={handleKeys}
          >
            <button
              type="button"
              className={styles.arrow}
              aria-label="Previous photo"
              onClick={() => step(-1)}
            >
              <ArrowLeft size={18} aria-hidden />
            </button>
            <div ref={dots} className={styles.dots} style={dotWindow}>
              <div className={styles.dotTrack}>
                {slides.map((slide, index) => (
                  <button
                    key={slide.photo.src}
                    ref={index === active ? activeDot : undefined}
                    type="button"
                    className={styles.dot}
                    data-edge={
                      (index === firstDot && firstDot > 0) ||
                      (index === lastDot && lastDot < count - 1) ||
                      undefined
                    }
                    aria-label={`Photo ${index + 1} of ${count}: ${slide.label}`}
                    aria-controls="home-hero-story home-hero-photo"
                    aria-current={index === active ? 'true' : undefined}
                    tabIndex={index >= firstDot && index <= lastDot ? undefined : -1}
                    onClick={() => selectPhoto(index)}
                  />
                ))}
              </div>
            </div>
            <button
              type="button"
              className={styles.arrow}
              aria-label="Next photo"
              onClick={() => step(1)}
            >
              <ArrowRight size={18} aria-hidden />
            </button>
          </div>

          <figcaption className={styles.caption}>
            <strong id="home-hero-event-title">LOOP Youth Experience | LA Clippers</strong>
            <p id="home-hero-event-caption">
              Through community partnerships, LOOP brought youth together for an evening of
              basketball, connection, and fun at the Intuit Dome. A special thank you to the LA
              Clippers and Islah Academy for helping make this experience possible.
            </p>
          </figcaption>
        </figure>
      </div>
      <p role="status" className="sr-only">
        Photo {active + 1} of {count}: {current.title} {current.emphasis}
      </p>
    </section>
  );
}
