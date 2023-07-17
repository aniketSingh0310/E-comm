"use client";

import * as z from "zod";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../ui/modal";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const StoreModal = useStoreModal();
  const [loading, setLoading]= useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    //TODO: Create store
  };
  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage product and categories"
      isOpen={StoreModal.isOpen}
      onClose={StoreModal.onClose}
    >
      Future create store form
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="E-Commerce" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end">
                <Button disabled={loading} type="submit">Continue</Button>
                <Button disabled={loading} variant={"outline"} onClick={StoreModal.onClose}>Cancle</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
