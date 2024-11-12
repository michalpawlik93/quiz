import { ObjectId } from "mongodb";
import { app } from "../../../__fixtures__/fastifyFixture";
import { QuizDto } from "../../dto/quizDto";

describe("Quiz Routes", () => {
  it("should return 404 if quiz is not found", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/quiz/6730d5ee85de10dc9f370111",
    });
    expect(response.statusCode).toBe(404);
    expect(response.json()).toEqual({ message: "Quiz not found" });
  });

  it("should create a new quiz", async () => {
    const newQuiz: QuizDto = {
      name: "Sample Quiz",
      description: "A sample quiz description",
      category: "General Knowledge",
      id: new ObjectId().toString(),
    };

    const response = await app.inject({
      method: "POST",
      url: "/quiz",
      payload: newQuiz,
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toEqual({ message: "Quiz created" });
  });

  it("should return 400 if quiz creation fails", async () => {
    const invalidQuiz = {
      title: "Invalid Quiz",
    };

    const response = await app.inject({
      method: "POST",
      url: "/quiz",
      payload: invalidQuiz,
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty("message");
  });
});
