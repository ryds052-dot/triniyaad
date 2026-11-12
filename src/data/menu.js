export const menuGroups = [
  {
    id: 'doubles',
    label: 'Doubles',
    eyebrow: '$500–$1,500 JMD',
    description: 'Chickpeas, served with tamarind chutney and cucumbers over two fried flatbreads.',
    items: [
      { id: 'dbl-vegan', name: 'Doubles — Vegan', price: 500, tags: ['vegan'], description: 'Chickpeas, tamarind chutney and cucumbers over two fried flatbreads.', options: true },
      { id: 'dbl-chicken', name: 'Doubles — w/ Chicken', price: 1000, tags: [], description: 'Curried or stew chicken.', options: true },
      { id: 'dbl-goat', name: 'Doubles — w/ Curried Goat', price: 1500, tags: [], description: 'Curried goat over two fried flatbreads.', options: true },
      { id: 'dbl-jerk', name: 'Jerk Chicken Doubles', price: 1200, tags: [], description: 'Jerk chicken over two fried flatbreads with pineapple chutney.', options: true },
    ],
  },
  {
    id: 'buss-up-shut',
    label: 'Buss Up Shut',
    eyebrow: '$1,500–$2,500 JMD',
    description: 'Silky roti with mixed vegetables, pumpkin talkari, curried chickpeas and house chutney.',
    items: [
      { id: 'bus-vegan', name: 'Buss Up Shut — Vegan Mix', price: 1500, tags: ['vegan'], description: 'Silky roti with mixed vegetables, pumpkin talkari, curried chickpeas and house chutney.', options: true },
      { id: 'bus-chicken', name: 'Buss Up Shut — w/ Chicken', price: 2000, tags: [], description: 'Curried or stew chicken.', options: true },
      { id: 'bus-goat', name: 'Buss Up Shut — w/ Curried Goat', price: 2500, tags: [], description: 'With curried goat.', options: true },
      { id: 'bus-oxtail', name: 'Buss Up Shut — w/ Oxtail', price: 2500, tags: [], description: 'With oxtail.', options: true },
    ],
  },
  {
    id: 'slaw-dem-fry-dem',
    label: 'Slaw Dem Fry Dem',
    eyebrow: '$1,500–$2,500 JMD',
    description: 'Golden crispy fries and cool creamy coleslaw with your choice of protein.',
    items: [
      { id: 'slaw-bbq', name: 'Slaw Dem Fry Dem — w/ BBQ Chicken', price: 1500, tags: [], description: 'Golden crispy fries and cool creamy coleslaw with BBQ chicken.', options: true },
      { id: 'slaw-fish', name: 'Slaw Dem Fry Dem — w/ Fried Fish', price: 2500, tags: ['fish'], description: 'Golden crispy fries and cool creamy coleslaw with fried fish.', options: true },
    ],
  },
  {
    id: 'fried-bake',
    label: 'Fried Bake',
    eyebrow: '$800–$1,500 JMD',
    description: 'Fluffy bake, fresh salad and our signature house sauces.',
    items: [
      { id: 'bake-shark', name: 'Bake and Shark', price: 1200, tags: ['fish'], description: 'Golden fried shark, fluffy bake, fresh salad and signature house sauces.', options: true },
      { id: 'bake-shrimp', name: 'Bake and Shrimp', price: 1500, tags: ['shellfish'], description: 'Golden fried shrimp, fluffy bake, fresh salad and signature house sauces.', options: true },
      { id: 'bake-chicken', name: 'Bake and Chicken', price: 1000, tags: [], description: 'Curried or stewed chicken, fluffy bake, fresh salad and signature house sauces.', options: true },
      { id: 'bake-veg', name: 'Bake and Veg', price: 800, tags: ['vegan'], description: 'Curried chickpeas, fluffy bake, fresh salad and signature house sauces.', options: true },
    ],
  },
  {
    id: 'others',
    label: 'Others',
    eyebrow: '$500 JMD',
    description: 'Sides and small plates.',
    items: [
      { id: 'aloo-pies', name: 'Aloo Pies', price: 500, tags: ['vegan'], description: 'Curried chickpeas with seasoned mash potatoes and tamarind chutney.' },
      { id: 'saheena', name: 'Saheena', price: 500, tags: ['vegan'], description: 'Callaloo fritter, fried and served with tamarind chutney.' },
      { id: 'corn-soup', name: 'Corn Soup', price: 500, tags: ['vegan'], description: 'Hearty soup filled with corn and vegetables.' },
      { id: 'fries', name: 'Fries', price: 500, tags: ['vegan'], description: 'Freshly fried, lightly salted.' },
    ],
  },
];

export const peppers = ['No Pepper', 'Slight Pepper', 'Medium Pepper', 'Heavy Pepper'];
export const sauces = ['Shado Beni', 'Tamarind', 'White Garlic'];

export const dishById = Object.fromEntries(
  menuGroups.flatMap((group) => group.items.map((item) => [item.id, { ...item, group: group.id }]))
);

export const money = (value) => `$${value.toLocaleString('en-US')}`;