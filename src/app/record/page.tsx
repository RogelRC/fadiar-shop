import OrderRecord from "@/components/OrderRecord";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Suspense>
        <OrderRecord />
      </Suspense>
    </>
  );
}
