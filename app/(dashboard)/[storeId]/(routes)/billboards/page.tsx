import prismadb from "@/lib/prismadb";
import { BillboardClient } from "./components/client";

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
  return (
    <>
      <div className="flex flex-col mx-3 mt-3">
        <BillboardClient data={billboards} />
      </div>
    </>
  );
};

export default BillboardsPage;
