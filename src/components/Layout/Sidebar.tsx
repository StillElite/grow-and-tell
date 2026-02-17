import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ViewKey } from '../../types/types';
import { useState } from 'react';
import { BASE_PATH } from '../../constants/basePath';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewKey) => void;
  onDeselectBed: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onDeselectBed,
}) => {
  const [activeView, setActiveView] = useState<ViewKey>(ViewKey.Dashboard);

  const sidebarItems = [
    { label: 'Dashboard', viewKey: ViewKey.Dashboard },
    { label: 'Beds', viewKey: ViewKey.Beds },
    { label: 'Plant Log', viewKey: ViewKey.PlantLog },
    { label: 'Compost', viewKey: ViewKey.Compost },
    { label: 'Tasks', viewKey: ViewKey.Tasks },
    { label: 'Harvest', viewKey: ViewKey.Harvest },
    { label: 'Soil Records', viewKey: ViewKey.SoilRecord },
  ];

  const asideClasses = `fixed top-0 left-0 h-full z-50 md:relative md:block w-64 bg-[#2a452c] text-white p-6 transform transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`;

  return (
    <aside className={asideClasses} aria-label='Sidebar navigation'>
      <button
        type='button'
        onClick={onClose}
        className='absolute top-4 right-4 text-white md:hidden'
        aria-label='Close menu'
      >
        <FontAwesomeIcon icon={faTimes} className='w-4 h-4' />
      </button>

      <Link href='/' className='flex items-center gap-2 mb-6'>
        <Image
          src={`${BASE_PATH}/images/logo-white.png`}
          alt='Grow & Tell logo'
          width={140}
          height={40}
          priority
          className='w-[140px] h-[40px] object-contain'
        />
      </Link>

      <nav className='space-y-2 text-sm'>
        {sidebarItems.map((item) => {
          const buttonClasses = `block hover:underline ${activeView === item.viewKey ? 'font-bold text-[#FCD583]' : ''}`;

          return (
            <button
              type='button'
              key={item.viewKey}
              onClick={() => {
                onNavigate(item.viewKey);
                onDeselectBed();
                onClose();
                setActiveView(item.viewKey);
              }}
              className={buttonClasses}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
