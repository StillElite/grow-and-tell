import Image from 'next/image';

interface SectionHeaderProps {
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt?: string;
  headingId?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  imageSrc,
  imageAlt = '',
  headingId,
}) => {
  return (
    <div className='bg-[#dfe9e2] rounded-lg shadow p-6 md:p-8 hidden md:flex items-center gap-8 mb-10 border border-[#c9d8cf] '>
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={128}
        height={128}
        className='w-[128px] h-[128px] object-contain'
        aria-hidden='true'
        role='presentation'
        priority
        fetchPriority='high'
      />
      <div>
        <h1 id={headingId} className='text-3xl font-bold text-[#2a452c] mb-2'>
          {title}
        </h1>
        <p className='text-gray-800 max-w-xl'>{description}</p>
      </div>
    </div>
  );
};

export default SectionHeader;
