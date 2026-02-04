import { useState } from 'react';
import BedDetails from './BedDetails';
import { BedFormModal } from './BedFormModal';
import toast from 'react-hot-toast';
import { useBedContext } from '../../../../context/BedContext';
import { usePlantingHistoryContext } from '../../../../context/PlantingHistoryContext';
import { BedList } from './BedList';
import { Bed, ViewKey } from '../../../../types/types';

interface BedSectionProps {
  selectedBedId: string | null;
  onSelectBed: (bedId: string | null) => void;
  onNavigate: (view: ViewKey) => void;
  onOpenMenu: () => void;
}

const BedSection: React.FC<BedSectionProps> = ({
  onNavigate,
  selectedBedId,
  onSelectBed,
  onOpenMenu,
}) => {
  const { beds, addBed, updateBed, deleteBed } = useBedContext();
  const [bedToEdit, setBedToEdit] = useState<Bed | null>(null);
  const { updateBedNameInHistory } = usePlantingHistoryContext();

  const isEditBedModalOpen = bedToEdit !== null;
  const selectedBed = beds.find((bed) => bed.id === selectedBedId) || null;

  const handleDeleteBed = (bedId: string) => {
    deleteBed(bedId);
    toast.success('Bed deleted successfully');
  };

  const handleSaveBed = (name: string, size: string, notes: string) => {
    if (bedToEdit) {
      const updated = { ...bedToEdit, name, size, notes };
      updateBed(updated);
      updateBedNameInHistory(updated.id, updated.name);
      setBedToEdit(null);
    } else {
      addBed(name, size, notes);
    }
  };

  return selectedBedId && selectedBed ? (
    <BedDetails
      bed={selectedBed}
      onDeselectBed={() => onSelectBed(null)}
      onNavigate={onNavigate}
      onOpenMenu={onOpenMenu}
    />
  ) : (
    <>
      <BedList
        beds={beds}
        onView={onSelectBed}
        onAddBed={addBed}
        onAddCrop={updateBed}
        onEditBed={(bed) => setBedToEdit(bed)}
        onDeleteBed={handleDeleteBed}
        onNavigate={onNavigate}
        onOpenMenu={onOpenMenu}
      />
      <BedFormModal
        isOpen={isEditBedModalOpen}
        onClose={() => setBedToEdit(null)}
        onSaveBed={handleSaveBed}
        bedToEdit={bedToEdit}
      />
    </>
  );
};

export default BedSection;
