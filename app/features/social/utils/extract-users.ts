import { PostUser } from "@/features/posts/types/post.types";

export function extractUsersFromPosts(
  posts: any[]
): PostUser[] {

  const map = new Map<string, PostUser>();

  posts.forEach((post) => {

    if (post.user?._id) {
      map.set(
        post.user._id,
        post.user
      );
    }


    if (post.sharedPost?.user?._id) {
      map.set(
        post.sharedPost.user._id,
        post.sharedPost.user
      );
    }

  });


  return [
    ...map.values()
  ];
}