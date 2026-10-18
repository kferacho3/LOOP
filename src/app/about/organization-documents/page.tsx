import type { Metadata } from 'next';
import documents from '@/content/organization-documents.json';
export const metadata: Metadata = {
  title: 'Organization Documents',
  description: 'LOOP mission, About, program information, and complete website brief.',
  alternates: { canonical: '/about/organization-documents' },
  robots: { index: false, follow: true },
};
export default function OrganizationDocuments() {
  return (
    <>
      <section className="shell page-editorial-intro">
        <p className="eyebrow">About LOOP</p>
        <h1>Organization documents</h1>
        <p className="intro-deck">Mission, programs, and the complete LOOP website brief.</p>
      </section>
      <section className="shell source-documents pb-20">
        {documents.map((d) => (
          <details key={d.slug}>
            <summary>{d.title}</summary>
            <a
              href={`/documents/loop-${d.slug}.pdf`}
              className="inline-block mt-6 underline"
              download
            >
              Download PDF
            </a>
            <pre>{d.text}</pre>
          </details>
        ))}
      </section>
    </>
  );
}
