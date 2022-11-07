import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import {prisma} from '../../db/client'

export const nodeTableRouter = router({
    // Create a new node
    addNode: publicProcedure
    .input(z.object({
        title: z.string(),
        processId: z.number(),
        description: z.string(),
        prevNodeId: z.number(),
    }))
    .mutation(
        async ({input}) =>{
        const {
            title,
            processId,
            description,
            prevNodeId,
        } = input
        // console.log("HELLOOOOOOOOOOOOOOOOOOOOO",name);
        const pf = await prisma.nodeTable.create({
                data:input,
            });
        return pf;
    }),
    // Get a list of all nodes
    getNodeList: publicProcedure.query(async () => {
        const allNodes = await prisma.nodeTable.findMany();
        return allNodes;
    }),

    // Get a list of all nodes where processId = processId
    getNodeListByProcessID: publicProcedure
    .input(z.object(
        {
            pid:z.number()
        }))
    .query(async ({input}) => {
        const {pid} = input

        const allNodes = await prisma.nodeTable.findMany({
            where:{
                processID:pid,
            }
        });
        return allNodes;
    }),



    // Delete a node
    deleteNode: publicProcedure
    .input(z.object(
        {
            id:z.number()
        }))
    .mutation(
        async({input})=>
        {
        const {id} = input
        const del = await prisma.nodeTable.delete({
            where:{
                id:id,
            }
        })
    }),
    
});