import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ViewKey } from '../../mocks/mockdata';

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
  return (
    <aside
      className={`
        fixed top-0 left-0 h-full z-50 md:relative md:block w-64 bg-[#2a452c] text-white p-6 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      <button
        onClick={onClose}
        className='absolute top-4 right-4 text-white md:hidden'
        aria-label='Close menu'
      >
        <FontAwesomeIcon icon={faXmark} className='w-4 h-4' />
      </button>

      <Link href='/' className='flex items-center gap-2 mb-6'>
        <Image
          src='/images/logo-white.png'
          alt='Grow & Tell logo'
          width={140}
          height={40}
          priority
          className='w-[140px] h-[40px] object-contain'
        />
      </Link>

      <nav className='space-y-2 text-sm'>
        <button
          onClick={() => {
            onNavigate(ViewKey.Dashboard);
            onDeselectBed();
            onClose();
          }}
          className='block hover:underline'
        >
          Dashboard
        </button>
        <button
          onClick={() => {
            onNavigate(ViewKey.Beds);
            onDeselectBed();
            onClose();
          }}
          className='block hover:underline'
        >
          Beds
        </button>
        <button
          onClick={() => {
            onNavigate(ViewKey.PlantLog);
            onDeselectBed();
            onClose();
          }}
          className='block hover:underline'
        >
          Plant Log
        </button>
        <button
          onClick={() => {
            onNavigate(ViewKey.Compost);
            onDeselectBed();
            onClose();
          }}
          className='block hover:underline'
        >
          Compost
        </button>
        <button
          onClick={() => {
            onNavigate(ViewKey.Tasks);
            onDeselectBed();
            onClose();
          }}
          className='block hover:underline'
        >
          Seasonal Tasks
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
