import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
    
    const res = NextResponse.next();
    console.log(req);
    console.log("middleware");
    console.log(res);
    try {
        const supabase = createMiddlewareClient({req,res})
        await supabase.auth.getSession();   
    }catch(e) {
        console.log(e);
    }
}