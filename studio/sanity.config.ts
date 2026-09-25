import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';
const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
if (!projectId) throw new Error('Set SANITY_STUDIO_PROJECT_ID in studio/.env before starting the content studio.');
export default defineConfig({
  name:'loop', title:'LOOP — Community content', projectId,
  dataset:process.env.SANITY_STUDIO_DATASET || 'production',
  plugins:[structureTool({structure:S=>S.list().title('LOOP content').items([
    S.listItem().title('Website settings').id('settings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    S.divider(), ...S.documentTypeListItems().filter(item=>item.getId()!=='siteSettings')
  ])})], schema:{types:schemaTypes}
});
