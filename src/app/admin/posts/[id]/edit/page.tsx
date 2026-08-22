import PostEditor from "@/components/admin/PostEditor";
import { getPostById, getCategories, getTags, getExistingPosts } from "@/app/admin/posts/actions";
import { notFound } from "next/navigation";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [post, categories, tags, allPosts] = await Promise.all([
    getPostById(id),
    getCategories(),
    getTags(),
    getExistingPosts(),
  ]);

  if (!post) notFound();

  const existingPosts = allPosts.filter((p) => p.id !== id);

  return (
    <PostEditor
      postId={post.id}
      initialData={post}
      initialCategories={categories}
      initialTags={tags}
      existingPosts={existingPosts}
    />
  );
}