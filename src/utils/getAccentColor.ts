export const getAccentColor = (viewKey?: string) => {
  switch (viewKey) {
    case 'Beds':
      return {
        bgAccent: 'bg-orange-500',
        textAccent: 'text-orange-500',
        borderAccent: 'border-orange-500',
      };
    case 'Plant Log':
      return {
        bgAccent: 'bg-[#79B040]',
        textAccent: 'text-[#79B040]',
        borderAccent: 'border-[#79B040]',
      };
    case 'Compost':
      return {
        bgAccent: 'bg-[#5b7c5c]',
        textAccent: 'text-[#5b7c5c]',
        borderAccent: 'border-[#5b7c5c]',
      };
    case 'Tasks':
      return {
        bgAccent: 'bg-[#d1a052]',
        textAccent: 'text-[#d1a052]',
        borderAccent: 'border-[#d1a052]',
      };
    default:
      return {
        bgAccent: 'bg-gray-300',
        textAccent: 'text-gray-300',
        borderAccent: 'border-gray-300',
      };
  }
};
