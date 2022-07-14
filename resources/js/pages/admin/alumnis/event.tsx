import React, { useEffect, useState } from "react";
import BackBtn from "../../../components/BackBtn";
import Layout from "../../../components/Layout";
// import Table from "../../../components/Table";
import { IAlumni, IEvent } from "../../../lib/types";

import { AwesomeQRCode } from "@awesomeqr/react";

interface IEventsWithAttendance extends IEvent {
  pivot: {
    event_id: number;
    alumni_id: number;
    attended: number;
    attended_timestamp: string;
  };
}

interface IAlumniWithAttendance extends IAlumni {
  pivot: {
    event_id: number;
    alumni_id: number;
    attended: number;
    attended_timestamp: string;
  };
}

interface IAlumniEventProps {
  alumni: IAlumniWithAttendance;
  event: IEventsWithAttendance;
  alumni_event: {
    pivot: {
      attended: boolean;
      number_of_members: number;
      attended_timestamp: string;
      number_of_members_final: number;
    };
  };
  qrcode: string;
  back: string;
}

export const fsImageAsDataURI = async (path: string) => {
  const blob = await fetch(path).then((res) => res.blob());
  const reader = new FileReader();
  return await new Promise<string>((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result as string);
    return reader.readAsDataURL(blob);
  });
};

const AlumniEvent: React.FC<IAlumniEventProps> = ({
  alumni,
  event,
  alumni_event,
  qrcode,
  back,
}) => {
  const [logoImage, setLogoImage] = useState<string>();

  useEffect(() => {
    (async () => setLogoImage(await fsImageAsDataURI("/img/logo.png")))();
  }, []);
  return (
    <div className="w-full mx-auto sm:max-w-screen-md">
      <div className="bg-white border-none rounded-lg w-full p-6 shadow-sm max-w-screen-md">
        <div className="w-full flex justify-center">
          {/* <div style={{ width: 350, height: 350 }}> */}
          {/*   {logoImage && ( */}
          {/*     <AwesomeQRCode */}
          {/*       options={{ */}
          {/*         text: JSON.stringify({ */}
          {/*           ...alumni, */}
          {/*           event_id: event.id, */}
          {/*         }), */}
          {/*         size: 350, */}
          {/*         correctLevel: 3, */}
          {/*       }} */}
          {/*     /> */}
          {/*   )} */}
          {/* </div> */}
          <div dangerouslySetInnerHTML={{ __html: qrcode }}></div>
          {/* <img src={`data:image/png;base64, ${qrcode} `} alt="something" /> */}
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
          <div className="input-group my-3 px-0 sm:odd-pr-3 sm:even:pl-3 w-full sm:w-1/2">
            <label>Attended Time</label>
            <div className="w-full break-words">
              {alumni_event.pivot.attended_timestamp}
            </div>
          </div>
          <div className="input-group my-3 px-0 sm:odd-pr-3 sm:even:pl-3 w-full sm:w-1/2">
            <label>Number of Members</label>
            <div className="w-full break-words">
              {alumni_event.pivot.number_of_members}
            </div>
          </div>
          <div className="input-group my-3 px-0 sm:odd-pr-3 sm:even:pl-3 w-full sm:w-1/2">
            <label>Number of Members Final</label>
            <div className="w-full break-words">
              {alumni_event.pivot.number_of_members_final}
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
