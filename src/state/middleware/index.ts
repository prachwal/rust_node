import { loggerMiddleware } from "./loggerMiddleware";
import { asyncMiddleware } from "./asyncMiddleware";
import { apiMiddleware } from "./apiMiddleware";

export { applyMiddleware } from "./middleware";
export const middlewares = [loggerMiddleware, asyncMiddleware, apiMiddleware];