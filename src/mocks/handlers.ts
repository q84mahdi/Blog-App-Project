import { postHandlers } from "./handlers/postHandlers";
import { categoryHandlers } from "./handlers/categoryHandlers";
import { commentHandlers } from "./handlers/commentHandlers";
import { authHandlers } from "./handlers/authHandlers";

/** Aggregate service handlers for the MSW server. */
export const handlers = [
  ...postHandlers,
  ...categoryHandlers,
  ...commentHandlers,
  ...authHandlers,
];

export { resetMockData } from "./mockData";
