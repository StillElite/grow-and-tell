import { ViewKey } from '../../mocks/mockdata';
import BedSection from './plan/beds/BedSection';
import CompostSection from './plan/compost/CompostSection';
import PlantingSection from './plan/plantLog/PlantingSection';
import TaskSection from './plan/tasks/TaskSection';
import HarvestSection from './reflection/harvest/HarvestSection';
import SoilSection from './reflection/soil/SoilSection';

interface SectionViewProps {
  activeView: ViewKey;
  onNavigate: (view: ViewKey) => void;
  selectedBedId: string | null;
  setSelectedBedId: (id: string | null) => void;
  onOpenMenu: () => void;
}

const SectionView: React.FC<SectionViewProps> = ({
  activeView,
  onNavigate,
  selectedBedId,
  setSelectedBedId,
  onOpenMenu,
}) => {
  switch (activeView) {
    case 'Beds':
      return (
        <BedSection
          onNavigate={onNavigate}
          selectedBedId={selectedBedId}
          onSelectBed={setSelectedBedId}
          onOpenMenu={onOpenMenu}
        />
      );
    case 'Plant Log':
      return (
        <PlantingSection onNavigate={onNavigate} onOpenMenu={onOpenMenu} />
      );
    case 'Compost':
      return <CompostSection onNavigate={onNavigate} onOpenMenu={onOpenMenu} />;
    case 'Tasks':
      return <TaskSection onNavigate={onNavigate} onOpenMenu={onOpenMenu} />;
    case 'Harvest':
      return <HarvestSection onNavigate={onNavigate} onOpenMenu={onOpenMenu} />;
    case 'Soil Record':
      return <SoilSection onNavigate={onNavigate} onOpenMenu={onOpenMenu} />;
    default:
      return null;
  }
};
export default SectionView;
