import SectionHeader from '../../../shared/SectionHeader';
import { BedFormModal } from './BedFormModal';
import { useState } from 'react';
import PageHeader from '../../../shared/PageHeader';
import { BreadcrumbItem } from '../../../shared/Breadcrumb';
import { BedCard } from './BedCard';
import { Bed, ViewKey } from '../../../../types/types';
import { BASE_PATH } from '../../../../constants/basePath';

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

export const BedList: React.FC<BedListProps> = ({
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

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Dashboard', onClick: () => onNavigate(ViewKey.Dashboard) },
    { label: 'Beds' },
  ];

  const handleOpenModal = () => setIsBedFormModalOpen(true);

  return (
    <>
      <PageHeader breadcrumbItems={breadcrumbItems} onOpenMenu={onOpenMenu} />
      <SectionHeader
        title='Beds'
        description='View and manage your garden beds in one place. Each bed displays its size and the crops currently planted. Stay organized as you grow!'
        imageSrc={`${BASE_PATH}/images/bed-icon2.png`}
        imageAlt='garden bed icon'
        headingId='beds-heading'
      />

      <div className='flex justify-end mb-4'>
        <button
          type='button'
          onClick={handleOpenModal}
          className='bg-[#244225] text-white text-sm px-4 py-2 rounded hover:bg-[#356a3c] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#244225]'
        >
          + Add Bed
        </button>
      </div>
      <BedFormModal
        isOpen={isBedFormModalOpen}
        onClose={() => setIsBedFormModalOpen(false)}
        onSaveBed={onAddBed}
      />

      <section aria-label='Soil records'>
        {beds.length === 0 ? (
          <div className='text-center py-12 text-gray-500'>
            <p className='text-lg mb-2'>No Beds yet</p>
            <p className='text-sm'>
              Click &quot;Add Bed&quot; to create your first garden bed.
            </p>
          </div>
        ) : (
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
        )}
      </section>
    </>
  );
};
