import { NextRequest } from "next/server";
import setCookiesOnReq from "./setCookiesOnReq";
import { User } from "@/types/authTypes";

export default async function middlewareAuth(
  req: NextRequest,
): Promise<User | null> {
  const options = setCookiesOnReq(req.cookies);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`,
    options,
  );

  if (!res.ok) return null;

  const { data }: { data?: { user?: User } } = await res.json();

  return data?.user ?? null;
}
