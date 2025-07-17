import Link from 'next/link';

const isLoggedIn = true; // Replace with real auth logic later

const Nav: React.FC = () => {
  return (
    <nav className='flex gap-6 items-center font-nunito text-[#2a452c] font-semibold'>
      {isLoggedIn ? (
        <>
          <Link href='/dashboard' className='group relative'>
            Dashboard
            <span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full'></span>
          </Link>
          <button
            onClick={() => console.log('Logout')}
            className='group relative bg-transparent border-none p-0 cursor-pointer'
          >
            Logout
            <span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full'></span>
          </button>
        </>
      ) : (
        <Link href='/signin' className='group relative'>
          Sign In
          <span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full'></span>
        </Link>
      )}
    </nav>
  );
};

export default Nav;
