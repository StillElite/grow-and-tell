import { useState } from 'react';
import { CompostBinCard } from './CompostBinCard';
import { CompostBinFormModal } from './CompostBinFormModal';
import { CompostBin } from '../../../../types/types';

interface CompostListProps {
  compostBins: CompostBin[];
  onAddCompostBin: (name: string, type: string, notes: string) => void;
  onDeleteBin: (compostBinId: string) => void;
  onEditCompostBin: (compostBin: CompostBin) => void;
}

const CompostList: React.FC<CompostListProps> = ({
  compostBins,
  onAddCompostBin,
  onDeleteBin,
  onEditCompostBin,
}) => {
  const [isCompostBinFormModalOpen, setIsCompostBinFormModalOpen] =
    useState(false);

  const handleOpenModal = () => setIsCompostBinFormModalOpen(true);

  return (
    <>
      <div className='flex justify-end mb-4'>
        <button
          type='button'
          onClick={handleOpenModal}
          className='bg-[#244225] text-white text-sm px-4 py-2 rounded hover:bg-[#356a3c] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#244225]'
        >
          + Add Bin
        </button>
      </div>
      <CompostBinFormModal
        isOpen={isCompostBinFormModalOpen}
        onClose={() => setIsCompostBinFormModalOpen(false)}
        onSaveCompostBin={onAddCompostBin}
      />

      <section aria-label='Soil records'>
        {compostBins.length === 0 ? (
          <div className='text-center py-12 text-gray-500'>
            <p className='text-lg mb-2'>No Compost Bins yet</p>
            <p className='text-sm'>
              Click "Add Bin" to create your first compost bin.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
            {compostBins.map((compostBin) => (
              <CompostBinCard
                key={compostBin.id}
                compostBin={compostBin}
                onDeleteBin={onDeleteBin}
                onEditCompostBin={onEditCompostBin}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default CompostList;
