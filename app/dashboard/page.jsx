"use client"
import React from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import AddNewInterview from './_component/AddNewInterview';
import PreviousInterviewList from './_component/PreviousInterviewList';

const DashBoard = () => {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  // Show loading state while checking if user data is loaded
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Redirect to sign-in page if user is not signed in
  if (!isSignedIn) {
    router.push('/sign-in'); 
    return null;
  }

  return (
    <div className='p-10'>
      <div className='font-bold text-2xl'>Dashboard</div>
      <h2 className='text-gray-500 mt-2'>
        Create and Start your AI-MockUp Interview
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5'>
        <div className='p-4 bg-white rounded-lg shadow-md'>
          <AddNewInterview />
        </div>
        <div className='p-4 bg-white rounded-lg shadow-md'>
          <PreviousInterviewList />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
