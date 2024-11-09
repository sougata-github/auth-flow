"use client";

import { login } from "@/actions/actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const LoginForm = () => {
  const [state, logInAction] = useActionState(login, undefined);

  return (
    <form
      action={logInAction}
      className="w-[600px] flex max-w-[300px] flex-col gap-4 px-4 py-2"
    >
      <div className="flex flex-col gap-2">
        <input
          id="email"
          name="email"
          placeholder="Email"
          className="py-2 outline outline-1 outline-black/10 rounded-lg placeholder:text-base px-4 focus:outline focus:outline-2 focus:outline-black"
        />
        {state?.errors.email && (
          <p className="text-red-500">{state.errors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="py-2 outline outline-1 outline-black/10 rounded-lg placeholder:text-base px-4 focus:outline focus:outline-2 focus:outline-black"
        />
      </div>
      {state?.errors.password && (
        <p className="text-red-500">{state.errors.password}</p>
      )}
      <SubmitButton />
    </form>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="bg-black mt-2 px-4 py-2 text-white rounded-lg"
    >
      Login
    </button>
  );
};

export default LoginForm;
