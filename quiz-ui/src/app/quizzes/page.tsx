"use server";

import { createQuiz, Quiz, Result } from "@/data/quiz";
import { revalidatePath } from "next/cache";
import QuizListContiner from "./_components/_quizListContainer";
import { Suspense } from "react";
import { QuizForm } from "./_components/_quizeForm";

export default async function QuizessPage() {
  async function create(formData: FormData): Promise<Result<boolean>> {
    "use server";
    const quiz: Quiz = {
      id: formData.get("id") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
    };
    const result = await createQuiz(quiz);
    if (result.success) {
      revalidatePath("/quizzes");
    }
    return result;
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-8 sm:p-20 gap-8 font-sans">
      <QuizForm onSubmit={create} />
      <Suspense fallback="List is loading...">
        <QuizListContiner />
      </Suspense>
    </div>
  );
}
