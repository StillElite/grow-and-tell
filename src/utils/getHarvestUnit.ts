import { HarvestCategory, HarvestUnit } from '../mocks/mockdata';

export const getHarvestUnit = (category: HarvestCategory): HarvestUnit => {
  switch (category) {
    case 'Leafy greens':
    case 'Herbs':
      return 'bunches';
    case 'Fruiting veggies':
    case 'Roots':
      return 'lbs';
    default:
      return 'count';
  }
};
