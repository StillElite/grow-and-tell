import Image from 'next/image';
import { BASE_PATH } from '../../constants/basePath';

const Welcome: React.FC = () => {
  return (
    <div className='hidden md:block bg-[#dfe9e2] rounded-lg shadow p-6 md:p-8 mb-10 border border-[#c9d8cf]'>
      <div className='grid grid-cols-[auto_1fr] items-center gap-6 '>
        {/* Illustration */}

        <Image
          src={`${BASE_PATH}/images/dashboard-icon.png`}
          alt='Decorative illustration of garden tools'
          width={256}
          height={256}
          className='w-[256px] h-[256px] object-contain hidden lg:block'
          priority
        />

        {/* Welcome message */}
        <div className='text-left'>
          <h1 className='text-2xl xl:text-4xl font-bold text-[#b45309] drop-shadow-sm mb-4'>
            Welcome to your garden log
          </h1>
          <p className='text-gray-700 text-base md:text-lg max-w-xl'>
            Plan, reflect, and grow all in one place. Use the tools below to
            manage your beds, track plantings, and nurture your compost.
            Let&apos;s see what&apos;s thriving.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
