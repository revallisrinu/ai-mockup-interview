"use client"
import { db } from '@/app/utils/db'
import { UserAnswer } from '@/app/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDownIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
  

const FeedBackPage = ({params}) => {
    const router=useRouter()
    const [feedbacklist,setFeedbacklist]=useState([])

 const feedbackparam=React.use(params)

 useEffect(()=>{
    GetFeedback()
 },[])

   const GetFeedback=async()=>{
      const result=await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef,feedbackparam.interview))
      .orderBy(UserAnswer.id)
      setFeedbacklist(result)

      console.log(result);
      
   }

  return (
    <div className='p-10'>
         
          {feedbacklist.length==0?
            <h2 className='font-bold text-xl text-gray-500'>No Interview Feedback Found</h2>  
            :
            <>
            
            <h2 className='text-3xl font-bold text-green-300'>Congratulations</h2>
         <h2 className='font-bold text-2xl'>Here is your Interview Feedback</h2>
         <h2 className='text-primary text-lg my-3'>Your overall interview rating:<strong>7/10</strong></h2>
        

         <h2 className='text-sm text-gray-500'>Find Below Your questions with correct Answer,Your answer and Feedback for improvment</h2>
         {feedbacklist&&feedbacklist.map((item,index)=>(
            <Collapsible key={index} className='mt-7'>
            <CollapsibleTrigger className='p-2 bg-secondary rounded my-2 text-left flex justify-end'>{item.question} <ChevronsUpDownIcon className='h-5 w-5'/>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className='flex flex-col gap-3'>
                <h2 className='text-red-500 border rounded-lg p-2'><strong>Rating:</strong>{item.rating}</h2>
                <h2 className='text-sm border rounded-lg p-2 bg-red-50'><strong>Your Answer:</strong>{item.userAns}</h2>
                <h2 className='text-sm border rounded-lg p-2 bg-green-50'><strong>Correct Answer:</strong>{item.correctAns}</h2>
                <h2 className='text-sm border rounded-lg p-2 bg-blue-50'><strong>FeedBack:</strong>{item. feedback}</h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
         ))}
        </>}
         <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    </div>
  )
}

export default FeedBackPage