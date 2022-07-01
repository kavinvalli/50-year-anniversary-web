import { Link, usePage } from "@inertiajs/inertia-react";
import React from "react";
import Layout from "../components/Layout";
import { IPageProps } from "../lib/types";
import { Admin, Authenticated, Guest } from "../lib/authorization";
import useTitle from "../lib/use-title";

const Index: React.FC = () => {
  const {
    props: { authenticated, user },
  } = usePage<IPageProps>();
  authenticated ? useTitle(user.name) : useTitle("Home");

  return (
    <div className="flex items-center justify-center h-full w-full px-5">
      <Guest>
        <div className="bg-white w-full max-w-sm p-5 rounded-lg">
          <Link className="button my-3" href="/auth/login">
            Login
          </Link>
        </div>
      </Guest>

      <Authenticated>
        <div className="bg-white w-full max-w-md p-5 rounded-lg">
          <p className="text-center">
            To scan the QR Codes, use the app downloaded on the tablets provided
          </p>
          <div className="mt-4">
            <Link className="button w-full mb-4" href="/admin">
              Admin
            </Link>
            <Link className="button w-full" href="/auth/logout">
              Logout
            </Link>
          </div>
        </div>
      </Authenticated>
    </div>
  );
};

// @ts-ignore
Index.layout = (page) => <Layout links={[]}>{page}</Layout>;

export default Index;
