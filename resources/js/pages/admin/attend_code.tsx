import { Link, useForm } from "@inertiajs/inertia-react";
import React from "react";
import Layout from "../../components/Layout";
import TextInput from "../../components/TextInput";
import useTitle from "../../lib/use-title";

interface iAttendCodeProps {
  error?: string;
}

const AttendCode: React.FC<iAttendCodeProps> = ({
  error,
}: iAttendCodeProps) => {
  useTitle("Attend Code");

  const { setData, post, processing, errors } = useForm({
    code: "",
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setData(e.target.name as never, e.target.value as never);

  return (
    <div className="flex items-center justify-center h-full w-full px-5">
      <div className="bg-white w-full max-w-sm p-5 rounded-lg">
        <h1 className="text-xl font-bold">Attend Code</h1>
        <form
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            post("/admin/attend-code", {
              preserveState: true,
            });
          }}
        >
          <TextInput
            name="code"
            label="Code"
            placeholder="10001"
            type="text"
            className="my-4"
            disabled={processing}
            error={errors.code}
            onChange={handleChange}
          />
          {error && <div className="text-red-700 text-sm">{error}</div>}
          <div className="input-group my-4">
            <button
              type="submit"
              className="button w-full"
              disabled={processing}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// @ts-ignore
AttendCode.layout = (page) => (
  <Layout links={[{ href: "/", label: "home" }]}>{page}</Layout>
);

export default AttendCode;
