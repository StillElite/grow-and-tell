import { PlantingCard } from './PlantingCard';

export interface PlantingListProps {
  plantingHistory;
}

export const PlantingList: React.FC<PlantingListProps> = ({
  plantingHistory,
}) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
      {plantingHistory.map((planting) => (
        <PlantingCard
          key={planting.id}
          id={planting.id}
          name={planting.name}
          bedName={planting.bedName}
          datePlanted={planting.datePlanted}
          notes={planting.notes}
        />
      ))}
    </div>
  );
};
