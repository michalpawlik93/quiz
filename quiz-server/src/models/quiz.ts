export class Quiz {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public createdDate: Date,
    public category: string
  ) {}

  validate(): boolean {
    return this.name.trim().length > 0;
  }
}
