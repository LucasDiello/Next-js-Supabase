import UserAppHeader from "@/components/user-app/user-app-header";
import { AlbumArtwork } from "@/components/user-app/user-app-image";
import { Sidebar } from "@/components/user-app/user-app-sidebar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function page() {
  const supabase = createServerComponentClient({ cookies });
  const {data: {user}} = await supabase.auth.getUser() 
  const userName = user?.email?.split("@")[0];
  const { data }: { data: any } = await supabase.storage
    .from(`images`)
    .list(
      `${process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_RESTORED}/image/${userName}`
    );

  const publicUrlRequest: any = data?.map((image: any) => {
    const {
      data: { publicUrl },
    } = supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER)
      .getPublicUrl(
        `${process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_RESTORED}/image/${userName}/${image.name}`
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

  return (
    <div>
      <UserAppHeader />
      <div className="border-t flex">
        <Sidebar className='className="hidden md:block"' />
        <div className="border-l p-4">
          <div>
          <h1 className="font-bold text-2xl ">Made for you</h1>
          <p className="mb-10 text-sm text-gray-400">
            Here are the images that have been restored for you. You can view.
          </p>
          </div>
          <div className="flex space-x-4 pb-4 flex-wrap">
            {
              imagesRestored.filter((image: any) => image.username === userName).map((image: any) => {
                return (
                  <AlbumArtwork
                    key={image.name}
                    publicUrl={image.publicUrl}
                    nameImage={image.name || ""}
                    userName={userName || ""}
                  />
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}
