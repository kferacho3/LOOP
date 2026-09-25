import type { Metadata } from 'next';
import { FormPage } from '@/components/form-page';
export const metadata:Metadata={title:'Partner with LOOP',alternates:{canonical:'/partner'}};
export default function Partner(){return <FormPage kind="partner" eyebrow="Partner with LOOP" title="Shared purpose." emphasis="Greater possibility." description="Businesses, nonprofits, employers, schools, community organizations, sponsors, and housing partners all have something to bring. Let’s explore how your work and ours can meet." asideTitle="Good partnerships start with a conversation." asideBody="Tell us about your organization and the kind of collaboration you have in mind — employment connections, housing resources, youth learning, community events, sponsorship, or another idea."/>;}
