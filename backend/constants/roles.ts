export const ROLES = {
  ADMIN: "ADMIN",
  BUYER: "BUYER",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
