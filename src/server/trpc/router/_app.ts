import { router } from "../trpc";
import { processRouter } from "./processRouter";
import { nodeTableRouter } from "./nodeTableRouter";

export const appRouter = router({
  processf: processRouter,
  nodeX: nodeTableRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
