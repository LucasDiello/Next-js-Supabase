import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function handleStorage(storage : string, list = process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_RESTORED, collect = false) {

    const supabase = createServerComponentClient({ cookies });

    const {data: {user}} = await supabase.auth.getUser() 
    const userName = user?.email?.split("@")[0];
    const verifyList = collect ? `${list}/${userName}` : `${list}/image/${userName}`
    const verifyPublicUrl = collect ? `${storage}/${userName}` : `${storage}/image/${userName}`

    const { data }: { data: any } = await supabase.storage
  .from(`images`)
  .list(
    `${verifyList}`
    );

    
const publicUrlRequest: any = data?.map((image: any) => {
  const {
      data: { publicUrl },
  } = supabase.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER)
    .getPublicUrl(
        `${verifyPublicUrl}/${image.name}`
        );
        return publicUrl;
    });
    
    const publicUrls = await Promise.all(
        publicUrlRequest.map(async (url: String) => {
    try {
      const response = await fetch(url as string);
      if (response.statusText === "OK") {
        const text = await response.text();
        return text;
    } else {
        console.log("Failed to fetch:", response.status);
    }
} catch (error) {
    console.error("Error fetching the URL:", error);
}
})
);

const imagesRestored = publicUrls.map((text, index) => {
    return {
        name: data[index].name,
        publicUrl: text,
        username: userName,
    };
});

return imagesRestored;
}

export default handleStorage;