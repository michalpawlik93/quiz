export const mockOf = <P extends unknown[], R>(fn: (...args: P) => R) =>
  fn as jest.Mock<R, P>;
