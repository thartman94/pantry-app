"use client";
import { useEffect } from "react";
import FoodList from "./FoodList";
import ControlBar from "./ControlBar";
import { useGetFood } from "@/lib/hooks";
import { useSite } from "@providers/siteContext";
import PageWrapper from "@layout/PageWrapper";

export default function Page() {
  const { data, loading, error } = useGetFood();
  const { setControlBar } = useSite();

  useEffect(() => {
    if (setControlBar) {
      setControlBar(<ControlBar />);
    }
  }, [setControlBar]);

  return (
    <PageWrapper>
      {data?.length > 0 && !error && <FoodList data={data} />}
    </PageWrapper>
  );
}
