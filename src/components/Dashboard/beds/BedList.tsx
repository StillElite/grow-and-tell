import SectionHeader from '../../shared/SectionHeader';
import BedFormModal from './BedFormModal';
import { BedCard } from './BedCard';
import { useState } from 'react';
import { Bed, ViewKey } from '../../../mocks/mockdata';
import PageHeader from '../../shared/PageHeader';
import { BreadcrumbItem } from '../../shared/Breadcrumb';

interface BedListProps {
  beds: Bed[];
  onView: (bedId: string) => void;
  onAddCrop: (updatedBed: Bed) => void;
  onAddBed: (name: string, size: string, notes: string) => void;
  onNavigate: (view: string) => void;
  onDeleteBed: (bedId: string) => void;
  onEditBed: (bed: Bed) => void;
  onOpenMenu?: () => void;
}

const BedList: React.FC<BedListProps> = ({
  onView,
  beds,
  onAddCrop,
  onAddBed,
  onDeleteBed,
  onEditBed,
  onNavigate,
  onOpenMenu,
}) => {
  const [isBedFormModalOpen, setIsBedFormModalOpen] = useState(false);

  const handleLogout = () => {
    window.location.href = '/';
  };

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Dashboard', onClick: () => onNavigate(ViewKey.Dashboard) },
    { label: 'Beds' },
  ];

  const handleOpenModal = () => setIsBedFormModalOpen(true);

  return (
    <>
      <PageHeader
        breadcrumbItems={breadcrumbItems}
        onLogout={handleLogout}
        onOpenMenu={onOpenMenu}
      />
      <SectionHeader
        title='Beds'
        description='View and manage your garden beds in one place. Each bed displays its size and the crops currently planted. Stay organized as you grow!'
        imageSrc='/images/bed-icon2.png'
        headingId='beds-heading'
      />

      <div className='flex justify-end mb-4'>
        <button
          onClick={handleOpenModal}
          className='bg-[#244225] text-white text-sm px-4 py-2 rounded hover:bg-[#356a3c] transition'
        >
          + Add Bed
        </button>
      </div>
      <BedFormModal
        isOpen={isBedFormModalOpen}
        onClose={() => setIsBedFormModalOpen(false)}
        onSaveBed={onAddBed}
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
        {beds.map((bed) => (
          <BedCard
            key={bed.id}
            bed={bed}
            onView={onView}
            onAddCrop={onAddCrop}
            onDeleteBed={onDeleteBed}
            onEditBed={onEditBed}
          />
        ))}
      </div>
    </>
  );
};

export default BedList;
