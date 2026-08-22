import { getAllPosts } from "./actions";
import PostsList from "@/components/admin/PostsList";
import Link from "next/link";

export default async function AdminPostsPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 border-b border-border bg-white/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-text">Posts</h1>
          <Link
            href="/admin/posts/new"
            className="rounded-[8px] bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark transition"
          >
            + New Post
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <PostsList posts={posts} />
      </div>
    </div>
  );
}