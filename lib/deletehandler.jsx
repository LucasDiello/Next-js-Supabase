import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function handleDelete(nameImage) {
    console.log("handleDelete", nameImage);
  const supabase = createClientComponentClient();
  const { error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER)
    .remove([`${process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_RESTORED}/image/${nameImage}`]);
  const { error: erro2 } = await supabase.storage.from(process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER).remove([`${process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_PROCESSING}/${nameImage}`]);

  if (error || erro2) {
    console.error("AlbumArtwork", error, erro2);
  }
}
