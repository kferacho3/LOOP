import type { Metadata } from 'next';
import { FormPage } from '@/components/form-page';
import { supportTypes } from '@/lib/validation';
export const metadata:Metadata={title:'Get help / request support',robots:{index:false,follow:true}};
export default async function GetHelp({searchParams}:{searchParams:Promise<{need?:string}>}){const {need}=await searchParams;const selection=need&&supportTypes.includes(need as typeof supportTypes[number])?need:'';return <FormPage kind="support" eyebrow="Get help / request support" title="You can start here." emphasis="Just as you are." description="You don’t need to have all the answers. Tell us the kind of support you’re looking for and a safe way to reach you. No account is needed." initialSelection={selection} asideTitle="You are more than the barrier in front of you." asideBody="Start with what matters most today. A broad description is enough; you do not need to share your personal history or sensitive documents."/>;}
