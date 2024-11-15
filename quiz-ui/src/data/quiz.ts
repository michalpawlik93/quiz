export type Result<T> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: string };

export type Quiz = {
  id: string;
  name: string;
  description: string;
  category: string;
};

export async function getQuiz(id: string): Promise<Result<Quiz>> {
  try {
    const response = await fetch(`http://localhost:3000/quizzes/${id}`);
    if (!response.ok) {
      return {
        success: false,
        data: null,
        error: `Failed to fetch quiz with ID ${id}: ${response.statusText}`,
      };
    }
    const data = await response.json();
    return { success: true, data, error: null };
  } catch (error: unknown) {
    return { success: false, data: null, error: parseError(error) };
  }
}

export async function getAllQuizzes(): Promise<Result<Quiz[]>> {
  try {
    const response = await fetch("http://localhost:3000/quizzes", {
      next: {
        revalidate: 600, // invalidate Data cache in 1h
      },
    });
    if (!response.ok) {
      return {
        success: false,
        data: null,
        error: `Failed to fetch quizzes: ${response.statusText}`,
      };
    }
    const data = await response.json();
    return { success: true, data, error: null };
  } catch (error: unknown) {
    return { success: false, data: null, error: parseError(error) };
  }
}

export async function createQuiz(dto: Quiz): Promise<Result<boolean>> {
  try {
    const response = await fetch("http://localhost:3000/quizzes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });
    if (!response.ok) {
      return {
        success: false,
        data: null,
        error: `Failed to create quiz: ${response.statusText}`,
      };
    }
    return { success: true, data: true, error: null };
  } catch (error: unknown) {
    return { success: false, data: null, error: parseError(error) };
  }
}

const parseError = (error: unknown) =>
  error instanceof Error ? error.message : "Unknown error occurred";
