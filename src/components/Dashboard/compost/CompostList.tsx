import { useState } from 'react';
import { CompostBin } from '../../../mocks/mockdata';
import { CompostBinCard } from './CompostBinCard';
import CompostBinFormModal from './CompostBinFormModal';

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
          onClick={handleOpenModal}
          className='bg-[#244225] text-white text-sm px-4 py-2 rounded hover:bg-[#356a3c] transition'
        >
          + Add Bin
        </button>
      </div>
      <CompostBinFormModal
        isOpen={isCompostBinFormModalOpen}
        onClose={() => setIsCompostBinFormModalOpen(false)}
        onSaveCompostBin={onAddCompostBin}
      />

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
    </>
  );
};

export default CompostList;
