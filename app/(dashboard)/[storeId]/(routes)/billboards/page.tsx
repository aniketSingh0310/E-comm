import prismadb from "@/lib/prismadb";
import { BillboardClient } from "./components/client";
import { Billboard } from "@prisma/client";
import { BillboardColumn } from "./components/columns";
import { format } from "date-fns"

const BillboardsPage = async({
  params
}:{params:{storeId:string}
}) => {

  const billboards= await prismadb.billboard.findMany({
    where:{
      storeId:params.storeId
    },
    orderBy:{
      createdAt:'desc'
    }
  })

  const formattedBillboards:BillboardColumn[]= billboards.map((item)=>({
    id:item.id,
    label:item.label,
    createdAt:format(item.createdAt,"MMMM do, yyyy")
  }));
  return (
    <>
      <div className="flex flex-col mx-3 mt-3">
        <BillboardClient data={formattedBillboards} />
      </div>
    </>
  );
};

export default BillboardsPage;
