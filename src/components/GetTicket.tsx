"use client"
import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { checkoutOrder } from "@/app/checkoutorder/route";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function GetTicket({ event }: Event) {
  const session = useSession()
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const oncheckOut = async() => {
    const order= {
      eventId: event?.eventId,
      eventName: event?.name,
      eventPrice: event?.price,
      buyer: session?.data!.user?.email
    }
    checkoutOrder(order)
  };

  return (
    <form action={oncheckOut} method="Post">
      <button className="bg-purple-900 px-5 py-2 text-white rounded-2xl">
        {event?.price === 0 ? "Get Ticket" : "Buy Ticket"}
      </button>
    </form>
  );
}

type Event = {
  _id: string;
  image: string;
  price: number;
  category: string;
  startDate: string;
  name: string;
  by: string;
  endDate: string;
  location: string;
  description: string;
  eventId: string;
};
export default GetTicket;