import React from "react";

export default function AuthMsg({ msg }: { msg: string }) {
  return <p className="text-sm text-red-500 mt-2">{msg}</p>;
}
