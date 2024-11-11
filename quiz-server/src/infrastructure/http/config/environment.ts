export type EnvironmentType = (typeof Environment)[keyof typeof Environment];

export const Environment = {
  Production: ".env.production",
  Development: ".env.development",
} as const;
