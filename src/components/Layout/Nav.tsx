import Link from 'next/link';

const Nav: React.FC = () => {
  return (
    <nav className='flex gap-6 items-center font-nunito text-[#2a452c] font-semibold'>
      <Link href='/dashboard' className='group relative'>
        Dashboard
        <span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full'></span>
      </Link>
    </nav>
  );
};

export default Nav;
