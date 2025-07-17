const Footer: React.FC = () => {
  return (
    <footer className='bg-neutral-800 text-white text-sm text-center py-6'>
      <div className='max-w-[1500px] mx-auto px-4 text-center'>
        <p>
          &copy; {new Date().getFullYear()} Grow & Tell. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
