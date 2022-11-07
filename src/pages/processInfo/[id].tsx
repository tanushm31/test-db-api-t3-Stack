import { type NextPage } from "next";
import { NodeTable } from "@prisma/client";
import { use, useEffect,useState } from "react";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
// Import Router 
import type { RouterOutputs } from "../../utils/trpc";
import { NextPageWithLayout } from '../../../src/pages/_app';


// Type
type nodeListType = RouterOutputs["nodeX"]["getNodeListByProcessID"];
type processType = RouterOutputs["processf"]["getProcessById"];
// const currentPid = 1;
const Comp =(props: { data: processType })=>{
  const {data} = props;
  return(
    <div className="flex flex-col p-2 px-4 w-1/2 h-2/3 bg-yellow-100">
      <h1 className="text-xl">Title: {data?.title} </h1>
      <p>Id: {data?.id}</p>
    </div>
  )
}

const pInfo: NextPageWithLayout = () => {
  const id = parseInt(useRouter().query.id as string, 10);
  
  // if useRouter().query.id is Loading, return Loading


  

  if (isNaN(id)) {
    // catch (e) { 
    //   return <div>loading</div>;
    // }
    return <div className="flex flex-col justify-center items-center test-2xl p-5 w-screen h-screen">Loading...</div>;
  }
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
  // parseInt(router.query.photoId as string, 10)
  const {data:fp,error:fpError,status:fpStatus} = trpc.processf.getProcessById.useQuery({id:id})

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

  if (fpError) {
    return (
      <div className="flex flex-col justify-center items-center test-2xl p-5 w-screen h-screen font-mono bg-red-400">Errror !</div>
    );
  }

  if (fpStatus !== 'success') {
    return <div className="flex flex-col justify-center items-center test-2xl p-5 w-screen h-screen">Loading...</div>;
  }
  if(fp){
    return (
      <div className="flex flex-col justify-center items-center test-2xl p-5 w-screen h-screen">
        <Comp data={fp}/>
      </div>
    );
  }
  return <div className="flex flex-col justify-center items-center text-2xl p-5 w-screen h-screen font-mono bg-red-400">
    Wrong Process ID
    </div>;


};

export default pInfo;