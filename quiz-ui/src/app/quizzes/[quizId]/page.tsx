"use server";

import { getQuiz } from "@/data/quiz";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;
  const quiz = await getQuiz(quizId);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold">Quiz Details</h1>
      {quiz ? (
        <div className="text-center">
          <h2 className="text-lg font-semibold">{quiz.name}</h2>
          <p className="text-gray-600">{quiz.description}</p>
          <span className="text-gray-500">Category: {quiz.category}</span>
        </div>
      ) : (
        <p>Quiz not found.</p>
      )}
    </div>
  );
}
