import prismadb from "@/lib/prismadb";
import { ProductClient } from "./components/client";
import { Billboard } from "@prisma/client";
import { ProductColumn } from "./components/columns";
import { format } from "date-fns"
import { formatter } from "@/lib/utils";

const ProductsPage = async({
  params
}:{params:{storeId:string}
}) => {

  const products= await prismadb.product.findMany({
    where:{
      storeId:params.storeId
    },
    include:{
        category:true,
        size:true,
        color:true
    },
    orderBy:{
      createdAt:'desc'
    }
  })

  const formattedProducts:ProductColumn[]= products.map((item)=>({
    id:item.id,
    name:item.name,
    isFeatured:item.isFeatured,
    isArchieved:item.isArchieved,
    price:formatter.format(item.price.toNumber()),
    category: item.category.name,
    size:item.size.name,
    color:item.color.name,
    createdAt:format(item.createdAt,"MMMM do, yyyy")
  }));
  return (
    <>
      <div className="flex flex-col mx-3 mt-3">
        <ProductClient data={formattedProducts} />
      </div>
    </>
  );
};

export default ProductsPage;
