import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPostsApi, getPostBySlugApi } from "@/services/postServices";
import { cookies } from "next/headers";
import setCookiesOnReq from "@/utils/setCookiesOnReq";
import RelatedPosts from "../_components/RelatedPosts";
import PostComments from "../_components/Comments/PostComments";
import PostAuthor from "@/components/PostAuthor";
import PostReadingTime from "@/components/PostReadingTime";
import PostInteraction from "@/components/PostInteraction";
import BackButton from "@/ui/BackButton";
import { AxiosRequestConfig } from "axios";

interface SinglePostProps {
  params: Promise<{ postSlug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const { data: posts } = await getAllPostsApi();
    return posts.slice(0, 6).map((post) => ({ postSlug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: SinglePostProps) {
  const resolvedParams = await params;
  const post = await getPostBySlugApi(resolvedParams.postSlug);

  return {
    title: `پست ${post.title}`,
  };
}

async function SinglePost({ params }: SinglePostProps) {
  const resolvedParams = await params;
  const cookiesStore = await cookies();
  const options = setCookiesOnReq(cookiesStore) as AxiosRequestConfig;

  let post;

  try {
    const postData = await getPostBySlugApi(resolvedParams.postSlug, options);
    post = postData;

    if (!post) notFound();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    notFound();
  }

  return (
    <div className="mx-auto mb-10 min-h-[60vh] max-w-screen-md space-y-6">
      <div className="flex flex-col gap-4">
        <BackButton />
        <h1 className="text-2xl font-bold text-secondary-700">{post.title}</h1>
      </div>

      {/* Post Navbar */}
      <div className="flex w-full items-center justify-between border-b border-secondary-300 pb-1">
        <PostAuthor
          name={post.author.name}
          avatarUrl={post.author.avatarUrl || undefined}
        />
        <div className="flex items-center gap-x-6">
          <PostReadingTime time={post.readingTime} />
          <PostInteraction post={post} />
        </div>
      </div>

      {/* Post Image */}
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <Image
          className="object-cover object-center transition-all duration-300 ease-out hover:scale-110"
          fill
          src={post.coverImageUrl}
          alt={post.title}
        />
      </div>

      {/* Post Text */}
      <div className="w-full space-y-6 whitespace-pre-line leading-loose text-secondary-600">
        <p>{post.briefText}</p>
        <span className="block w-full border border-dashed border-secondary-400"></span>
        <p>{post.text}</p>
      </div>

      {/* Related Posts */}
      {post.related.length > 0 && <RelatedPosts posts={post.related} />}

      {/* Post Comments */}
      <PostComments comments={post.comments} postId={post._id} />
    </div>
  );
}

export default SinglePost;
