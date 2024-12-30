"use client";

import { db } from '@/app/utils/db';
import { MockInterview } from '@/app/utils/schema';
import { Button } from '@/components/ui/button';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';

const Interview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const interviewParam =React.use(params);

  useEffect(() => {
    console.log(interviewParam.interview);
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewParam.interview));
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-10 space-y-10">
    <h2 className="font-bold text-3xl text-center">Let's Get Started</h2>
    <div className="grid grid-cols-1 md:grid-cols-1 gap-10">
      
      {interviewData ? (
        <div className="grid grid-cols-1 gap-4 p-5 border border-gray-200 rounded-lg shadow-md w-full md:w-3/4">
          <h2 className="text-lg font-medium">
            <strong>Job Position/Role:</strong> {interviewData.jobPosition}
          </h2>
          <h2 className="text-lg font-medium">
            <strong>Job Description:</strong> {interviewData.jobDesc}
          </h2>
          <h2 className="text-lg font-medium">
            <strong>Experience Required:</strong> {interviewData.jobExperience}
          </h2>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading interview details...</p>
      )}
  
      <div className="p-5 border rounded-lg bg-yellow-50 border-yellow-300 w-full md:w-3/4">
        <h2 className="flex items-center gap-2 text-yellow-500 text-lg font-medium">
          <Lightbulb /> <strong>Information</strong>
        </h2>
        <p className="text-yellow-500 mt-2">
          {process.env.NEXT_PUBLIC_INFORMATION || "No information available"}
        </p>
      </div>
  
      {/* Webcam Section with Column Layout */}
      <div className="flex flex-col items-center gap-5">
        {webcamEnabled ? (
          <Webcam
            onUserMedia={() => setWebcamEnabled(true)}
            onUserMediaError={() => setWebcamEnabled(false)}
            style={{ height: 300, width: 300 }}
            className="rounded-lg border border-gray-300"
          />
        ) : (
          <>
            <WebcamIcon className="h-72 w-full my-7 p-20 bg-gray-100 rounded-lg border border-dashed border-gray-400" />
            <Button onClick={() => setWebcamEnabled(true)} variant="ghost">
              Enable Web Cam & Microphone
            </Button>
          </>
        )}
      </div>
  
      <div className="flex justify-center mt-5">
        <Link 
        href={'/dashboard/interview/'+interviewParam.interview+'/startinterview'}>
        <Button className="px-10 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-500">
          Start Interview
        </Button>
        </Link>
      </div>
    </div>
  </div>
  
  
  );
};

export default Interview;
