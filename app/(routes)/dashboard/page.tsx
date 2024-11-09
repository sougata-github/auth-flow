"use client";

import { logout } from "@/actions/actions";

const page = () => {
  return (
    <div className="fade flex flex-col gap-4">
      <h1 className="text-5xl font-medium">Dashboard</h1>

      <button
        onClick={() => {
          logout();
        }}
        className="bg-black mt-2 px-4 py-2 text-white rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default page;
