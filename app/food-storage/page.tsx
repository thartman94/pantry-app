"use client";
import FoodList from "../components/FoodList";
import { useGetFood } from "@/lib/hooks";

export default function Page() {
  const { data, loading, error } = useGetFood();
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      {data?.length > 0 && !error && <FoodList data={data} />}
    </main>
  );
}
