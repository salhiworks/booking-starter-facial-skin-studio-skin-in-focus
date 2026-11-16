/**
 * This website's identity — the ONE place for its name, time zone and the
 * placeholder contact details shown in preview mode (`npm run dev` without
 * Supabase). Everything the owner manages (treatments, prices, hours, real
 * contact details, text and photos) lives in the dashboard at /admin/.
 */
export const SITE = {
  /** The business name. The dashboard's Business page overrides it once connected. */
  name: 'Morrow Skin Studio',
  /** IANA time zone of the business. */
  timezone: 'America/Los_Angeles',
  /** Fictional contact details for preview mode only. */
  previewContact: {
    email: 'hello@morrowskin.example',
    phone: '+1 510-555-0163',
    address: '5421 College Ave, Suite 2, Oakland, CA 94618',
  },
};
