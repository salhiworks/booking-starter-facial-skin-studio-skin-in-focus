/** The page's sections, in order — the header, the phone menu and the footer all list these. */
export const NAV: readonly { href: string; label: string; header?: false }[] = [
  { href: '#treatments', label: 'Facials' },
  { href: '#skin', label: 'Skin in detail', header: false },
  { href: '#studio', label: 'The studio' },
  { href: '#your-visit', label: 'Your visit' },
  { href: '#approach', label: 'Approach', header: false },
  { href: '#questions', label: 'Questions', header: false },
  { href: '#visit', label: 'Visit' },
];
