"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Button, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input } from "@/components/ui";
import { toast } from "@/hooks/use-toast";
import { createUser } from "@/actions/user";

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters").max(16, "Username can be up to 16 characters"),
});

export default function UserForm() {
  // 1. define form with react-hook-form and zod validation.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. define submit handler
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      // call server action to create user in database
      const newUser = await createUser(data);

      // success toast notification
      toast({
        title: "Success! User created.",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(newUser, null, 2)}</code>
          </pre>
        ),
      });

      // reset form after submission
      form.reset();
    } catch (error) {
      // Handle error and show error toast
      console.error("Error creating user:", error);
      toast({
        title: "Error creating user!",
        description: "There was an issue while creating the user. Please try again.",
      });
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username:</FormLabel>
              <FormControl>
                <Input placeholder="Your username" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
}
