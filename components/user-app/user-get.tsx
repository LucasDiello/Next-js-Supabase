"use client"


import { User } from "@/types";
import { createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { useState } from "react";

export default function SearchUser() {

    const [user, setUser] = useState<User | null>(null);
    const supabase = createClientComponentClient();

    const getUser = async () => {
        const {error, data: { user }} = await supabase.auth.getUser();

        if(error) {
            console.error("UserNav", error);
        }
        else {
            setUser(user);
        }
    };

    useEffect(() => {
        getUser();
    }, []);
  return (
        <h3 className="font-medium leading-none">Feito por: {user?.email?.split('@')[0]}</h3>

  )
}
