"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";

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
  formStyle?: string;
  formItemStyle?: string;
  formButtonStyle?: string;
}

const formSchema = z.object({
  orgname: z.string().min(1, {
    message: "Organization name is required",
  }),
});

export function SearchForm({
  onSearch,
  formStyle,
  formItemStyle,
  formButtonStyle,
}: SearchFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orgname: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { orgname } = values;
    if (!onSearch) {
      router.push(`/search?orgname=${orgname}`);
    } else {
      onSearch(orgname);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={formStyle}>
        <FormField
          control={form.control}
          name="orgname"
          render={({ field }) => (
            <FormItem className={formItemStyle}>
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
        <Button className={formButtonStyle} variant="secondary">
          Search
        </Button>
      </form>
    </Form>
  );
}
