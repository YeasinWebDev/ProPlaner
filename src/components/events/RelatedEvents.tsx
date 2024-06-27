"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import Link from "next/link";

function RelatedEvents({ category, name }: category) {
  const [events, setevents] = useState([]);

  const relatedEvents = async () => {
    const data = await axios.post("/events/relatedEvents", { category });
    setevents(data?.data?.events);
  };

  useEffect(() => {
    if (category) {
      relatedEvents();
    }
  }, [category]);

  const filterEvents = events?.filter((event: Event) => event?.name !== name);

  return (
    <div>
      <div className="flex items-center gap-10 flex-wrap">
        {filterEvents.length >0 ? (
          filterEvents.map((event:Event) => (
            <Link key={event?._id} href={`/events/${event?._id}`}>
              <div className="card card-compact bg-base-100 w-80 shadow-xl cursor-pointer">
                <figure>
                  <div className="h-[30vh] w-full">
                    <img
                      className="w-full h-full"
                      src={event.image}
                      alt="event"
                    />
                  </div>
                </figure>
                <div className="card-body">
                  <div className="flex items-center gap-5">
                    <h3 className="bg-green-200 px-3 py-1 rounded-xl w-fit text-green-700 font-semibold">
                      {event?.price === 0 ? "Free" : `$${event?.price}`}
                    </h3>
                    <h3 className="bg-gray-200 px-3 py-1 rounded-xl w-fit text-gray-600 font-semibold">
                      {event?.category}
                    </h3>
                  </div>

                  <h3 className="font-semibold pt-5">
                    Start: <span>{event?.startDate}</span>
                  </h3>
                  <h3 className="font-bold py-5 text-2xl">
                    <span>{event?.name}</span>
                  </h3>

                  <h3 className="font-bold pt-5 text-sm">
                    by:<span className="text-green-600"> {event?.by}</span>
                  </h3>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

type category = {
  category: string;
  name: string;
};

interface Event {
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
}

export default RelatedEvents;
