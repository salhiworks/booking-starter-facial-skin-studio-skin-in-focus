import type { DemoConfig } from './engine';
import { sitePreset } from '../lib/preset';

/**
 * The public Live Demo's sample studio (`npm run dev:demo` / `npm run build:demo`).
 * Only demo builds read this file. Customizing the real website? Leave src/demo/ alone.
 */
export const demoConfig: DemoConfig = {
  id: 'facial-skin-studio-skin-in-focus',
  preset: sitePreset,
  business: {
    name: 'Morrow Skin Studio',
    timezone: 'America/Los_Angeles',
    email: 'hello@morrowskin.example',
    phone: '+1 510-555-0163',
    address: '5421 College Ave, Suite 2, Oakland, CA 94618',
  },
  ownerEmail: 'owner@morrowskin.example',
  referencePrefix: 'MS',
  sampleNotes: [
    'First facial in a long time — happy to be told which one suits me.',
    'My skin feels very dry since the weather turned. Could we keep it gentle?',
    'Booking the massage as a birthday treat for myself. No preference on oil.',
  ],
  // The site caches published content under this key (createSiteContentStore's default).
  resetKeys: ['pbe-site-content'],
  customers: [
    { name: 'Alana Brooks', email: 'alana.brooks@example.com', phone: '+1 510 555 0112' },
    { name: 'Mei Lin Tan', email: 'meilin.tan@example.com', phone: '+1 510 555 0126' },
    { name: 'Rosa Delgado', email: 'rosa.delgado@example.com', phone: '+1 510 555 0133' },
    { name: 'Claire Okafor', email: 'claire.okafor@example.com', phone: '+1 510 555 0148' },
    { name: 'Hana Sato', email: 'hana.sato@example.com', phone: '+1 510 555 0150' },
    { name: 'Megan Doyle', email: 'megan.doyle@example.com', phone: '+1 510 555 0161' },
    { name: 'Tessa Moreno', email: 'tessa.moreno@example.com', phone: '+1 510 555 0174' },
    { name: 'Imani Wright', email: 'imani.wright@example.com', phone: '+1 510 555 0187' },
    { name: 'Julia Novak', email: 'julia.novak@example.com', phone: '+1 510 555 0195' },
    { name: 'Sam Patel', email: 'sam.patel@example.com', phone: '+1 510 555 0109' },
  ],
};
