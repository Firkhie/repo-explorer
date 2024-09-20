"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
// import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface SearchFormProps {
  onSearch?: (orgname: string) => void;
}

const formSchema = z.object({
  orgname: z.string().min(1, {
    message: "Organization name is required",
  }),
});

export function SearchForm({ onSearch }: SearchFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orgname: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { orgname } = values;
    if (!onSearch) {
      router.push(`/search?org=${orgname}`);
    } else {
      // TODO: For Search Page
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full grid-cols-12 gap-2 rounded-lg border px-3 py-3 lg:py-2 focus-within:shadow-sm"
      >
        <FormField
          control={form.control}
          name="orgname"
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-10 relative">
              <FormControl>
                <Input
                  className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                  placeholder="Input organization name..."
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute top-12 left-3" />
            </FormItem>
          )}
        />
        <Button
          className="col-span-12 w-full lg:col-span-2"
          variant="secondary"
        >
          Search
        </Button>
      </form>
    </Form>
  );
}