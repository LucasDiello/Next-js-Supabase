"use client"

import { UserNav } from "../common/user-nav"

import React from 'react'

export default function UserAppHeader() {
  return (
        <header className="flex justify-between items-center p-4">
            <nav >
                <span className="font-extrabold">re<span className="font-extralight">Store</span></span>
            </nav>
            <UserNav />
        </header>
    )
}
