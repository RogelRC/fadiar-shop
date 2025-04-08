import ProductId from "@/components/ProductId";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Suspense>
        <ProductId />
      </Suspense>
      ;
    </>
  );
}
