import { Bed, Crop, ViewKey } from '../../../../types/types';
import { CropCard } from './CropCard';
import { useState } from 'react';
import { CropFormModal } from './CropFormModal';
import { useBedContext } from '../../../../context/BedContext';
import SectionHeader from '../../../shared/SectionHeader';
import { BreadcrumbItem } from '../../../shared/Breadcrumb';
import PageHeader from '../../../shared/PageHeader';
import toast from 'react-hot-toast';
import { usePlantingHistoryContext } from '../../../../context/PlantingHistoryContext';
import { BASE_PATH } from '../../../../constants/basePath';

export interface BedDetailsProps {
  bed: Bed;
  onDeselectBed: () => void;
  onNavigate: (view: ViewKey) => void;
  onOpenMenu: () => void;
}

const BedDetails: React.FC<BedDetailsProps> = ({
  bed,
  onDeselectBed,
  onNavigate,
  onOpenMenu,
}) => {
  const [isCropFormModalOpen, setIsCropFormModalOpen] = useState(false);
  const [cropToEdit, setCropToEdit] = useState<Crop | null>(null);
  const { addCrop, updateCrop, deleteCrop } = useBedContext();
  const { addPlantingToHistory, updateCropNameInHistory } =
    usePlantingHistoryContext();

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: 'Dashboard',
      onClick: () => {
        onDeselectBed();
        onNavigate(ViewKey.Dashboard);
      },
    },
    { label: 'Beds', onClick: onDeselectBed },
    { label: bed.name },
  ];

  const handleOpenModal = () => {
    setIsCropFormModalOpen(true);
  };

  const handleAddOrUpdateCrop = (newCropData: {
    name: string;
    datePlanted: string;
    notes: string;
    id?: string;
  }) => {
    const isEdit = !!newCropData.id;

    if (isEdit) {
      updateCrop(bed.id, newCropData as Crop);
      updateCropNameInHistory(newCropData.id, newCropData.name);
    } else {
      const newCrop: Crop = {
        id: crypto.randomUUID(),
        name: newCropData.name,
        datePlanted: newCropData.datePlanted,
        notes: newCropData.notes,
      };

      addCrop(bed.id, newCrop);

      addPlantingToHistory({
        id: crypto.randomUUID(),
        cropId: newCrop.id,
        cropName: newCrop.name,
        bedId: bed.id,
        bedName: bed.name,
        datePlanted: newCrop.datePlanted,
        notes: newCrop.notes,
      });
    }

    setIsCropFormModalOpen(false);
    setCropToEdit(null);
  };

  const handleDeleteCrop = (cropId: string) => {
    deleteCrop(bed.id, cropId);
    toast.success('Crop deleted successfully');
  };

  const handleEditCrop = (crop: Crop) => {
    setCropToEdit(crop);
    setIsCropFormModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCropFormModalOpen(false);
    setCropToEdit(null);
  };

  return (
    <>
      <PageHeader breadcrumbItems={breadcrumbItems} onOpenMenu={onOpenMenu} />
      <SectionHeader
        title={`${bed.name} - ${bed.size}`}
        description='Manage the crops planted in this garden bed.'
        imageSrc={`${BASE_PATH}/images/sign-icon.png`}
        imageAlt='garden sign'
      />

      {/* Crops */}
      <div>
        <div className='flex items-center justify-end mb-4'>
          <button
            type='button'
            onClick={handleOpenModal}
            className='bg-[#244225] text-white text-sm px-4 py-2 rounded hover:bg-[#356a3c] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#244225]'
          >
            + Add Crops
          </button>
        </div>
        <CropFormModal
          isOpen={isCropFormModalOpen}
          onClose={handleCloseModal}
          onSaveCrop={handleAddOrUpdateCrop}
          cropToEdit={cropToEdit || undefined}
        />

        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
          {bed.crops.map((crop) => (
            <CropCard
              key={crop.id}
              crop={crop}
              onDelete={() => handleDeleteCrop(crop.id)}
              onEditCrop={handleEditCrop}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BedDetails;
