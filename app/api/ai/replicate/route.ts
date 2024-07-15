import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

interface NextRequestWithImage extends NextRequest {
  imageUrl: string;
}

export async function POST(req: NextRequestWithImage, res: NextResponse) {
  const { imageUrl } = await req.json();
  const supabase = createRouteHandlerClient({ cookies });
  console.log("imageUrl", imageUrl);
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (!session || error)
    new NextResponse("Login in order to use restore", { status: 500 });
  const startRestoreProcess = await fetch(
    "https://api.replicate.com/v1/predictions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
      },
      body: JSON.stringify({
        version:
          "d41bcb10d8c159868f4cfbd7c6a2ca01484f7d39e4613419d5952c61562f1ba7",
        input: {
          cfg: 2,
          steps: 25,
          width: 512,
          height: 640,
          prompt: "Woman, detailed face, sci-fi RGB glowing, cyberpunk",
          light_source: "Left Light",
          highres_scale: 1.5,
          output_format: "webp",
          subject_image:
           imageUrl,
          lowres_denoise: 0.9,
          output_quality: 80,
          appended_prompt: "best quality",
          highres_denoise: 0.5,
          negative_prompt:
            "lowres, bad anatomy, bad hands, cropped, worst quality",
          number_of_images: 1,
        },
      }),
    }
  );
  let jsonStartProcess = await startRestoreProcess.json();
  console.log("jsonStartProcess", jsonStartProcess);
  let endpoint = jsonStartProcess.urls.get;

  console.log("endpoint", endpoint);
  let restoredImage : string | null = null;
  while (!restoredImage) {
    console.log("waiting for image")

    let finalResponse = await fetch(endpoint, 
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
        }
      }
    )
    let jsonFinalResponse = await finalResponse.json();
    if (jsonFinalResponse.status === "succeeded") {
      restoredImage = jsonFinalResponse.output[0];
    } else if (jsonFinalResponse.status === "failed") {
      break;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  console.log("restoredImage", restoredImage);
  return NextResponse.json(
    { data: restoredImage ? restoredImage : "failed to restored" },
    { status: 200 }
  );
}
