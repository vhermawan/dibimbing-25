'use client';

import { useRouter } from "next/navigation";

export default function ButtonAction() {
  const router = useRouter();
  const handleGetData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const data = await response.json();
      router.push('/contact/1')
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  return <button onClick={handleGetData}>tombol</button>;
}

// client component