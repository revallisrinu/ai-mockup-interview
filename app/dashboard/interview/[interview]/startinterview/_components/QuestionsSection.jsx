import { Lightbulb, Volume2 } from "lucide-react";  // Import icons for "Speak" functionality
import React from "react";

const QuestionsSection = ({ mockInterviewQuestion, activequestion }) => {

  // Function to handle speaking the question
  const handleSpeakQuestion = (questionText) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(questionText);
      window.speechSynthesis.speak(utterance);
    } else {
      console.log("Speech synthesis not supported in this browser.");
    }
  };

  // Function to handle question click, setting the active question
  const handleQuestionClick = (index) => {
    changeActiveQuestion(index);  
  };

  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion.map((question, index) => (
            <div key={index}>
              <h2
                className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${
                  activequestion === index ? "bg-red-500 text-white" : ""
                }`}
              >
                Question #{index + 1}
              </h2>
            </div>
          ))}
        </div>
        <h2 className="my-5 text-sm md:text-lg">
          {mockInterviewQuestion[activequestion]?.question}
        </h2>

        {/* Show the speaker icon below the question text for the active question */}
        {activequestion !== null && (
          <Volume2
            className="p-2 my-5 text-lg bg-blue-500 text-white rounded-full hover:bg-blue-700 focus:outline-none"
            onClick={() => handleSpeakQuestion(mockInterviewQuestion[activequestion].question)}
          />
        )}

        <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-md">
          <h2 className="flex gap-2 items-center text-primary font-semibold text-lg mb-2">
            <Lightbulb className="text-yellow-500" />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-gray-700 my-2 leading-relaxed">
            {process.env.NEXT_PUBLIC_QUESTION ||
              "This is a placeholder for your question."}
          </h2>
        </div>
      </div>
    )
  );
};

export default QuestionsSection;
