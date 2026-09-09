import { NextRequest } from "next/server";
import type { User } from "@/types/authTypes";
import setCookiesOnReq from "./setCookiesOnReq";

type ProfileResponse = {
  data?: {
    user?: User;
  } | null;
} | null;

export default async function middlewareAuth(
  req: NextRequest,
): Promise<User | null> {
  const options = setCookiesOnReq(req.cookies);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`,
    options,
  );

  if (!res.ok) return null;

  const body: ProfileResponse = await res.json();

  return body?.data?.user ?? null;
}
