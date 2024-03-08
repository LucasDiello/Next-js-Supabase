import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

interface NextRequestWithImage extends NextRequest {
    imageUrl: string;
}

export async function POST(req: NextRequestWithImage, res: NextResponse) {

    const { imageUrl } = await req.json();

    const supabase = createRouteHandlerClient({cookies});
    const {data: {session}, error} = await supabase.auth.getSession();

    if(!session || error) new NextResponse("Login in order to use restore", {status: 500});
    const startRestoreProcess = await fetch("https://api.claid.ai/v1-beta1/image/edit",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${process.env.REPLICATE_API_TOKEN}`,
        },
        body: JSON.stringify({
            "input": imageUrl,
            "operations": {
                "restorations": {
                    "upscale": "smart_enhance"
                },
            "resizing": {
                "width": "auto",
                "height": "auto"
            }
            }
            
        })
    }
    )
    let jsonStartProcess = await startRestoreProcess.json();
    let restoredImage = jsonStartProcess.data.output.tmp_url;


    return NextResponse.json({data: restoredImage ? restoredImage : "failed to restored"}, {status: 200})
}