"use client";

import { Quiz } from "@/data/quiz";
import Link from "next/link";

export const QuizList = ({ quizes }: { quizes: Quiz[] }) => (
  <>
    <h2 className="text-2xl font-bold mb-4">Available Quizzes</h2>
    <ul
      key={"quizzes"}
      className="w-full max-w-md bg-white shadow-md rounded-lg divide-y divide-gray-200"
    >
      {quizes.map((quiz) => (
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
      ))}
    </ul>
  </>
);

const ListElement = ({ quiz }: { quiz: Quiz }) => (
  <div className="cursor-pointer">
    <h3 className="text-lg font-semibold text-gray-900">
      {quiz.name}:{quiz.id}
    </h3>
    <p className="text-sm text-gray-600">{quiz.description}</p>
    <span className="text-xs text-gray-500 mt-2 block">
      Category: {quiz.category}
    </span>
  </div>
);
