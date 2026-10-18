import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Asterisk } from 'lucide-react';
import type { ReactNode } from 'react';
import { cx } from '@/lib/utils';
export function ButtonLink({
  href,
  children,
  variant = 'dark',
  className = '',
  arrow = true,
}: {
  href: string;
  children: ReactNode;
  variant?: 'dark' | 'light' | 'outline' | 'clay';
  className?: string;
  arrow?: boolean;
}) {
  const external = href.startsWith('https://');
  return (
    <Link
      href={href}
      {...(external ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
      className={cx(
        'group liquid inline-flex min-h-12 items-center justify-center gap-5 rounded-full px-6 py-3.5 text-sm font-semibold hover:-translate-y-0.5 active:scale-[.98]',
        variant === 'dark' && 'bg-ink text-paper hover:bg-forest',
        variant === 'light' && 'bg-paper text-ink hover:bg-white',
        variant === 'outline' && 'border border-current/30 bg-transparent',
        variant === 'clay' && 'bg-clay text-white hover:bg-[#833e2a]',
        className,
      )}
    >
      {children}
      {arrow &&
        (external ? (
          <ArrowUpRight size={17} aria-hidden />
        ) : (
          <ArrowRight size={17} className="liquid group-hover:translate-x-1" aria-hidden />
        ))}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </Link>
  );
}
export function TextLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cx(
        'group liquid inline-flex min-h-11 items-center gap-4 border-b border-current/30 pb-1 text-sm font-semibold hover:border-current',
        className,
      )}
    >
      {children}
      <ArrowUpRight
        size={17}
        className="liquid group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden
      />
    </Link>
  );
}
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={cx('eyebrow mb-6 flex items-center gap-2.5', light ? 'text-moss' : 'text-muted')}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {children}
    </p>
  );
}
export function Flower({ className = '' }: { className?: string }) {
  return <Asterisk strokeWidth={1.25} className={className} aria-hidden />;
}
export function SectionHeading({
  eyebrow,
  title,
  emphasis,
  description,
  light = false,
}: {
  eyebrow: string;
  title: string;
  emphasis?: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 className="section-title">
        {title}
        {emphasis && (
          <>
            <br />
            <span className={light ? 'text-moss' : 'text-clay'}>{emphasis}</span>
          </>
        )}
      </h2>
      {description && (
        <p
          className={cx(
            'mt-6 max-w-xl text-base leading-7',
            light ? 'text-paper/75' : 'text-muted',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
export function ClosingCTA() {
  return (
    <section className="bg-linen py-16">
      <div className="shell flex flex-col justify-between gap-8 md:flex-row md:items-center">
        <div>
          <h2 className="section-title">Support LOOP</h2>
          <p className="mt-4 text-muted">Volunteer, partner with us, or make a donation.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/volunteer" variant="outline">
            Volunteer
          </ButtonLink>
          <ButtonLink href="/donate">Donate with PayPal</ButtonLink>
        </div>
      </div>
    </section>
  );
}
