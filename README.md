
# Simple User Registration: from zero to vilain

This project documents all steps to create a simple User Registration App using:  
- [Next.js 14 (with App Router)](#install-nextjs),
- [TypesScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html),
- [Tailwind CSS](https://tailwindcss.com/docs/installation),
- [shadcn/ui](https://ui.shadcn.com/docs),
- [Zod](https://zod.dev/),
- [MongoDB Atlas](https://www.mongodb.com/pt-br/atlas),
- [Prisma](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb-typescript-mongodb),
- [Clerk](https://clerk.com/docs/quickstarts/nextjs).  

Feel free to use it as a boilerplate to your own project:

**Input:** `git clone https://github.com/bahiensed/simple-user-registration`


## Prerequisites:

- Node.js


## Next.js

**External link:** [Next.js 14 (with App Router)](https://nextjs.org/docs/app/building-your-application/routing#the-app-router)  


### Install Next.js

**Input:** `npx create-next-app@latest`

**Output:**
```bash
✔ What is your project named? simple-user-registration
✔ Would you like to use TypeScript? YES
✔ Would you like to use ESLint? YES
✔ Would you like to use Tailwind CSS? YES
✔ Would you like to use `src/` directory? NO
✔ Would you like to use App Router? (recommended) YES
✔ Would you like to customize the default import alias (@/*)? NO

Creating a new Next.js app in /home/lucas/projects/simple-user-registration

Using npm.

Initializing project with template: app-tw 

Installing dependencies:
- react
- react-dom
- next

Installing devDependencies:
- postcss
- tailwindcss
- eslint
- eslint-config-next

Success! Created simple-user-registration at /home/lucas/projects/simple-user-registration
```


### Run app

**Input:** `npm run dev`


### Customize Next.js folder and files structure:
This is optional, but necessary. 🤔  

1. Create folder `@/app/styles/`
2. Move file `@/app/globals.css` to the new folder `@/app/styles/`  
&nbsp;  
3. Create file `@/app/fonts/index.ts`

```bash
import localFont from "next/font/local";

export const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
export const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
```

4. Update `@/app/layout.tsx`:
  - change `./globals.css";` to `import "@/app/styles/globals.css";`
  - add `import { geistSans, geistMono } from "@/app/fonts";`
  - delete all other snippets related to fonts

5. Update `@/app/page.tsx`:
  - delete all content inside return()
  - add `<div>Home</div>` inside `return()`

## Github

## TypeScript

## Tailwind

## Eslint + Prettier


## shadcn/ui

### Install shadcn/ui

**Input:** `npx shadcn@latest init`  

**Output:**
```bash
Need to install the following packages:
shadcn@2.0.8
Ok to proceed? (y) 

✔ Preflight checks.
✔ Verifying framework. Found Next.js.
✔ Validating Tailwind CSS.
✔ Validating import alias.
✔ Which style would you like to use? › New York
✔ Which color would you like to use as the base color? › Neutral
✔ Would you like to use CSS variables for theming? … YES
✔ Writing components.json.
✔ Checking registry.
✔ Updating tailwind.config.ts
✔ Updating app/styles/globals.css
✔ Installing dependencies.
✔ Created 1 file:
  - lib/utils.ts

Success! Project initialization completed.
You may now add components.
```


### Install shadcn components

**Input:** `npx shadcn@latest add form input select textarea toast`  


## Frontend

### Create a simple form component

Create file `@/components/forms/User.tsx`  
Follow shadcn tutorial and modify it accordingly  
https://ui.shadcn.com/docs/components/input#form  

```bash
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

### Import user form component in `@/app/page.tsx`

`import { UserForm } @/components/forms/User;`  


### Add Toaster in `@/app/layout.tsx`

`import { Toaster } from @/components/ui/toaster;`  


### Create an export UI components index file

Create file `@/components/ui/index.ts`
```bash
export { Button } from "@/components/ui/button";
export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
export { Input } from "@/components/ui/input";
export { Select } from "@/components/ui/select";
export { Textarea } from "@/components/ui/textarea";
export { Toast } from "@/components/ui/toast";
export { Toaster } from "@/components/ui/toaster";
```


### Change shadcn/ui theme

1. Choose theme from: https://ui.shadcn.com/themes
2. Copy theme code
3. Create file `@/app/styles/shadcn.css` and paste code
4. Update `@/app/styles/globals.css` importing above new file into it.  

Once everything is changed, we have a simple form that pops up a message when submit button is clicked. Now it's time to setup our database. So in the future we will send the form data directly to the database.


## MongoDB Atlas


## Prisma
https://www.prisma.io/docs/getting-started/quickstart  


### 1. Install Prisma (as a development dependency):  

**Input:** `npm install prisma --save-dev`


### 2. Init prisma with related data source provider (MongoDB):  

**Input:** npx prisma init --datasource-provider mongodb  

**Output:**
```bash
✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Define models in the schema.prisma file.
3. Run prisma generate to generate the Prisma Client. You can then start querying your database.
4. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm

More information in our documentation:
https://pris.ly/d/getting-started
```


### 3. Create Prisma Schema:  

Use ChatGPT to create Prisma schema based on your Zod object.  
Paste code in `@/prisma/schema.prisma`


### 4. Run prisma generate (as we will use it in our app)

This will install Prisma Client as well.  

**Input:** `npx prisma generate`  

**Output:**
```bash
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma

✔ Installed the @prisma/client and prisma packages in your project

✔ Generated Prisma Client (v5.20.0) to ./node_modules/@prisma/client in 195ms

Start by importing your Prisma Client (See: http://pris.ly/d/importing-client)

Tip: Easily identify and fix slow SQL queries in your app. Optimize helps you enhance your visibility: https://pris.ly/--optimize
```


### 5. Create User action

Serve actions are files that runs in the server side.  

```bash
// @/actions/user.ts
'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * create a new user in the database.
 * @param data - an object containing the username of the user.
 * @returns the newly created user object.
 */
export async function createUser(data: { username: string }) {
  try {
    // create user in database
    const newUser = await prisma.user.create({
      data: {
        username: data.username,
      },
    });

    return newUser;
  } catch (error) {
    console.error('Houston, we have a problem: ', error);
    throw new Error('Failed to create user.');
  }
}

/**
 * Retrieve all users from the database.
 * @returns a list of user objects.
 */
export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error('Houston, we have a problem: ', error);
    throw new Error('Failed to retrieve users.');
  }
}
```


### Modify User form to save data into the database
```bash
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { createUser } from "@/actions/user";
import { Button, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input } from "@/components/ui";
import { toast } from "@/hooks/use-toast";

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

  // 2. define the submit handler
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      // Call the server action to create the user in the database
      const newUser = await createUser(data);

      // Success toast notification
      toast({
        title: "Success! User created.",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(newUser, null, 2)}</code>
          </pre>
        ),
      });

      // reset the form after submission
      form.reset();
    } catch (error) {
      // Handle error and show error toast
      console.error("Error creating user:", error);
      toast({
        title: "Error creating user!",
        description: "There was an issue creating the user. Please try again.",
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
```


### Enhance User form

Now it's time to build our form with more necessary fields.  


### Change user model accordingly


### Run prisma db push to sync dabase with schema
**Input:** `npx prisma db push`

**Output:**
```bash
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": MongoDB database "carina" at "backend.sqbkz.mongodb.net"
Applying the following changes:

[+] Unique index `User_username_key` on ({"username":1})


🚀  Your database indexes are now in sync with your Prisma schema. Done in 770ms

✔ Generated Prisma Client (v5.20.0) to ./node_modules/@prisma/client in 161ms

```














Quem é você?
Eu sou o Lucas, tenho 11 anos, nasci em Munique, na Alemanha, mas moro em Petrópolis desde 2017.

O que você mais gosta de fazer?
Eu gosto de desenhar quadrinhos, jogar jogos como Roblox e Minecraft e programar.

Você pratica algum esporte?
Eu faço escolinha de basquete duas vezes por semana e de natação três vezes por semana.
Mas também gosto de jogar futsal na escola e xadrez com meu pai e meu irmão mais novo.

Quando você começou a programar?
Eu comecei a programar com 7 anos durante a pandemia.

Quem te ensinou a programar?
Meu pai começou a me ensinar Python.
Depois ele começou a me ensinar a fazer jogos com o GDevelop e também no Roblox.


E como você continua se desenvolvendo na programação?
Eu leio tutoriais na Internet, vejo vídeos no YouTube e às vezes faço cursos online que me interessam. Não dá para parar de estudar, né?

(Falar do Broga, Deschamps e JS Mastery)

Cara, eu não sou melhor do que nenhum outro programador.
Eu já falei isso algumas vezes e volto a repetir.
Eu apenas leio a documentação de cada ferramenta que eu uso.
Tópico por tópico. A fundo!
Sigo os tutoriais disponíveis e escrevo vários códigos baseados neles.
Faço um monte de experiências até quebrar o código.
E depois vou tentando consertar e criar outras coisas usando a minha criatividade.
Se você realmente quer entender como as coisas funcionam e não apenas copiar e colar,
você deveria fazer o mesmo.









O ChatGPT disse:
ChatGPT
The error you're encountering is because MongoDB does not support Prisma migrations the same way SQL databases do. Prisma's migrate commands are designed for relational databases like PostgreSQL, MySQL, and SQLite, where the schema is tightly defined and migrations are necessary. However, MongoDB is a NoSQL database, which doesn't enforce strict schemas like SQL databases.

How to Work with Prisma and MongoDB:
No Migration Support for MongoDB:

Prisma with MongoDB: Prisma doesn’t handle schema migrations for MongoDB since MongoDB doesn’t have strict schemas like SQL databases. Therefore, commands like prisma migrate aren't available for MongoDB.
Prisma supports MongoDB as a data modeling and querying tool, but schema migrations need to be handled differently.
Next Steps:

You don’t need to run migrations when using MongoDB. You can work directly with Prisma models to interact with your MongoDB database.
Just define your models in schema.prisma and run npx prisma generate to generate the Prisma Client, which allows you to interact with your MongoDB collection.
Steps to Set Up Prisma with MongoDB:

Make sure you’ve initialized Prisma with MongoDB properly:
bash
Copiar código
npx prisma init --datasource-provider mongodb
After defining your models in schema.prisma, generate the Prisma Client:
bash
Copiar código
npx prisma generate
Now, you can start using Prisma Client to interact with your MongoDB database.
Example Workflow:
Define your models in schema.prisma (as we've discussed above).

Generate the Prisma client:

bash
Copiar código
npx prisma generate
Use the Prisma Client in your application to interact with MongoDB:

ts
Copiar código
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUser() {
  const newUser = await prisma.userProfile.create({
    data: {
      username: 'john_doe',
      bio: 'A short bio here...',
      showBio: true,
      firstname: 'John',
      showFirstName: true,
      lastname: 'Doe',
      showLastName: true,
      primaryEmailAddress: 'john@example.com',
      showPrimaryEmailAddress: true,
      primaryPhoneNumber: '123456789',
      showPrimaryPhoneNumber: true,
      address: '123 Main St',
      addressNumber: 123,
      addressComplement: 'Apt 4',
      showAddress: true,
      city: 'New York',
      state: 'NY',
      zip: 10001,
      showZip: true,
      country: 'USA',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log('New User Created:', newUser);
}

createUser();
Important Points:
Prisma can be used to interact with MongoDB collections, but you won’t need to manage migrations as with relational databases.
Your MongoDB schema will evolve based on the shape of the documents you're inserting, rather than being strictly managed via migrations.