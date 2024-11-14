"use server";

import { createQuiz, Quiz } from "@/data/quiz";
import { QuizFrom } from "./_components/_quizeForm";
import { revalidatePath } from "next/cache";
import QuizListContiner from "./_components/_quizListContainer";
import { Suspense } from "react";

export default async function QuizessPage() {
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
      <Suspense fallback="List is loading...">
        <QuizListContiner />
      </Suspense>
    </div>
  );
}
