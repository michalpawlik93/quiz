"use server";

import { createQuiz, getAllQuizzes, Quiz } from "@/data/quiz";
import { QuizFrom } from "./_components/_quizeForm";
import { revalidatePath } from "next/cache";
import { QuizList } from "./_components/_quizList";

export default async function QuizessPage() {
  const quizes = await getAllQuizzes();

  async function create(formData: FormData) {
    "use server";
    const quiz: Quiz = {
      id: formData.get("id") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
    };
    await createQuiz(quiz);
    revalidatePath("/quizzes");
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-8 sm:p-20 gap-8 font-sans">
      <QuizFrom onSubmit={create} />
      <QuizList quizes={quizes} />
    </div>
  );
}
