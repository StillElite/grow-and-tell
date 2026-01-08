import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb, { BreadcrumbItem } from './Breadcrumb';

interface PageHeaderProps {
  breadcrumbItems: BreadcrumbItem[];
  onLogout: () => void;
  onOpenMenu: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  breadcrumbItems,
  onLogout,
  onOpenMenu,
}) => (
  <div className='flex items-center justify-between mb-6'>
    <div className='flex items-center gap-4'>
      {onOpenMenu && (
        <button
          type='button'
          onClick={onOpenMenu}
          className='md:hidden text-[#2a452c] -ml-2'
          aria-label='Open menu'
        >
          <FontAwesomeIcon icon={faBars} className='w-6 h-6' />
        </button>
      )}
      <div className='hidden md:flex'>
        <Breadcrumb items={breadcrumbItems} />
      </div>
    </div>

    {onLogout && (
      <button
        type='button'
        onClick={onLogout}
        className='text-sm text-orange-700 hover:text-orange-800 font-semibold flex items-center gap-2 transition-colors'
      >
        <FontAwesomeIcon icon={faRightFromBracket} className='w-4 h-4' />
        <span className='hidden md:inline'>Logout</span>
      </button>
    )}
  </div>
);

export default PageHeader;
