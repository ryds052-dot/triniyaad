const rangeLabel = (items) => {
  const prices = items.map((i) => i.price).filter((n) => typeof n === 'number');
  if (!prices.length) return '';
  const lo = Math.min(...prices);
  const hi = Math.max(...prices);
  const fmt = (n) => `$${n.toLocaleString('en-US')}`;
  return lo === hi ? `${fmt(lo)} JMD` : `${fmt(lo)}–${fmt(hi)} JMD`;
};

const group = (id, label, description, items) => ({
  id,
  label,
  description,
  items,
  eyebrow: rangeLabel(items),
});

/* Menu mirrors the painted board outside the Dubwise courtyard. Nothing else. */
export const menuGroups = [
  group(
    'doubles',
    'Doubles',
    'Chickpeas, served with tamarind chutney and cucumbers over two fried flatbreads.',
    [
      { id: 'dbl-vegan', name: 'Doubles', price: 500, tags: ['vegan'], description: 'Chickpeas, tamarind chutney and cucumbers over two fried flatbreads.', options: true },
      { id: 'dbl-goat', name: 'Doubles — w/ Curry Goat', price: 1500, tags: [], description: 'Curried goat over two fried flatbreads.', options: true },
      { id: 'dbl-chicken', name: 'Doubles — w/ Curry Chicken', price: 1000, tags: [], description: 'Curried or stew chicken.', options: true },
      { id: 'dbl-jerk', name: 'Jerk Chicken Doubles', price: 1200, tags: [], description: 'Jerk chicken over two fried flatbreads with pineapple chutney.', options: true },
    ]
  ),
  group(
    'buss-up-shut',
    'Buss Up Shut',
    'Silky roti with mixed vegetables, pumpkin talkari, curried chickpeas and house chutney.',
    [
      { id: 'bus-vegan', name: 'Buss Up Shut — Veggie', price: 1500, tags: ['vegan'], description: 'Silky roti with mixed vegetables, pumpkin talkari, curried chickpeas and house chutney.', options: true },
      { id: 'bus-chicken', name: 'Buss Up Shut — w/ Chicken', price: 2000, tags: [], description: 'Curried or stew chicken.', options: true },
      { id: 'bus-goat', name: 'Buss Up Shut — w/ Curry Goat', price: 2500, tags: [], description: 'With curried goat.', options: true },
    ]
  ),
  group(
    'bake',
    'Bake',
    'Fluffy bake, fresh salad and our signature house sauces.',
    [
      { id: 'bake-shark', name: "Bake & 'Shark'", price: 1200, tags: ['fish'], description: 'Golden fried shark, fluffy bake, fresh salad and signature house sauces.', options: true },
      { id: 'bake-shrimp', name: 'Bake & Shrimp', price: 1500, tags: ['shellfish'], description: 'Golden fried shrimp, fluffy bake, fresh salad and signature house sauces.', options: true },
    ]
  ),
  group(
    'sides',
    'Sides',
    'Small plates and soup.',
    [
      { id: 'corn-soup', name: 'Corn Soup', price: 500, tags: ['vegan'], description: 'Hearty soup filled with corn and vegetables.' },
      { id: 'aloo-pies', name: 'Aloo Pie', price: 500, tags: ['vegan'], description: 'Curried chickpeas with seasoned mash potatoes and tamarind chutney.' },
      { id: 'saheena', name: 'Saheena Callaloo Fritter', price: 500, tags: ['vegan'], description: 'Callaloo fritter, fried and served with tamarind chutney.' },
    ]
  ),
];

export const peppers = ['No Pepper', 'Slight Pepper', 'Medium Pepper', 'Heavy Pepper'];
export const sauces = ['Shado Beni', 'Tamarind', 'White Garlic'];

export const dishById = Object.fromEntries(
  menuGroups.flatMap((g) => g.items.map((item) => [item.id, { ...item, group: g.id }]))
);

export const money = (value) => `$${value.toLocaleString('en-US')}`;