import Record from "@/components/Record";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Suspense>
        <Record />
      </Suspense>
    </>
  );
}
