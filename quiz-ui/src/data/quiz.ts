"use server";

export async function getQuiz(id: string): Promise<Quiz | null> {
  try {
    const response = await fetch(`http://localhost:3000/quizzes/${id}`);
    if (!response.ok) {
      console.error(
        `Failed to fetch quiz with ID ${id}: ${response.statusText}`
      );
      return null;
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return null;
  }
}

export async function getAllQuizzes(): Promise<Quiz[]> {
  try {
    const response = await fetch("http://localhost:3000/quizzes", {
      next: {
        revalidate: 600, // invalidate Data cache in 1h
      },
    });
    if (!response.ok) {
      console.error(`Failed to fetch quizzes: ${response.statusText}`);
      return [];
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return [];
  }
}

export async function createQuiz(dto: Quiz): Promise<void> {
  try {
    const response = await fetch("http://localhost:3000/quizzes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });
    if (!response.ok) {
      console.error(`Failed to create quiz: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error creating quiz:", error);
  }
}

export type Quiz = {
  id: string;
  name: string;
  description: string;
  category: string;
};
