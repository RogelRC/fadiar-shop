import Ticket from "@/components/Ticket";
import { Suspense } from "react";

export default function TicketPage() {
  return (
    <Suspense>
      <Ticket />
    </Suspense>
  );
}
