import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className='text-base font-medium' aria-label='Breadcrumb'>
      <ol className='flex flex-wrap items-center gap-2'>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className='flex items-center gap-2'>
              {item.onClick && !isLast ? (
                <button
                  type='button'
                  onClick={item.onClick}
                  className='group relative text-orange-700 font-semibold transition-colors duration-200 hover:text-orange-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-200'
                >
                  {item.label}
                  <span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-orange-700 transition-all duration-300 group-hover:w-full'></span>
                </button>
              ) : (
                <span
                  className='text-[#1b3b2f] font-semibold block w-28 xs:w-auto truncate md:whitespace-normal'
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className='text-gray-400 text-sm'
                  aria-hidden='true'
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
