import { useState } from 'react';
import BedDetails from './BedDetails';
import BedList from './BedList';
import { Bed, Crop, ViewKey } from '../../../mocks/mockdata';
import { useBedContext } from '../../../context/BedContext';
import BedFormModal from './BedFormModal';
import CropFormModal from './CropFormModal';
import toast from 'react-hot-toast';

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
  const [cropToEdit, setCropToEdit] = useState<Crop | null>(null);
  const isEditCropModalOpen = cropToEdit !== null;
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
      setBedToEdit(null);
    } else {
      addBed(name, size, notes);
    }
  };

  const handleSaveCrop = (newCropData: {
    name: string;
    datePlanted: string;
    notes: string;
    id?: string;
  }) => {
    if (!selectedBed) return;

    // Clear cropToEdit first to ensure modal closes
    setCropToEdit(null);

    // Then handle the update
    const crops = selectedBed.crops || [];
    let updatedCrops;

    if (newCropData.id) {
      // Editing existing crop
      updatedCrops = crops.map((crop) =>
        crop.id === newCropData.id ? { ...crop, ...newCropData } : crop
      );
    } else {
      // Adding new crop
      const newCrop = {
        id: crypto.randomUUID(),
        name: newCropData.name,
        datePlanted: newCropData.datePlanted,
        notes: newCropData.notes,
      };
      updatedCrops = [...crops, newCrop];
    }

    const updatedBed = { ...selectedBed, crops: updatedCrops };
    updateBed(updatedBed);
  };

  return selectedBedId && selectedBed ? (
    <>
      <BedDetails
        bed={selectedBed}
        onDeselectBed={() => onSelectBed(null)}
        onNavigate={onNavigate}
        onOpenMenu={onOpenMenu}
      />

      <CropFormModal
        isOpen={isEditCropModalOpen}
        onClose={() => setCropToEdit(null)}
        onSaveCrop={handleSaveCrop}
        cropToEdit={cropToEdit}
      />
    </>
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
