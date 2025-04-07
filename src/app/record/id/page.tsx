import OrderDetails from "@/components/OrderDetails";
import { Suspense } from "react";

export default function Order() {
  return (
    <Suspense>
      <OrderDetails />
    </Suspense>
  );
}
