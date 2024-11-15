"use server";

import { getAllQuizzes } from "@/data/quiz";
import { QuizList } from "./_quizList";

export default async function QuizListContiner() {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  }); // want to test loader
  const quizzes = await getAllQuizzes();

  return <QuizList quizzes={quizzes} />;
}
