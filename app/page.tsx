import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { RedirectType, redirect } from "next/navigation";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import CreateAccountForm from "@/components/ui/auth/create-account-form";


export default async function page() {
  let loggedIn = false;

  try {
    const supabase = createServerComponentClient({cookies});
    const { data: { session } } = await supabase.auth.getSession()
    if (session) return loggedIn = true;  //não utilizar redirect por conta de bug do next com server components
  }
  catch (e) {
    console.log("Home", e);
  } finally {
    if (loggedIn) redirect("/user-app", RedirectType.replace);
  }

  return (
    <div className="flex flex-col h-screen w-full justify-center items-center">
      <Tabs defaultValue="create-account" className="w-[400px] border rounded-md pb-4 shadow-2xl">
      <TabsList className="flex justify-around items-center rounded-b-none h-14">
        <TabsTrigger value="create-account" className="transition-all delay-200">Account</TabsTrigger>
        <TabsTrigger value="login" className="transition-all delay-200">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="create-account">
      <CreateAccountForm />
      </TabsContent>
      <TabsContent value="login">

      </TabsContent>
    </Tabs>
    </div>
  )
}
