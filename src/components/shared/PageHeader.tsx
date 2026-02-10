import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb, { BreadcrumbItem } from './Breadcrumb';

interface PageHeaderProps {
  breadcrumbItems: BreadcrumbItem[];

  onOpenMenu: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  breadcrumbItems,

  onOpenMenu,
}) => (
  <div className='mb-6'>
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
);

export default PageHeader;
