import { useRouter } from 'next/router';
import React from 'react';

export interface PostDetailProps {}

export default function PostDetail(props: PostDetailProps) {
  const router = useRouter();
  return (
    <div>
      <h1>Post Detail page</h1>
      <p>Query: {JSON.stringify(router.query)} </p>
    </div>
  );
}
