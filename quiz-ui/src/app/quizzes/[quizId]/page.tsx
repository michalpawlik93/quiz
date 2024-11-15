"use server";

import { getQuiz } from "@/data/quiz";
import { toast } from "react-toastify";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;
  const { data, error } = await getQuiz(quizId);

  if (error) {
    toast.error(
      error || "An error occurred while retrieving the quiz details."
    );
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {data ? (
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Quiz Details
          </h1>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {data.name}
          </h2>
          <p className="text-gray-600 mb-4">{data.description}</p>
          <div className="text-sm text-gray-500">
            <span>Category: </span>
            <span className="font-medium text-gray-700">{data.category}</span>
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-500">Quiz not found.</p>
      )}
    </div>
  );
}
