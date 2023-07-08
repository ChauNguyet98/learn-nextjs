import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

export interface PostDetailProps {
  post: any;
}

const imageLoader = ({ src }: any) => {
  return src;
};

export default function PostDetail({ post }: PostDetailProps) {
  const router = useRouter();
  console.log('post: ', post);

  if (!post) return null;

  return (
    <div>
      <h1>Post Detail page</h1>
      <div>
        <Image loader={imageLoader} src={post?.imageUrl} alt="post" width={1080} height={768} />
      </div>
      <ul>
        <li>Title: {post?.title}</li>
        <li>Author: {post?.author}</li>
        <li>Description: {post?.description}</li>
      </ul>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
  const data = await response.json();

  return {
    paths: data.data.map((post: any) => ({ params: { postId: post.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostDetailProps> = async (
  context: GetStaticPropsContext
) => {
  const { params } = context;
  if (!params?.postId) {
    return {
      notFound: true,
    };
  }

  const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${params?.postId}`);
  const data = await response.json();
  console.log(data);

  return {
    props: {
      post: data,
    },
  };
};
