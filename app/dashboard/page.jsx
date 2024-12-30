
import React from 'react'
import AddNewInterview from './_component/AddNewInterview'
import PreviousInterviewList from './_component/PreviousInterviewList'


const DashBoard = () => {
  return (
   <>
    
    <div className='p-10'> 
    <div className='font-bold text-2xl'>DashBoard</div>
     <h2 className='text-gray-500'>Create and Start your AI-MockUpInterview</h2>
     <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
      <AddNewInterview/>
     </div>
     <PreviousInterviewList/>
    </div>
   </>
  )
}

export default DashBoard