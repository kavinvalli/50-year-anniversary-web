import { Link } from "@inertiajs/inertia-react";
import React from "react";
import Layout from "../../components/Layout";
import useTitle from "../../lib/use-title";

interface IAdminProps {}

const Admin: React.FC<IAdminProps> = ({}: IAdminProps) => {
  useTitle("Admin");

  return (
    <div className="flex items-center justify-center h-full w-full px-5">
      <div className="bg-white w-full max-w-sm p-5 rounded-lg">
        <h1 className="text-xl font-bold">Admin</h1>
        <Link className="button w-full mt-4" href="/admin/events">
          Events
        </Link>
      </div>
    </div>
  );
};

// @ts-ignore
Admin.layout = (page) => (
  <Layout links={[{ href: "/", label: "home" }]}>{page}</Layout>
);

export default Admin;
