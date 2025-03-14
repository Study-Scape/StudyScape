'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function BookmarksLoginComponent() {
  const router = useRouter();

  return (
    <div>
      <Button 
        onClick={() => router.push('/login')}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
      >
        Please login to bookmark locations!
      </Button>
    </div>
  );
}
