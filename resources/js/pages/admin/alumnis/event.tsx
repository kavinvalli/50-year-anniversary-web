import React from "react";
import BackBtn from "../../../components/BackBtn";
import Layout from "../../../components/Layout";
// import Table from "../../../components/Table";
import { IAlumni, IEvent } from "../../../lib/types";

interface IEventsWithAttendance extends IEvent {
  pivot: {
    event_id: number;
    alumni_id: number;
    attended: number;
  };
}

interface IAlumniWithAttendance extends IAlumni {
  pivot: {
    event_id: number;
    alumni_id: number;
    attended: number;
  };
}

interface IAlumniEventProps {
  alumni: IAlumniWithAttendance;
  event: IEventsWithAttendance;
  alumni_event: {
    pivot: {
      attended: boolean;
    };
  };
  qrcode: string;
  back: string;
}

const AlumniEvent: React.FC<IAlumniEventProps> = ({
  alumni,
  event,
  alumni_event,
  qrcode,
  back,
}) => {
  return (
    <div className="w-full mx-auto sm:max-w-screen-md">
      <div className="bg-white border-none rounded-lg w-full p-6 shadow-sm max-w-screen-md">
        <div className="w-full flex justify-center">
          <img src={`data:image/png;base64, ${qrcode} `} alt="something" />
        </div>
        <div className="flex w-full justify-start items-center">
          <BackBtn href={back} />
          <h1 className="text-xl font-bold">
            {alumni.name} -{" "}
            <span className="text-accent underline">{event.name}</span>
          </h1>
        </div>
        <div className="flex flex-wrap items-start">
          <div className="input-group my-3 px-0 sm:odd-pr-3 sm:even:pl-3 w-full sm:w-1/2">
            <label>Attended?</label>
            <div className="w-full break-words">
              {alumni_event.pivot.attended ? "Yes" : "No"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// @ts-ignore
AlumniEvent.layout = (page) => (
  <Layout links={[{ href: "/", label: "home" }]}>{page}</Layout>
);

export default AlumniEvent;
