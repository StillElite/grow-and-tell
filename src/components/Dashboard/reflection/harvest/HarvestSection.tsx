import { Harvest, HarvestCategory, ViewKey } from '../../../../mocks/mockdata';
import PageHeader from '../../../shared/PageHeader';
import SectionHeader from '../../../shared/SectionHeader';
import { HarvestCard } from './HarvestCard';
import HarvestFormModal from './HarvestFormModal';
import { useState } from 'react';
import { useHarvestContext } from '../../../../context/HarvestContext';
import { getHarvestUnit } from '../../../../utils/getHarvestUnit';

export interface HarvestSectionProps {
  onNavigate: (view: ViewKey) => void;
  onOpenMenu: () => void;
}

const HarvestSection: React.FC<HarvestSectionProps> = ({
  onNavigate,
  onOpenMenu,
}) => {
  const { harvests, addHarvest, updateHarvest, deleteHarvest } =
    useHarvestContext();
  const [isHarvestFormModalOpen, setIsHarvestFormModalOpen] = useState(false);
  const [harvestToEdit, setHarvestToEdit] = useState<Harvest | null>(null);

  const isEditHarvestModalOpen = harvestToEdit !== null;

  const handleLogout = () => {
    window.location.href = '/';
  };

  const breadcrumbItems = [
    { label: 'Dashboard', onClick: () => onNavigate?.(ViewKey.Dashboard) },
    { label: 'Harvest' },
  ];

  const handleOpenModal = () => setIsHarvestFormModalOpen(true);

  const handleSaveHarvest = (
    name: string,
    quantity: number,
    dateHarvested: string,
    category: HarvestCategory
  ) => {
    const unit = getHarvestUnit(category);

    if (harvestToEdit) {
      const updated: Harvest = {
        ...harvestToEdit,
        name,
        quantity,
        dateHarvested,
        unit,
        category,
      };
      updateHarvest(updated);
    } else {
      addHarvest(name, quantity, dateHarvested, unit, category);
    }
  };

  return (
    <>
      <PageHeader
        breadcrumbItems={breadcrumbItems}
        onLogout={handleLogout}
        onOpenMenu={onOpenMenu}
      />
      <SectionHeader
        title='Harvest'
        description='Review your harvests and track your garden productivity.'
        imageSrc='/images/planting.png'
      />

      <div className='flex justify-end mb-4'>
        <button
          type='button'
          onClick={handleOpenModal}
          className='bg-[#244225] text-white text-sm px-4 py-2 rounded hover:bg-[#356a3c] transition'
        >
          + Add Harvest
        </button>
      </div>
      <HarvestFormModal
        isOpen={isHarvestFormModalOpen || isEditHarvestModalOpen}
        harvestToEdit={harvestToEdit}
        onClose={() => {
          setIsHarvestFormModalOpen(false);
          setHarvestToEdit(null);
        }}
        onSaveHarvest={handleSaveHarvest}
      />
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
        {harvests.map((harvest) => (
          <HarvestCard
            key={harvest.id}
            harvest={harvest}
            onDeleteHarvest={deleteHarvest}
            onEditHarvest={(harvest) => setHarvestToEdit(harvest)}
          />
        ))}
      </div>
    </>
  );
};

export default HarvestSection;
