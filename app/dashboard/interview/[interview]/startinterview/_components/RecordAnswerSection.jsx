import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/app/utils/GeminiAIModal";
import { db } from "@/app/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { UserAnswer } from "@/app/utils/schema";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activequestion,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  
  

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

 
  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);
  


  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [isRecording]);


  const StopRecording = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  
  const UpdateUserAnswer = async () => {
    // console.log(userAnswer);
      setLoading(true);

      console.log("interviewData.mockId:", interviewData?.mockId);

      if (!interviewData?.mockId) {
        toast.error("Error: Interview data or mockId is missing.");
        setLoading(false);
        return;
      }

      const feedbackPrompt = `
        Question: ${mockInterviewQuestion[activequestion]?.question},
        User Answer: ${userAnswer},
        Please provide a rating and feedback for the answer in JSON format 
        with "rating" and "feedback" fields.
      `;

      const result = await chatSession.sendMessage(feedbackPrompt);
      const responseText = await result.response.text();
      const cleanResponse = responseText
        .replace("```json", "")
        .replace("```", "");

      const JsonMockResponse = JSON.parse(cleanResponse);

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData.mockId,
        question: mockInterviewQuestion[activequestion]?.question || "",
        correctAns: mockInterviewQuestion[activequestion]?.answer || "",
        userAns: userAnswer || "",
        feedback: JsonMockResponse?.feedback || "No feedback provided",
        rating: JsonMockResponse?.rating || "No rating provided",
        userEmail: user?.primaryEmailAddress?.emailAddress || "unknown@example.com",
        createdAt: moment().format("DD-MM-YYYY"),
      });

      if (resp) {
        toast.success("User Answer Recorded Successfully");
        setUserAnswer("");
        setResults([]) 
      }
      setResults([]) 
      setLoading(false);
    
  };

  return (
    <div className="flex justify-center items-center flex-col">
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="flex flex-col justify-center items-center bg-black rounded-lg p-5">
        <Image
          src={"/webcam.png"}
          height={200}
          width={200}
          className="absolute z-0 opacity-30"
          alt="Webcam"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 200,
            width: "100%",
            zIndex: 10,
            borderRadius: "8px",
          }}
        />
      </div>
      <Button
        variant="outline"
        className="my-10"
        aria-label={isRecording ? "Stop Recording" : "Start Recording"}
        onClick={StopRecording}
        disabled={loading}
      >
        {isRecording ? (
          <span className="flex items-center text-red-500">
            <Mic className="mr-2" />
            Recording...
          </span>
        ) : (
          "Record Answer"
        )}
      </Button>
      {loading && <p className="text-blue-500">Saving answer...</p>}
    </div>
  );
};

export default RecordAnswerSection;
