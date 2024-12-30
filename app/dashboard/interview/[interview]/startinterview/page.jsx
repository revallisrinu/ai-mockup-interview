"use client";

import { db } from "@/app/utils/db";
import { MockInterview } from "@/app/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState(); 
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activequestion, setActivequestion] = useState(0);
  const interviewParam=React.use(params)

 
  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewParam.interview));

      if (result.length > 0) {
        const rawJSON = result[0].jsonMockResp;
        try {
          const jsonData = JSON.parse(rawJSON); // Parse JSON mock response
          setMockInterviewQuestion(jsonData); // Set questions
        } catch (jsonError) {
          console.error("Invalid JSON in mock interview response:", jsonError);
          setMockInterviewQuestion([]); // Set empty questions if JSON is invalid
        }
        setInterviewData(result[0]); // Set interview data
      } else {
        console.error("No data found for the given interview ID");
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activequestion={activequestion}
        />
    
          <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion}
            activequestion={activequestion}
            interviewData={interviewData}
          />
      </div>
      <div className="flex justify-end gap-6">
  {activequestion > 0 && (
    <Button onClick={() => setActivequestion(activequestion - 1)}>
      Previous Question
    </Button>
  )}

  {activequestion !== mockInterviewQuestion?.length - 1 && (
    <Button onClick={() => setActivequestion(activequestion + 1)}>
      Next Question
    </Button>
  )}

  {activequestion === mockInterviewQuestion?.length - 1 && 
    <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
     <Button>End Interview</Button>
    </Link>
  }
</div>

    </div>
  );
};

export default StartInterview;
