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
import { AlbumArtwork } from "@/components/user-app/user-app-image";
import handleStorage from "@/lib/handleStorage";

export default async function page() {
  let loggedIn = false;

  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userName = user?.email?.split("@")[0];

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

  const imagesCollections = await handleStorage(
    process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_COLLECTIONS,
    process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_COLLECTIONS,
    true
  );

  const imagesRestored = await handleStorage(
    process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_RESTORED
  );
  return (
    <>
      <div>
        <UserAppHeader />
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar className="hidden md:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="photos" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="photos" className="relative">
                          Photos
                        </TabsTrigger>
                        <TabsTrigger value="collections">
                          My collection
                        </TabsTrigger>
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
                          Made for you
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Here are the images that have been restored for you.
                          You can view.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          (Click with the right button to others options)
                        </p>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4 flex-wrap">
                            {
                              imagesRestored.map((image, index) => {
                                if (image.publicUrl !== 'failed to restored') {
                                  return (
                                    <AlbumArtwork
                                      key={index}
                                      publicUrl={image.publicUrl}
                                      nameImage={image.name}
                                      userName={userName || ""}
                                    />
                                  );
                                }
                              })
                            }
                          </div>
                        </ScrollArea>
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="collections"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Your Collections
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            The collections you already created.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="flex space-x-4 pb-4 flex-wrap">
                      {
                              imagesCollections.map((image, index) => {
                                if (image.publicUrl !== 'failed to restored') {
                                  return (
                                    <AlbumArtwork
                                      key={index}
                                      publicUrl={image.publicUrl}
                                      nameImage={image.name}
                                      userName={userName || ""}
                                    />
                                  );
                                }
                              })
                            }
                      </div>
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
