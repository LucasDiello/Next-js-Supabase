import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { cookies } from "next/headers";
import { RedirectType } from "next/dist/client/components/redirect";
import UserAppHeader from "@/components/user-app/user-app-header";
import { Sidebar } from "@/components/user-app/user-app-sidebar";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUploadPlaceholder } from "@/components/user-app/img-uploader-placeholder";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { AlbumArtwork } from "@/components/user-app/user-app-image";

export default async function page() {
  let loggedIn = false;

  const supabase = createServerComponentClient({ cookies });
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      loggedIn = true;
    }
  } catch (e) {
    console.log("UserApp", e);
  } finally {
    if (!loggedIn) redirect("/", RedirectType.replace);
  }

  const { data, error } = await supabase.storage
    .from(`images`)
    .list(
      `${process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_RESTORED}/image`
    );

  const publicUrlRequest = data?.map((image) => {
    const {
      data: { publicUrl },
    } = supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER)
      .getPublicUrl(
        `${process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_RESTORED}/image/${image.name}`
      );
    return publicUrl;
  });

  const publicUrl = publicUrlRequest?.map(async (url) => {
    try {
      const response = await fetch(url);
      if (response.statusText === "OK") {
        const text = await response.text();
        return text;
      } else {
        console.log("Failed to fetch:", response.status);
      }
    } catch (error) {
      console.error("Error fetching the URL:", error);
    }
  });


  const imagesRestored = await Promise.all(publicUrl as any);

  console.log("data", data);
  console.log("imagesRestored",imagesRestored);

  return (
    <>
      <div>
        {/* <Menu /> */}
        <UserAppHeader />
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              {/* <Sidebar playlists={playlists} className="hidden lg:block" /> */}
              <Sidebar className="hidden md:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="photos" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="photos" className="relative">
                          Photos
                        </TabsTrigger>
                        <TabsTrigger value="documents">Documents</TabsTrigger>
                        <TabsTrigger value="other" disabled>
                          Other
                        </TabsTrigger>
                      </TabsList>
                      <div className="ml-auto mr-4">
                        <Button>
                          <PlusCircleIcon className="mr-2 h-4 w-4" />
                          Add Colleciton
                        </Button>
                      </div>
                    </div>
                    <TabsContent
                      value="photos"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Photo Collection
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            The photos you already enhanced.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative w-full">
                        <ImageUploadPlaceholder />
                      </div>
                      <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Made for You
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Your personal playlists. Updated daily.
                        </p>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {
                              imagesRestored?.map((image) => (
                                <AlbumArtwork key={image} publicUrl={image} />
                              ))
                            }
                          </div>
                        </ScrollArea>
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="documents"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            New Episodes
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Your favorite podcasts. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      {/* <PodcastEmptyPlaceholder /> */}
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
