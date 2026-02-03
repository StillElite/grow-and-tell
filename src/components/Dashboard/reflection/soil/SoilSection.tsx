import PageHeader from '../../../shared/PageHeader';
import SectionHeader from '../../../shared/SectionHeader';
import { useState } from 'react';
import { useSoilRecordContext } from '../../../../context/SoilRecordContext';
import SoilRecordFormModal from './SoilRecordFormModal';
import { SoilCard } from './SoilCard';
import { Season, SoilRecord, ViewKey } from '../../../../types/types';

export interface SoilSectionProps {
  onNavigate: (view: ViewKey) => void;
  onOpenMenu: () => void;
}

const SoilSection: React.FC<SoilSectionProps> = ({
  onNavigate,
  onOpenMenu,
}) => {
  const { soilRecords, addSoilRecord, updateSoilRecord, deleteSoilRecord } =
    useSoilRecordContext();

  const [isSoilRecordFormModalOpen, setIsSoilRecordFormModalOpen] =
    useState(false);
  const [soilRecordToEdit, setSoilRecordToEdit] = useState<SoilRecord | null>(
    null,
  );

  const isEditSoilRecordFormModalOpen = soilRecordToEdit !== null;

  const handleLogout = () => {
    window.location.href = '/';
  };

  const breadcrumbItems = [
    { label: 'Dashboard', onClick: () => onNavigate?.(ViewKey.Dashboard) },
    { label: 'Soil Record' },
  ];

  const handleOpenModal = () => setIsSoilRecordFormModalOpen(true);

  const handleSaveSoilRecord = (name: string, season: Season) => {
    if (soilRecordToEdit) {
      const updated: SoilRecord = {
        ...soilRecordToEdit,
        name,
        season,
      };
      updateSoilRecord(updated);
    } else {
      addSoilRecord(name, season);
    }
  };

  const handleDeleteSoilRecord = (soilRecordId: string) => {
    deleteSoilRecord(soilRecordId);
  };

  return (
    <>
      <PageHeader
        breadcrumbItems={breadcrumbItems}
        onLogout={handleLogout}
        onOpenMenu={onOpenMenu}
      />
      <SectionHeader
        title='Soil Record'
        description='Track and manage your soil health and composting activities to ensure optimal growing conditions for your plants.'
        imageSrc='/images/trowel-sprout.png'
      />

      <div className='flex justify-end mb-4'>
        <button
          type='button'
          onClick={handleOpenModal}
          className='bg-[#244225] text-white text-sm px-4 py-2 rounded hover:bg-[#356a3c] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#244225]'
          aria-label='Add new soil record'
        >
          + Add Soil Record
        </button>
      </div>
      <SoilRecordFormModal
        isOpen={isSoilRecordFormModalOpen || isEditSoilRecordFormModalOpen}
        soilRecordToEdit={soilRecordToEdit}
        onClose={() => {
          setIsSoilRecordFormModalOpen(false);
          setSoilRecordToEdit(null);
        }}
        onSaveSoilRecord={handleSaveSoilRecord}
      />

      <section aria-label='Soil records'>
        {soilRecords.length === 0 ? (
          <div className='text-center py-12 text-gray-500'>
            <p className='text-lg mb-2'>No soil records yet</p>
            <p className='text-sm'>
              Click &quot;Add Soil Record&quot; to start tracking your soil
              health.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
            {soilRecords.map((soilRecord) => (
              <SoilCard
                key={soilRecord.id}
                soilRecord={soilRecord}
                onAddSoilTest={updateSoilRecord}
                onDeleteSoilRecord={handleDeleteSoilRecord}
                onEditSoilRecord={(soilRecord) =>
                  setSoilRecordToEdit(soilRecord)
                }
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default SoilSection;
