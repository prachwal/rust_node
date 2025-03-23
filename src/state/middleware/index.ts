import { loggerMiddleware } from "./loggerMiddleware";
import { asyncMiddleware } from "./asyncMiddleware";

export { applyMiddleware } from "./middleware";
export const middlewares = [loggerMiddleware, asyncMiddleware];