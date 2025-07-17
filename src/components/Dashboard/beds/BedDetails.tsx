import { Bed, Crop, ViewKey } from '../../../mocks/mockdata';
import { CropCard } from './CropCard';
import { useState } from 'react';
import CropFormModal from './CropFormModal';
import { useBedContext } from '../../../context/BedContext';
import SectionHeader from '../../shared/SectionHeader';
import { BreadcrumbItem } from '../../shared/Breadcrumb';
import PageHeader from '../../shared/PageHeader';
import toast from 'react-hot-toast';

interface BedDetailsProps {
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

  const handleLogout = () => {
    window.location.href = '/';
  };

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
    } else {
      addCrop(bed.id, {
        name: newCropData.name,
        datePlanted: newCropData.datePlanted,
        notes: newCropData.notes,
        id: crypto.randomUUID(),
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
      <PageHeader
        breadcrumbItems={breadcrumbItems}
        onLogout={handleLogout}
        onOpenMenu={onOpenMenu}
      />
      <SectionHeader
        title={`${bed.name} - ${bed.size}`}
        description='Manage the crops planted in this garden bed.'
        imageSrc='/images/sign-icon.png'
      />

      {/* Crops */}
      <div>
        <div className='flex items-center justify-end mb-4'>
          <button
            onClick={handleOpenModal}
            className='bg-[#244225] text-white text-sm px-4 py-2 rounded hover:bg-[#356a3c] transition'
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
