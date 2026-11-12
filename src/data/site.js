export const site = {
  name: 'Trini-Yaad',
  venue: 'Dubwise Cafe',
  tagline: 'Street food with island soul',
  street: '82 Lady Musgrave Road',
  area: 'Kingston 6',
  country: 'Jamaica',
  countryCode: 'JM',
  lat: 18.00862,
  lng: -76.75971,
  phone: '+18763520139',
  phoneDisplay: '876-352-0139',
  whatsapp: '18763520139',
  instagram: 'triniyaad',
  tz: 'America/Jamaica',
  currency: 'JMD',
  mapsQuery: '82+Lady+Musgrave+Road+Kingston+6+Jamaica',
  delivery: {
    enabled: true,
    areas: ['Kingston 6', 'Kingston 8', 'Kingston 10', 'New Kingston', 'Liguanea', 'Barbican'],
    minimum: 2500,
    note: 'Delivery fee quoted on WhatsApp. Free within 3km on orders over $5,000.',
  },
  pickup: {
    enabled: true,
    leadMinutes: 20,
    slotMinutes: 15,
    lastOrderBeforeClose: 30,
  },
};

// 0 = Sunday. 630 = 10:30, 1320 = 22:00
export const hours = [
  { day: 2, open: 630, close: 1320 },
  { day: 3, open: 630, close: 1320 },
  { day: 4, open: 630, close: 1320 },
  { day: 5, open: 630, close: 1320 },
  { day: 6, open: 630, close: 1320 },
  { day: 0, open: 720, close: 1200 },
];

export const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const navLinks = [
  { id: 'menu', label: 'Menu' },
  { id: 'courtyard', label: 'The Courtyard' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'visit', label: 'Visit Us' },
];

export const wa = (text) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;