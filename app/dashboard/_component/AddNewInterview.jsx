"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { chatSession } from "@/app/utils/GeminiAIModal";
import { db } from "@/app/utils/db";
import { MockInterview } from "@/app/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [isopen, setIsopen] = useState(false);
  const [jobposition, setJobposition] = useState("");
  const [jobdescription, setJobDescription] = useState("");
  const [yearsofExperience, setYearsofExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
 
  const { user } = useUser();
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!jobposition || !jobdescription || !yearsofExperience) {
        alert("Please fill in all the required fields.");
        setLoading(false);
        return;
    }

    const inputPrompt =
    `Job Position: ${jobposition}, jobDescription: ${jobdescription}, yearsOfExperience: ${yearsofExperience}. ` +
    `Based on this information, please provide exactly ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT} ` +
    `interview questions along with detailed answers. Ensure the response is strictly a JSON array of objects, ` +
    `where each object has two keys: "question" and "answer". No additional text or formatting is needed.`;


    try {
      const result = await chatSession.sendMessage(inputPrompt);
      const rawResponse = await result.response.text();
      console.log("Raw Response Text:", rawResponse);

      const cleanResponse = rawResponse.replace(/```json|```/g, "");
      const parsedResponse = JSON.parse(cleanResponse);
      // console.log("Parsed Response:", parsedResponse);

      const questionsArray = Array.isArray(parsedResponse)
          ? parsedResponse
          : parsedResponse?.interviewQuestions || [];
      // console.log("Questions Array:", questionsArray);

        setJsonResponse(questionsArray); // Store the array directly

        const resp = await db
            .insert(MockInterview)
            .values({
                mockId: uuidv4(),
                jsonMockResp: JSON.stringify(questionsArray), // Save only the array
                jobPosition: jobposition,
                jobDesc: jobdescription,
                jobExperience: yearsofExperience,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format("DD-MM-YYYY"),
            })
            .returning({ mockId: MockInterview.mockId });

        // console.log("Inserted records:", resp);

        if (resp && resp.length > 0 && resp[0]?.mockId) {
            setIsopen(false);
            router.push("/dashboard/interview/" + resp[0]?.mockId);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while generating questions.");
    } finally {
        setLoading(false);
    }
};
  
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 transition-all hover:shadow-md cursor-pointer"
        onClick={() => setIsopen(true)}
      >
        <h2 className="font-bold text-lg text-center">+Add New</h2>
      </div>
      <Dialog open={isopen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tell us more about job interviewing</DialogTitle>
            <DialogDescription>
              Add details about your job/position/role, job description, and
              years of experience.
            </DialogDescription>
            <form onSubmit={handleForm}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="jobrole"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Position/Job Role
                  </label>
                  <Input
                    id="jobrole"
                    type="text"
                    value={jobposition}
                    onChange={(event) => setJobposition(event.target.value)}
                    placeholder="Ex. Full Stack Developer"
                    required
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="jobdescription"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Description/Tech Stack in Short
                  </label>
                  <Input
                    id="jobdescription"
                    type="text"
                    value={jobdescription}
                    onChange={(event) => setJobDescription(event.target.value)}
                    placeholder="Ex. React, Node.js, MongoDB"
                    required
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="years"
                    className="block text-sm font-medium text-gray-700"
                  >
                    No of Years Experience
                  </label>
                  <Input
                    id="years"
                    type="number"
                    value={yearsofExperience}
                    onChange={(event) =>
                      setYearsofExperience(event.target.value)
                    }
                    placeholder="Ex. 3"
                    required
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="flex justify-end gap-5">
                  <Button variant="ghost" onClick={() => setIsopen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin mr-2" />
                        Generating...
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
