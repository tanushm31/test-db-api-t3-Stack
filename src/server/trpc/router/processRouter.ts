// import { Input } from "postcss";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import {prisma} from '../../db/client'
export const processRouter = router({
    addProcess: publicProcedure
        .input(z.object({
            title: z.string()
            }))    
        .mutation(async ({input}) =>{
            const {title} = input
            console.log("HELLOOOOOOOOOOOOOOOOOOOOO",title);
            const pf = await prisma.recordsTable.create({
                    data:input,
                });
            return pf;
        })
      ,
    // get List of all processes
    getProcessList: publicProcedure.query(async () => {
        const pf = await prisma.recordsTable.findMany();
        return pf;
    }),
    getAll: publicProcedure.query(({ ctx }) => {
      return ctx.prisma.recordsTable.findMany();
    }),
    deleteProcess: publicProcedure
    .input(z.object({id:z.number()}))
    .mutation(async({input})=>{
        const {id} = input
        const del = await prisma.recordsTable.delete({
            where:{
                id:id,
            }
        })
    })
  });
