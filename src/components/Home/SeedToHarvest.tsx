import Link from 'next/link';
import Image from 'next/image';
import { BASE_PATH } from '../../constants/basePath';

const SeedToHarvest: React.FC = () => {
  return (
    <section
      className='grid grid-cols-1 lg:grid-cols-2'
      aria-labelledby='seed-to-harvest-heading'
    >
      {/* Left: Image with overlay */}
      <div className='relative'>
        <Image
          src={`${BASE_PATH}/images/carrots.jpg`}
          alt='Freshly harvested carrots and leeks'
          className='w-full h-full object-cover'
          width={640}
          height={960}
        />
        <div className='absolute inset-0 bg-black/20' aria-hidden='true' />
      </div>

      {/* Right: Text content */}
      <div className='flex items-center justify-center bg-[#2a452c] px-8 py-10 md:py-16'>
        <div className='max-w-xl text-center lg:text-left text-white'>
          <h2 id='seed-to-harvest-heading' className='text-3xl font-bold mb-4'>
            From Seed to Harvest
          </h2>
          <p className='mb-6 leading-relaxed'>
            Grow & Tell helps you track everything from when your tomatoes were
            planted to when they ripen on the vine. Stay on top of your
            garden&apos;s progress, season after season.
          </p>
          <Link
            href='/dashboard'
            className='inline-block bg-white hover:bg-gray-100 text-[#2a452c] font-semibold py-3 px-6 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600'
          >
            Start Planning
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SeedToHarvest;
