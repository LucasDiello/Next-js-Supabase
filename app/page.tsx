import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import imageLogin from "@/public/restore.jpg";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateAccountForm from "@/components/auth/create-account-form";
import LoginAccountForm from "@/components/auth/login-account.form";
import Image from "next/image";
import { Fullscreen, GithubIcon, Linkedin, LinkedinIcon } from "lucide-react";

export default async function page() {
  let loggedIn = false;

  try {
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) return (loggedIn = true); //não utilizar redirect por conta de bug do next com server components
  } catch (e) {
    console.log("Home", e);
  } finally {
    if (loggedIn) redirect("/user-app", RedirectType.replace);
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="hidden lg:flex w-full relative z-50 h-full flex-col rounded-r-3xl bg-blue-800">
        <div className="hidden lg:flex w-full absolute z-40 h-full bg-black opacity-95 rounded-r-3xl" />
        <Image
          src={imageLogin}
          layout="fill"
          className="rounded-r-3xl"
          objectFit="cover"
          objectPosition="center"
          alt="login"
          />
        <div className=" w-full p-20 relative z-50">
          <h1 className="text-[50px] font-bold tracking-wide text-white mb-5">
            CREATE YOUR{" "}
            <span className="text-teal-600 border-b border-slate-900">
              ACCOUNT
            </span>{" "}
          </h1>
          <span className="text-[15px] text-white tracking-wide">
            start using the best image management system
          </span>
        </div>
        <div className=" absolute bottom-0 z-50 p-20 w-full">
          <p className="text-[10px] text-white tracking-wider">
            This is a personal project and is not complete. It is a work in
            progress <br />
            and is not meant to be used as a finished product. <br />
            if you have any questions or concerns, please contact me at!
          </p>
          <div className="flex my-8">
            <a href="" className="mr-4" target="_blank">
              <Linkedin color="white" size={20} />
            </a>
            <a href="" target="_blank">
              <GithubIcon color="white" size={20}/>
            </a>
          </div>
        </div>
      </div>
      <div className="lg:p-20 h-full flex justify-center items-center">
        <Tabs
          defaultValue="create-account"
          className="w-[400px] h-full border rounded-md shadow-2xl"
        >
          <TabsList className="flex justify-around items-center rounded-b-none h-14">
            <TabsTrigger
              value="create-account"
              className="transition-all delay-200"
            >
              Account
            </TabsTrigger>
            <TabsTrigger value="login" className="transition-all delay-200">
              Login
            </TabsTrigger>
          </TabsList>
          <TabsContent value="create-account">
            <CreateAccountForm />
          </TabsContent>
          <TabsContent value="login">
            <LoginAccountForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
