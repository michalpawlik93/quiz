export class Quiz {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public category: string
  ) {}

  validate(): void {
    if (this.name.trim().length <= 0) {
      throw new Error("Invalid quiz data");
    }
  }
}

export type QuizId = Pick<Quiz, "id">;
