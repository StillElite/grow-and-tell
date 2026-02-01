import { PlantingCard } from './PlantingCard';

export interface PlantingListProps {
  plantingHistory;
}

export const PlantingList: React.FC<PlantingListProps> = ({
  plantingHistory,
}) => {
  return (
    <section aria-label='Planting history'>
      {plantingHistory.length === 0 ? (
        <div className='text-center py-12 text-gray-500'>
          <p className='text-lg mb-2'>No Planting History Yet</p>
          <p className='text-sm'>
            Plantings will appear here as you add crops to your beds.
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
          {plantingHistory.map((planting) => (
            <PlantingCard
              key={planting.id}
              id={planting.id}
              cropId={planting.cropId}
              cropName={planting.cropName}
              bedName={planting.bedName}
              datePlanted={planting.datePlanted}
              notes={planting.notes}
            />
          ))}
        </div>
      )}
    </section>
  );
};
