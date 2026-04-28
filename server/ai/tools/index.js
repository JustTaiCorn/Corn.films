import { ophimTools } from "./ophim.tools.js";
import { createPersonalTools } from "./personal.tools.js";

export const createTools = (userId) => [
  ...ophimTools,
  ...createPersonalTools(userId ?? null),
];

export { ophimTools, createPersonalTools };
