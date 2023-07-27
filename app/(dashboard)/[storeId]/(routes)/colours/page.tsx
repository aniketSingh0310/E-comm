import prismadb from "@/lib/prismadb";
import { ColorClient } from "./components/client";
import { Billboard } from "@prisma/client";
import { ColorColumn } from "./components/columns";
import { format } from "date-fns"

const ColoursPage = async({
  params
}:{params:{storeId:string}
}) => {

  const colours= await prismadb.color.findMany({
    where:{
      storeId:params.storeId
    },
    orderBy:{
      createdAt:'desc'
    }
  })

  const formattedColours:ColorColumn[]= colours.map((item)=>({
    id:item.id,
    name:item.name,
    value:item.value,
    createdAt:format(item.createdAt,"MMMM do, yyyy")
  }));
  return (
    <>
      <div className="flex flex-col mx-3 mt-3">
        <ColorClient data={formattedColours} />
      </div>
    </>
  );
};

export default ColoursPage;
