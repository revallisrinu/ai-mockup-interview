"use client";
import { db } from "@/app/utils/db";
import { MockInterview } from "@/app/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewCard from "./InterviewCard";

const PreviousInterviewList = () => {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      GetDetails();
    }
  }, [user]);

  const GetDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(
        eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(MockInterview.id));

    console.log("Query Result:", result);
    setInterviewList(result);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
      <h2 className="font-medium text-xl col-span-full">Previous Interviews</h2>
      {interviewList &&
        interviewList.map((interview, index) => (
          <InterviewCard key={index} interview={interview} />
        ))}
    </div>
  );
};

export default PreviousInterviewList;
