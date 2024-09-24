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
import { SearchIcon } from "lucide-react";

interface SearchFormProps {
  onSearch?: (org: string) => void;
  formStyle?: string;
  formItemStyle?: string;
  formButtonStyle?: string;
  icon?: boolean;
  showMessage?: boolean;
}

const formSchema = z.object({
  org: z.string().min(1, {
    message: "Organization name is required",
  }),
});

export function SearchForm({
  onSearch,
  formStyle,
  formItemStyle,
  formButtonStyle,
  icon,
  showMessage,
}: SearchFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      org: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { org } = values;
    if (!onSearch) {
      router.push(`/search?org=${org}`);
    } else {
      onSearch(org);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={formStyle}
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="org"
          render={({ field }) => (
            <FormItem className={formItemStyle}>
              <FormControl>
                <Input
                  className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                  placeholder="Input organization name..."
                  {...field}
                />
              </FormControl>
              {showMessage && (
                <FormMessage className="absolute top-[100px] lg:top-12 left-3" />
              )}
            </FormItem>
          )}
        />
        <Button className={formButtonStyle} variant="secondary">
          {icon ? (
            <SearchIcon className="min-h-4 min-w-4 max-w-5 max-h-5" />
          ) : (
            "Search"
          )}
        </Button>
      </form>
    </Form>
  );
}
