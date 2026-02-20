import Image from 'next/image';
import { features } from '../../constants/home';

const FeatureSection: React.FC = () => {
  return (
    <section
      id='features'
      className='bg-white py-10 md:py-16'
      aria-labelledby='features-heading'
    >
      <div className='max-w-[1500px] mx-auto px-4'>
        <div className='flex flex-col items-center text-center mb-12 md:mb-20 px-4'>
          {/* Header with decorative lines */}
          <div className='flex items-center justify-center gap-4 w-full'>
            <div className='h-0.5 bg-orange-600 flex-1 max-w-[150px] sm:max-w-[200px] md:max-w-[300px]' />
            <h2 className='text-2xl md:text-4xl font-bold font-nunito text-orange-700 whitespace-nowrap drop-shadow'>
              Our Features
            </h2>
            <div className='h-0.5 bg-orange-600 flex-1 max-w-[150px] sm:max-w-[200px] md:max-w-[300px]' />
          </div>

          {/* Caption */}
          <p className='mt-6 text-[#4b4b4b] font-light tracking-wide'>
            Plan, log, and reflect — Track your garden through every season.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
          {features.map((feature) => {
            const featureCardClasses = `flex flex-col items-center px-4 pb-6 ${
              feature.comingSoon ? 'opacity-60' : ''
            }`;

            return (
              <article
                key={feature.title}
                className={featureCardClasses}
                aria-label={`${feature.title} feature`}
              >
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  width={100}
                  height={100}
                  className='mb-4 md:mb-10 w-[100px] h-[100px] object-contain'
                  priority
                />
                <h3 className='text-xl font-bold uppercase text-[#557C2D] mb-2'>
                  {feature.title}
                </h3>
                <p className='text-base text-gray-600 text-center leading-relaxed'>
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
