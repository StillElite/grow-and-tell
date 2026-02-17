import Link from 'next/link';
import Image from 'next/image';
import Nav from './Nav';
import { BASE_PATH } from '../../constants/basePath';

const Header: React.FC = () => {
  return (
    <header className='bg-white shadow-md py-4 relative'>
      {/* Skip to Content Link */}
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only absolute top-2 left-2 bg-white text-[#2a452c] px-4 py-2 rounded shadow z-50'
      >
        Skip to content
      </a>

      <div className='max-w-[1500px] mx-auto px-4 flex justify-between items-end'>
        <Link href='/'>
          <div className='flex items-center gap-2'>
            <Image
              src={`${BASE_PATH}/images/logo.png`}
              alt='Grow & Tell logo'
              width={140}
              height={40}
              priority
              className='w-[140px] h-[40px] object-contain'
            />
          </div>
        </Link>

        <Nav />
      </div>
    </header>
  );
};

export default Header;
