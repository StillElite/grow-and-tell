import SectionHeader from '../../shared/SectionHeader';
import {
  CompostBin,
  CompostStatus,
  CompostType,
  ViewKey,
} from '../../../mocks/mockdata';
import PageHeader from '../../shared/PageHeader';
import CompostList from './CompostList';
import { useCompostContext } from '../../../context/CompostContext';
import toast from 'react-hot-toast';
import { useState } from 'react';
import CompostBinFormModal from './CompostBinFormModal';

export interface CompostSectionProps {
  onNavigate: (view: ViewKey) => void;
  onOpenMenu: () => void;
}

const CompostSection: React.FC<CompostSectionProps> = ({
  onNavigate,
  onOpenMenu,
}) => {
  const { compostBins, addCompostBin, updateCompostBin, deleteCompostBin } =
    useCompostContext();
  const [compostBinToEdit, setCompostBinToEdit] = useState<CompostBin | null>(
    null
  );

  const handleLogout = () => {
    window.location.href = '/';
  };

  const isEditCompostBinModalOpen = compostBinToEdit !== null;

  const handleSaveCompostBin = (
    name: string,
    type: CompostType,
    status: CompostStatus,
    notes: string
  ) => {
    if (compostBinToEdit) {
      const updated = { ...compostBinToEdit, name, type, status, notes };
      updateCompostBin(updated);
      setCompostBinToEdit(null);
    } else {
      addCompostBin(name, type, notes);
    }
  };

  const handleDeleteBin = (compostBinId: string) => {
    deleteCompostBin(compostBinId);
    toast.success('Compost bin deleted successfully');
  };

  const breadcrumbItems = [
    { label: 'Dashboard', onClick: () => onNavigate?.(ViewKey.Dashboard) },
    { label: 'Compost' },
  ];

  return (
    <>
      <PageHeader
        breadcrumbItems={breadcrumbItems}
        onLogout={handleLogout}
        onOpenMenu={onOpenMenu}
      />
      <SectionHeader
        title='Compost'
        description='Manage your composting activities and track compost usage.'
        imageSrc='/images/compost.png'
      />
      <CompostList
        compostBins={compostBins}
        onAddCompostBin={addCompostBin}
        onDeleteBin={handleDeleteBin}
        onEditCompostBin={(compostBin) => setCompostBinToEdit(compostBin)}
      />
      <CompostBinFormModal
        isOpen={isEditCompostBinModalOpen}
        onClose={() => setCompostBinToEdit(null)}
        onSaveCompostBin={handleSaveCompostBin}
        compostBinToEdit={compostBinToEdit}
      />
    </>
  );
};

export default CompostSection;
