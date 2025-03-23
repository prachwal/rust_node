import { loggerMiddleware } from "./loggerMiddleware";
import { asyncMiddleware } from "./asyncMiddleware";
import { applyMiddleware } from "./middleware";

export { applyMiddleware };

export const middlewares = [loggerMiddleware, asyncMiddleware];