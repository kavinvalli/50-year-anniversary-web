import React from "react";
import BackBtn from "../../../components/BackBtn";
import Layout from "../../../components/Layout";
// import Table from "../../../components/Table";
import { IAlumni, IEvent } from "../../../lib/types";
import { useTable } from "react-table";
import { Link } from "@inertiajs/inertia-react";

interface IAlumniWithAttendance extends IAlumni {
  pivot: {
    event_id: number;
    alumni_id: number;
    attended: number;
    attended_timestamp: string;
    number_of_members: number;
    number_of_members_final: number;
  };
}

interface IEventProps extends IEvent {
  alumnis: IAlumniWithAttendance[];
  number_of_alumnis: number;
}

const Event: React.FC<IEventProps> = ({
  id,
  name,
  venue,
  date,
  time,
  alumnis,
  number_of_alumnis,
}) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "SNo.",
        accessor: "sno",
      },
      {
        Header: "Code",
        accessor: "code",
      },
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
      // {
      //   Header: "Email",
      //   accessor: "email",
      // },
      // {
      //   Header: "Passing year",
      //   accessor: "passing_year",
      // },
      {
        Header: "Mobile",
        accessor: "mobile",
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
        Header: "Number of Members Final",
        accessor: "number_of_members_final",
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
          return <Link href={row.original.goto}>Go</Link>;
        },
      },
    ],
    []
  );
  const data = React.useMemo(
    () =>
      alumnis.map((alumni, index) => ({
        sno: index + 1,
        id: alumni.id,
        name: `/admin/alumnis/${alumni.id}`,
        actualName: alumni.name,
        email: alumni.email,
        passing_year: alumni.passing_year,
        mobile: alumni.mobile,
        attended: alumni.pivot.attended ? "Yes" : "No",
        code: `${id}${alumni.id.toString().padStart(4, "0")}`,
        attended_timestamp: alumni.pivot.attended_timestamp ?? "-",
        number_of_members: alumni.pivot.number_of_members,
        number_of_members_final:
          alumni.pivot.number_of_members_final ===
          alumni.pivot.number_of_members
            ? "-"
            : alumni.pivot.number_of_members_final,
        goto: `/admin/alumnis/${
          alumni.id
        }/events/${id}?back=${`/admin/events/${id}`}`,
      })),
    []
  );
  // @ts-ignore
  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <>
      <div className="w-full mx-auto sm:max-w-screen-md">
        <div className="bg-white border-none rounded-lg w-full p-6 shadow-sm max-w-screen-md">
          <div className="flex w-full justify-start items-center">
            <BackBtn href="/admin/events" />
            <h1 className="text-xl font-bold">{name}</h1>
          </div>
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
              <label>Number of Alumnis</label>
              <div className="w-full break-words">{number_of_alumnis}</div>
            </div>
            <div className="input-group my-3 px-0 sm:odd-pr-3 sm:even:pl-3 w-full sm:w-1/2">
              <label>
                Number of People (alumnis + number of people with them)
              </label>
              <div className="w-full break-words">
                {alumnis
                  .map((alumni) => alumni.pivot.number_of_members)
                  .reduce((a, b) => a + b, 0)}
              </div>
            </div>
            <div className="input-group my-3 px-0 sm:odd-pr-3 sm:even:pl-3 w-full sm:w-1/2">
              <label>
                Number of People Final (alumnis + number of people with them)
              </label>
              <div className="w-full break-words">
                {alumnis
                  .map((alumni) => alumni.pivot.number_of_members_final)
                  .reduce((a, b) => a + b, 0)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="shadow overflow-auto border-b border-gray-200 sm:rounded-lg mt-4">
        <table
          {...getTableProps()}
          className="min-w-full divide-y divide-gray-200"
        >
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
                      <th
                        {...column.getHeaderProps()}
                        className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
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
          <tbody
            {...getTableBodyProps()}
            className="bg-white divide-y divide-gray-200"
          >
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
                          <td
                            {...cell.getCellProps()}
                            className="px-6 whitespace-nowrap"
                          >
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
    </>
  );
};

// @ts-ignore
Event.layout = (page) => (
  <Layout links={[{ href: "/", label: "home" }]}>{page}</Layout>
);

export default Event;
