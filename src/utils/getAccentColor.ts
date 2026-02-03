import { ViewKey } from '../types/types';

export interface AccentClasses {
  bgAccent: string;
  checkedBgAccent: string;
  altCheckedBgAccent;
  textAccent: string;
  borderAccent: string;
}

export const getAccentColor = (viewKey?: ViewKey): AccentClasses => {
  switch (viewKey) {
    case 'Beds':
      return {
        bgAccent: 'bg-orange-500',
        checkedBgAccent: 'checked:bg-orange-500',
        altCheckedBgAccent: 'checked:bg-orange-700',
        textAccent: 'text-orange-500',
        borderAccent: 'border-orange-500',
      };
    case 'Plant Log':
      return {
        bgAccent: 'bg-[#79B040]',
        checkedBgAccent: 'checked:bg-[#79B040]',
        altCheckedBgAccent: 'checked:bg-[#5C8233]',
        textAccent: 'text-[#79B040]',
        borderAccent: 'border-[#79B040]',
      };
    case 'Compost':
      return {
        bgAccent: 'bg-[#5b7c5c]',
        checkedBgAccent: 'checked:bg-[#5b7c5c]',
        altCheckedBgAccent: 'checked:bg-[#465e47]',
        textAccent: 'text-[#5b7c5c]',
        borderAccent: 'border-[#5b7c5c]',
      };
    case 'Tasks':
      return {
        bgAccent: 'bg-[#d1a052]',
        checkedBgAccent: 'checked:bg-[#d1a052]',
        altCheckedBgAccent: 'checked:bg-[#a37c3f]',
        textAccent: 'text-[#6F8368]',
        borderAccent: 'border-[#d1a052]',
      };
    case 'Harvest':
    case 'Soil Record':
      return {
        bgAccent: 'bg-[#1E6635]',
        checkedBgAccent: 'checked:bg-[#1e9544]',
        altCheckedBgAccent: '',
        textAccent: 'text-[#1E6635]',
        borderAccent: 'border-[#1E6635]',
      };
    default:
      return {
        bgAccent: 'bg-gray-300',
        checkedBgAccent: 'checked:bg-gray-300',
        altCheckedBgAccent: 'checked:bg-gray-500',
        textAccent: 'text-gray-300',
        borderAccent: 'border-gray-300',
      };
  }
};
