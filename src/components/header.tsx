'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Logo } from './logo';
import { navigation } from '@/content/navigation';
export function Header({ announcement }: { announcement?: string }) {
  const pathname = usePathname(),
    dialog = useRef<HTMLDialogElement>(null),
    trigger = useRef<HTMLButtonElement>(null),
    header = useRef<HTMLElement>(null);
  function close() {
    dialog.current?.close();
    document.body.style.overflow = '';
    trigger.current?.focus();
  }
  useEffect(() => {
    function dismiss(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node))
        header.current?.querySelectorAll('details[open]').forEach((d) => d.removeAttribute('open'));
    }
    document.addEventListener('pointerdown', dismiss);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.body.style.overflow = '';
    };
  }, []);
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="utility-bar">
        <div className="shell flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
          <Link href="/community-initiatives/coat-drive">
            Give warmth. Share hope.{' '}
            <span className="underline underline-offset-4">Join our coat drive ↗</span>
          </Link>
          <div className="flex gap-6">
            <Link href="/volunteer">Volunteer</Link>
            <Link href="/partner">Partner with LOOP</Link>
            <Link href="/contact">Connect</Link>
          </div>
        </div>
      </div>
      {announcement && <p className="bg-linen px-6 py-2 text-center text-xs">{announcement}</p>}
      <header ref={header} className="site-header">
        <div className="shell flex min-h-[98px] items-center justify-between gap-5">
          <Link href="/" aria-label="LOOP home">
            <Logo />
          </Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-6 xl:flex">
            {navigation.map((item) =>
              item.children ? (
                <details
                  key={item.href}
                  className="nav-dropdown"
                  onToggle={(e) => {
                    if (e.currentTarget.open)
                      header.current?.querySelectorAll('details[open]').forEach((d) => {
                        if (d !== e.currentTarget) d.removeAttribute('open');
                      });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      e.currentTarget.removeAttribute('open');
                      e.currentTarget.querySelector('summary')?.focus();
                    }
                  }}
                >
                  <summary className="nav-link">
                    {item.label}
                    <ChevronDown size={13} aria-hidden />
                  </summary>
                  <div className="nav-panel">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={(e) => e.currentTarget.closest('details')?.removeAttribute('open')}
                        aria-current={pathname === child.href ? 'page' : undefined}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className="nav-link"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/donate" className="brand-button compact donate-nav">
              Donate
            </Link>
            <button
              ref={trigger}
              className="flex size-11 items-center justify-center xl:hidden"
              aria-label="Open navigation"
              aria-haspopup="dialog"
              onClick={() => {
                dialog.current?.showModal();
                document.body.style.overflow = 'hidden';
              }}
            >
              <Menu aria-hidden />
            </button>
          </div>
        </div>
      </header>
      <dialog
        ref={dialog}
        className="mobile-nav"
        aria-label="Navigation"
        onClose={() => {
          document.body.style.overflow = '';
        }}
        onCancel={() => {
          document.body.style.overflow = '';
        }}
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button className="size-12" aria-label="Close navigation" onClick={close}>
            <X aria-hidden />
          </button>
        </div>
        <nav aria-label="Mobile navigation" className="mt-8">
          {navigation.map((item) => (
            <div key={item.href} className="border-b border-line py-4">
              {item.children ? (
                <details>
                  <summary className="flex min-h-11 items-center justify-between text-xl font-bold">
                    {item.label}
                    <ChevronDown size={18} />
                  </summary>
                  <div className="grid pl-4">
                    {item.children.map((child) => (
                      <Link
                        href={child.href}
                        key={child.href}
                        onClick={close}
                        className="py-3 text-sm"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  href={item.href}
                  onClick={close}
                  className="flex min-h-11 items-center text-xl font-bold"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/donate" onClick={close} className="brand-button donate-nav">
            Donate
          </Link>
          <Link href="/get-help" onClick={close} className="brand-button">
            Get support
          </Link>
          <Link href="/volunteer" onClick={close} className="brand-button secondary">
            Volunteer
          </Link>
          <Link href="/partner" onClick={close} className="brand-button secondary">
            Partner
          </Link>
        </div>
      </dialog>
    </>
  );
}
