"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Heart, PlusCircleIcon, ThumbsDown, ThumbsUp } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: "portrait" | "square";
  publicUrl: any;
  nameImage: string;
  userName: string;
}

export function AlbumArtwork({
  aspectRatio = "portrait",
  nameImage,
  publicUrl,
  className,
  userName,
  ...props
}: AlbumArtworkProps) {
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const supabase = createClientComponentClient();

  const handleDelete = async (nameImage: string) => {
    const { error } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER)
      .remove([
        `${process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_RESTORED}/image/${userName}/${nameImage}`,
      ]);
    const { error: erro2 } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER)
      .remove([
        `${process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_PROCESSING}/${userName}/${nameImage}`,
      ]); 

    router.refresh();

    if (error || erro2) {
      console.error("AlbumArtwork", error, erro2);
    }
  };

  const handlePackaging = async (env : string) => {
    const { error } = await supabase.storage.from(process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER).upload(
      `${env}/${userName}/${nameImage}`,
      publicUrl
    )

    router.refresh();

    if (error) {
      console.error("packagingImage", error);
    }
  }


  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            <Image
              src={publicUrl || ""}
              alt={publicUrl}
              width={300}
              height={300}
              priority={true}
              className={cn(
                "h-auto w-auto object-contain transition-all hover:scale-105",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem onClick={() => {
            handlePackaging(process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_COLLECTIONS)
          }}>
            Add to Collection
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add to Favorites</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem onClick={() => {
                handlePackaging(process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_FAVORITES)
              }}>
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                New favorite
              </ContextMenuItem>
              <ContextMenuSeparator />
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem
            onClick={() => {
              handleDelete(nameImage);
            }}
          >
            Delete
          </ContextMenuItem>
          <ContextMenuItem>Duplicate</ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              setLiked(!liked);
            }}
          >
            {liked ? "Unlike" : "Like"}{" "}
          </ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm flex justify-between items-center">
        <p>created by: <span className="font-bold">{userName}</span></p>
        {liked ? <ThumbsUp/> : <ThumbsDown/>}
      </div>
    </div>
  );
}
