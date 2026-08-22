import PostEditor from "@/components/admin/PostEditor";
import { getCategories, getTags, getExistingPosts } from "@/app/admin/posts/actions";

export default async function NewPostPage() {
  const [categories, tags, existingPosts] = await Promise.all([
    getCategories(),
    getTags(),
    getExistingPosts(),
  ]);

  return (
    <PostEditor
      initialCategories={categories}
      initialTags={tags}
      existingPosts={existingPosts}
    />
  );
}