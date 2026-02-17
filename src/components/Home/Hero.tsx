import Link from 'next/link';
import { BASE_PATH } from '../../constants/basePath';

const Hero: React.FC = () => {
  return (
    <section
      className='relative bg-cover bg-center bg-no-repeat md:min-h-[800px] lg:min-h-[1000px] flex items-center'
      style={{
        backgroundImage: `url(${BASE_PATH}/images/seedling-hero2.png)`,
        backgroundPosition: 'top',
      }}
    >
      <div className='absolute inset-0 bg-black/40' />

      <div className='relative z-10 w-full max-w-[1500px] mx-auto px-4 py-16 flex'>
        <div className='w-full sm:w-3/4 lg:w-1/2 text-white'>
          <div className='max-w-xl'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2'>
              Track what you plant. <br />
              Learn what grows.
            </h1>

            <div className='h-1 bg-orange-600 w-full mb-6' />
          </div>

          <p className='hidden sm:block text-lg mb-6 max-w-lg'>
            Your personal garden log for planning beds, recording plantings, and
            keeping tabs on compost without the daily grind.
          </p>
          <div className='flex gap-4'>
            <Link
              href='/dashboard'
              className='inline-block px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
            >
              Start Planning
            </Link>
            <Link
              href='#features'
              aria-label='Jump to the features section'
              className='inline-block px-6 py-3 bg-white text-[#2a452c] hover:bg-gray-100 font-semibold rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600'
            >
              Explore Features
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
