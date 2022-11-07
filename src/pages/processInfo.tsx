import { type NextPage } from "next";
import { NodeTable } from "@prisma/client";
import { use, useEffect,useState } from "react";
import { trpc } from "../utils/trpc";

const pInfo: NextPage = () => {
  
  // STATE
  const [currentPid, setCurrentPid] = useState(0)

  // Create
  const {mutate: addNode} = trpc.nodeX.addNode.useMutation(
    {
      onSuccess:(nf:any)=>{
        console.log("ADDDED: ",nf);
        // setNodeList((prev)=>[...prev,nf])

      },
      onError:(error:any)=>{console.error(error)
          
        }}
    )
  // READ
  const {data:getAll,isLoading} = trpc.nodeX.getNodeList.useQuery(
    undefined,
    {
      onSuccess:(data:any)=>{
        console.log("DATA READ: ",data)
        // setNodeList(data)
      }})
  const {data:nodeList} = trpc.nodeX.getNodeListByProcessID.useQuery(
    {pid:currentPid},
    {
      onSuccess:(data:any)=>{
        console.log("DATA READ: ",data)
        // setNodeList(data)
      }})


  // DELETE
  const {mutate:deleteNode} = trpc.nodeX.deleteNode.useMutation(
    {
      onSuccess:(n:any)=>
      {
        console.log("DELETED: ", n)
        // setNodeList((prev)=>prev.filter((item)=>item.id!==n.id))
      }
    }
  )

  return (
    <div>
      
    </div>
  );

};

export default pInfo;