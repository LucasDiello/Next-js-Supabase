import UserAppHeader from "@/components/user-app/user-app-header";
import { AlbumArtwork } from "@/components/user-app/user-app-image";
import { Sidebar } from "@/components/user-app/user-app-sidebar";
import handleStorage from "@/lib/handleStorage";

export default async function page() {

  const imagesRestored = await handleStorage(process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_RESTORED);
  console.log("imagesRestored", imagesRestored)
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
            { imagesRestored ?
              imagesRestored.map((image: any, index) => {
                return (
                  <AlbumArtwork
                    key={index}
                    aspectRatio="square"
                    nameImage={image.name}
                    publicUrl={image.publicUrl}
                    userName={image.username}
                  />
                );
              }) : "No images restored yet"
            }
          </div>
        </div>
      </div>
    </div>
  );
}
