import prismadb from "@/lib/prismadb";
import { CategoryClient } from "./components/client";
import { Billboard } from "@prisma/client";
import { CategoryColumn } from "./components/column";
import { format } from "date-fns"

const CategoriesPage = async({
  params
}:{params:{storeId:string}
}) => {

  const categories= await prismadb.category.findMany({
    where:{
      storeId:params.storeId
    },
    include:{
        billboard:true,
    },
    orderBy:{
      createdAt:'desc'
    }
  })

  const formattedCategories:CategoryColumn[]= categories.map((item)=>({
    id:item.id,
    name:item.name,
    billboardLabel:item.billboard.label,
    createdAt:format(item.createdAt,"MMMM do, yyyy")
  }));
  return (
    <>
      <div className="flex flex-col mx-3 mt-3">
        <CategoryClient data={formattedCategories} />
      </div>
    </>
  );
};

export default CategoriesPage;
