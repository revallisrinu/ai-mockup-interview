import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'


const InterviewCard = ({interview}) => {
    const router=useRouter()

    const getStarted=()=>{
        router.push('/dashboard/interview/'+interview?.mockId)
    }

    const onFeedback=()=>{
        router.push('/dashboard/interview/'+interview?.mockId+"/feedback")
        
    }

  return (
    <div className='border shadow-sm rounded-lg p-3'>
        <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-500'>{interview?.jobExperience} years of Experience</h2>
        <h2 className='text-xs text-gray-500'>Created By:{interview?.createdBy}</h2>
        <h2 className='text-xs text-gray-500'>Created At:{interview?.createdAt}</h2>

        <div className='flex justify-between mt-2 gap-5'>
            <Button size="sm" variant="outline" className="w-full" onClick={onFeedback} >FeedBack</Button>
            <Button size="sm" className="w-full" onClick={getStarted}>Start</Button>

        </div>

    </div>
  )
}

export default InterviewCard