import React from 'react';

const Page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to AI Mock Interview</h1>
        <p className="text-gray-600 mb-6">
          Practice your interview skills with cutting-edge AI technology. Get instant feedback and improve your chances of success!
        </p>
        <a
          href="sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2Fdashboard"
          className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
        >
          Sign In to Start
        </a>
      </div>
    </div>
  );
};

export default Page;
