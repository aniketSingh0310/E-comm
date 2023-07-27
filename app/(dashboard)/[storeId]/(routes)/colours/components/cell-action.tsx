"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColorColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps {
  data: ColorColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
  

    const router =useRouter();
    const params= useParams();

    const onCopy = (id:string) => {
        navigator.clipboard.writeText(id);
        toast.success("ID copied!");
      };

      const onDelete= async()=>{
        try{
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/colours/${data.id}`)
            router.refresh();
            
            toast.success("Color deleted!");
    
        }catch(error){
           toast.error("Make sure you removed all products for this color")
    
        }finally{
            setLoading(false);
            setOpen(false);
        }
      }

  return (
      <>
      <AlertModal
       isOpen={open}
       onConfirm={onDelete}
       loading={loading}
       onClose={()=>setOpen(false)}/>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
<DropdownMenuItem onClick={()=>router.push(`/${params.storeId}/colours/${data.id}`)}>
    <Edit className="w-4 h-4 mr-2"/>
    Update
</DropdownMenuItem>
<DropdownMenuItem onClick={()=>setOpen(true)}>
    <Trash className="w-4 h-4 mr-2"/>
    Delete
</DropdownMenuItem>
<DropdownMenuItem onClick={()=>onCopy(data.id)}>
    <Copy className="w-4 h-4 mr-2"/>
    Copy ID
</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
};
