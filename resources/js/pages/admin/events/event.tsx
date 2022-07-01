import React from "react";
import BackBtn from "../../../components/BackBtn";
import Layout from "../../../components/Layout";
// import Table from "../../../components/Table";
import { IEvent } from "../../../lib/types";

const Event: React.FC<IEvent> = ({ name, venue, date, time }) => {
  return (
    <div className="px-4 max-w-5xl w-full mx-auto">
      <div className="input-group my-5">
        <div className="flex items-center">
          <BackBtn href="/admin/events" />
          <h1 className="text-xl font-bold">{name}</h1>
        </div>
        <div className="bg-white border-none rounded-lg w-full p-6 shadow-sm max-w-screen-md my-4">
          <div className="flex flex-wrap items-start">
            <div className="input-group my-3 px-0 sm:odd-pr-3 sm:even:pl-3 w-full sm:w-1/2">
              <label>Venue</label>
              <div className="w-full break-words">{venue}</div>
            </div>
            <div className="input-group my-3 px-0 sm:odd-pr-3 sm:even:pl-3 w-full sm:w-1/2">
              <label>Date</label>
              <div className="w-full break-words">{date}</div>
            </div>
            <div className="input-group my-3 px-0 sm:odd-pr-3 sm:even:pl-3 w-full sm:w-1/2">
              <label>Time</label>
              <div className="w-full break-words">{time}</div>
            </div>
            <div className="input-group my-3 px-0 sm:odd-pr-3 sm:even:pl-3 w-full sm:w-1/2">
              <label>name</label>
              <div className="w-full break-words">{name}</div>
            </div>
          </div>
        </div>
        {/* <h1 className="text-2xl mb-2 text-accent-light font-bold uppercase"> */}
        {/*   {name} */}
        {/* </h1> */}
      </div>
    </div>
  );
};

// @ts-ignore
Event.layout = (page) => (
  <Layout links={[{ href: "/", label: "home" }]}>{page}</Layout>
);

export default Event;
