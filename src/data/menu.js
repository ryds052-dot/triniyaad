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
      { id: 'dbl-vegan', name: 'Doubles', price: 500, tags: ['vegan'], description: 'Chickpeas, chutney, cucumber.', options: true },
      { id: 'dbl-goat', name: 'Curry Goat', price: 1500, tags: [], description: 'Curried goat.', options: true },
      { id: 'dbl-chicken', name: 'Curry Chicken', price: 1000, tags: [], description: 'Curry or stew chicken.', options: true },
      { id: 'dbl-jerk', name: 'Jerk Chicken', price: 1200, tags: [], description: 'Jerk chicken, pineapple chutney.', options: true },
    ]
  ),
  group(
    'buss-up-shut',
    'Buss Up Shut',
    'Silky roti with mixed vegetables, pumpkin talkari, curried chickpeas and house chutney.',
    [
      { id: 'bus-vegan', name: 'Veggie', price: 1500, tags: ['vegan'], description: 'Vegetables, pumpkin talkari, chickpeas.', options: true },
      { id: 'bus-chicken', name: 'Chicken', price: 2000, tags: [], description: 'Curry or stew chicken, silky roti.', options: true },
      { id: 'bus-goat', name: 'Goat', price: 2500, tags: [], description: 'Curried goat, silky roti.', options: true },
    ]
  ),
  group(
    'bake',
    'Bake',
    'Fluffy bake, fresh salad and our signature house sauces.',
    [
      { id: 'bake-shark', name: "Bake & 'Shark'", price: 1200, tags: ['fish'], description: 'Fried shark, bake, salad, house sauce.', options: true },
      { id: 'bake-shrimp', name: 'Bake & Shrimp', price: 1500, tags: ['shellfish'], description: 'Fried shrimp, bake, salad, house sauce.', options: true },
    ]
  ),
  group(
  'Snacks & Soup',
  'Snacks & Soup',
    'Small plates and soup.',
    [
      { id: 'corn-soup', name: 'Corn Soup', price: 500, tags: ['vegan'], description: 'Corn and vegetables.', options: true },
      { id: 'aloo-pies', name: 'Aloo Pie', price: 500, tags: ['vegan'], description: 'Chickpeas, potato, tamarind.', options: true },
      { id: 'saheena', name: 'Saheena', price: 500, tags: ['vegan'], description: 'Callaloo fritter, tamarind.', options: true },
    ]
  ),
];

export const peppers = ['No Pepper', 'Slight Pepper', 'Medium Pepper', 'Heavy Pepper'];
export const sauces = ['Shado Beni', 'Tamarind', 'White Garlic'];

export const dishById = Object.fromEntries(
  menuGroups.flatMap((g) => g.items.map((item) => [item.id, { ...item, group: g.id }]))
);

export const money = (value) => `$${value.toLocaleString('en-US')}`;
