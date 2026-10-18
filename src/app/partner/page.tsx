import type { Metadata } from 'next';
import { FormPage } from '@/components/form-page';
export const metadata: Metadata = {
  title: 'Partner with LOOP',
  alternates: { canonical: '/partner' },
};
export default function Partner() {
  return (
    <FormPage
      kind="partner"
      eyebrow="Partner with LOOP"
      title="Partner With LOOP"
      emphasis=""
      description="Businesses, organizations, and community partners can support LOOP programs through sponsorships, resources, volunteer involvement, and collaborative opportunities."
      asideTitle="Good partnerships start with a conversation."
      asideBody="Tell us about your organization and the kind of collaboration you have in mind employment connections, housing resources, youth learning, community events, sponsorship, or another idea."
    />
  );
}
