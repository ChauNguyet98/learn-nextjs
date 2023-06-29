import { useRouter } from 'next/router';
import React from 'react';

export interface AboutProps {}

export default function About(props: AboutProps) {
  const router = useRouter();
  console.log('check: ', router.query);

  return <div>About page</div>;
}

export function getServerSideProps() {
  // Pass data to the page via props
  return { props: {} };
}
