import { Feature } from '../types/types';
import { BASE_PATH } from './basePath';

export const features: Feature[] = [
  {
    title: 'Beds',
    description:
      "Create and organize your garden beds, and track exactly what's planted in each one. Build a clear structure so you always know what's growing where.",
    image: `${BASE_PATH}/images/bed-icon2.png`,
    alt: 'Garden bed fence icon',
  },
  {
    title: 'Compost',
    description:
      'Keep track of your composting efforts — log layers, turning, and moisture updates. Build healthier soil by managing your bins the smart way.',
    image: `${BASE_PATH}/images/compost-icon2.png`,
    alt: 'Wheelbarrow icon for composting',
  },
  {
    title: 'Plant Log ',
    description:
      "Log and track your plants as they grow. Keep a detailed history of each plant's development, from seedling to harvest.",
    image: `${BASE_PATH}/images/seed-icon2.png`,
    alt: 'Seed icon for seed inventory',
  },
  {
    title: 'Seasonal Tasks',
    description:
      'Plan ahead with simple seasonal checklists and timely reminders. Know the best moments to plant, harvest, and prepare your beds year-round.',
    image: `${BASE_PATH}/images/clock-icon2.png`,
    alt: 'Clock icon for seasonal tasks',
  },
];
