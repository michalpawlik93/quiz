"use client";

import { Quiz, Result } from "@/data/quiz";
import { toast } from "react-toastify";
import Link from "next/link";

export const QuizList = ({ quizzes }: { quizzes: Result<Quiz[]> }) => {
  const { success, error, data } = quizzes;
  if (!success) {
    toast.error(error || "An error occurred while fetching quizzes.");
    return <div>Quizzes can not be displayed</div>;
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Available Quizzes</h2>
      <ul
        key={"quizzes"}
        className="w-full max-w-md bg-white shadow-md rounded-lg divide-y divide-gray-200"
      >
        {data && data.length > 0 ? (
          data.map((quiz) => (
            <li
              key={quiz.id || "undefined"}
              className={"p-4 hover:bg-gray-50 transition"}
            >
              {quiz.id ? (
                <Link href={`/quizzes/${quiz.id}`}>
                  <ListElement quiz={quiz} />
                </Link>
              ) : (
                <ListElement quiz={quiz} />
              )}
            </li>
          ))
        ) : (
          <li className="p-4 text-gray-500">No quizzes available</li>
        )}
      </ul>
    </>
  );
};

const ListElement = ({ quiz }: { quiz: Quiz }) => (
  <div className="cursor-pointer">
    <h3 className="text-lg font-semibold text-gray-900">
      {quiz.name}: {quiz.id}
    </h3>
    <p className="text-sm text-gray-600">{quiz.description}</p>
    <span className="text-xs text-gray-500 mt-2 block">
      Category: {quiz.category}
    </span>
  </div>
);
