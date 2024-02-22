"use client";
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Link } from 'lucide-react';

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
  export function UserNav() {

    const [user, setUser] = useState<User | null>();
    const router = useRouter();
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

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    }

    return (
    <>
        { user && (
          <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/avatar-page.png" alt="reStore" />
              <AvatarFallback>RS</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.email?.split("@")[0]}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
        )}
    </>
    )
  }