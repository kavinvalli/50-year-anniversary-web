import { InertiaLink } from "@inertiajs/inertia-react";
import React from "react";
import Layout from "../../../components/Layout";
import { IEvent } from "../../../lib/types";

interface IIndexProps {
  events: IEvent[];
}

const Index: React.FC<IIndexProps> = ({ events }: IIndexProps) => {
  const [query, setQuery] = React.useState<string>("");

  return (
    <div className="px-4 max-w-5xl w-full mx-auto">
      <div className="input-group my-5">
        <h1 className="text-2xl mb-2 text-accent-light font-bold uppercase">
          Events
        </h1>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setQuery(e.target.value as string);
          }}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 sm:gap-x-5">
        {events
          .filter(({ name }: IEvent) => {
            return name.toLowerCase().includes(query.toLowerCase());
          })
          .map((event: IEvent, i: number) => {
            return (
              <InertiaLink href={`/admin/events/${event.id}`} key={event.id}>
                <div
                  className="p-6 bg-white rounded-lg shadow-sm flex justify-between"
                  key={i}
                >
                  <h1 className="font-bold text-xl text-accent-light">
                    {event.name}
                  </h1>

                  <p className="font-bold text-accent-light">&#8594;</p>
                </div>
              </InertiaLink>
            );
          })}
      </div>
    </div>
  );
};

// @ts-ignore
Index.layout = (page) => (
  <Layout links={[{ href: "/", label: "home" }]}>{page}</Layout>
);

export default Index;
