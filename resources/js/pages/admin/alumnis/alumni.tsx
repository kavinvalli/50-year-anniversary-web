import React from "react";
import BackBtn from "../../../components/BackBtn";
import Layout from "../../../components/Layout";
// import Table from "../../../components/Table";
import { IAlumni, IEvent } from "../../../lib/types";
import { useTable } from "react-table";
import { Link } from "@inertiajs/inertia-react";

interface IEventsWithAttendance extends IEvent {
  pivot: {
    event_id: number;
    alumni_id: number;
    attended: number;
    attended_timestamp: string;
    number_of_members: number;
  };
}

interface IAlumniProps extends IAlumni {
  events: IEventsWithAttendance[];
  // qrcode: string;
}

const Event: React.FC<IAlumniProps> = ({
  id,
  name,
  email,
  passing_year,
  mobile,
  gender,
  events,
  // qrcode,
}) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({
          row,
        }: {
          row: {
            original: {
              name: string;
              actualName: string;
            };
          };
        }) => {
          return (
            <Link href={row.original.name} className="text-accent font-bold">
              {row.original.actualName}
            </Link>
          );
        },
      },
      {
        Header: "Venue",
        accessor: "venue",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Time",
        accessor: "time",
      },
      {
        Header: "Attended?",
        accessor: "attended",
      },
      {
        Header: "Attended Time",
        accessor: "attended_timestamp",
      },
      {
        Header: "Number of Members",
        accessor: "number_of_members",
      },
      {
        Header: "Go to?",
        accessor: "goto",
        Cell: ({
          row,
        }: {
          row: {
            original: {
              goto: string;
            };
          };
        }) => {
          return (
            <Link className="button" href={row.original.goto}>
              Go
            </Link>
          );
        },
      },
    ],
    []
  );
  const data = React.useMemo(
    () =>
      events.map((event) => ({
        name: `/admin/events/${event.id}`,
        actualName: event.name,
        venue: event.venue,
        date: event.date,
        time: event.time,
        attended: event.pivot.attended ? "Yes" : "No",
        attended_timestamp: event.pivot.attended_timestamp,
        number_of_members: event.pivot.number_of_members,
        goto: `/admin/alumnis/${id}/events/${
          event.id
        }?back=${`/admin/alumnis/${id}`}`,
      })),
    []
  );
  // @ts-ignore
  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <div className="w-full mx-auto sm:max-w-screen-md">
      <div className="bg-white border-none rounded-lg w-full p-6 shadow-sm max-w-screen-md">
        {/* <div className="w-full flex justify-center"> */}
        {/*   <img src={`data:image/png;base64, ${qrcode} `} alt="something" /> */}
        {/* </div> */}
        <div className="flex w-full justify-start items-center">
          <BackBtn href="/admin/events" />
          <h1 className="text-xl font-bold">{name}</h1>
        </div>
        <div className="flex flex-wrap items-start">
          <div className="input-group my-3 px-0 sm:odd-pr-3 sm:even:pl-3 w-full sm:w-1/2">
            <label>Email</label>
            <div className="w-full break-words">{email}</div>
          </div>
          <div className="input-group my-3 px-0 sm:odd-pr-3 sm:even:pl-3 w-full sm:w-1/2">
            <label>Passing Year</label>
            <div className="w-full break-words">{passing_year}</div>
          </div>
          <div className="input-group my-3 px-0 sm:odd-pr-3 sm:even:pl-3 w-full sm:w-1/2">
            <label>Mobile</label>
            <div className="w-full break-words">{mobile}</div>
          </div>
          <div className="input-group my-3 px-0 sm:odd-pr-3 sm:even:pl-3 w-full sm:w-1/2">
            <label>Gender</label>
            <div className="w-full break-words">{gender}</div>
          </div>
        </div>
      </div>
      <table {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup, i) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column, i) => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row, i) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell, index) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};

// @ts-ignore
Event.layout = (page) => (
  <Layout links={[{ href: "/", label: "home" }]}>{page}</Layout>
);

export default Event;
