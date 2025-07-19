'use client';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SignIn = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Temporary fake login function
  const login = async (name: string, email: string) => {
    return name && email; // stub: returns true if both exist
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(name, email);
    if (success) {
      router.push('/dashboard');
    } else {
      setError('Login failed. Please check your info.');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#f3f5f2] px-4'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-5'
      >
        <div className='flex justify-center'>
          <Link href='/'>
            <Image
              src='/images/logo.png'
              alt='Grow & Tell logo'
              width={160}
              height={50}
              priority
              className='w-[160px] h-[50px] object-contain'
            />
          </Link>
        </div>

        <p className='text-center text-[#2a452c] text-sm'>
          Sign in to your garden log
        </p>

        <div>
          <label htmlFor='name' className='sr-only'>
            Name
          </label>
          <input
            id='name'
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600'
            required
          />
        </div>

        <div>
          <label htmlFor='email' className='sr-only'>
            Email
          </label>
          <input
            id='email'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600'
            required
          />
        </div>

        {error && <p className='text-red-500 text-sm text-center'>{error}</p>}

        <button
          type='submit'
          className='w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
        >
          Sign In
        </button>

        <p className='text-xs text-center text-gray-500'>
          New here?{' '}
          <Link href='#' className='text-orange-700 hover:underline'>
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
