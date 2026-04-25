import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export default function setCookiesOnReq(
  cookies: RequestCookies | ReadonlyRequestCookies,
): RequestInit {
  const accessToken = cookies.get("accessToken");
  const refreshToken = cookies.get("refreshToken");

  return {
    credentials: "include",
    headers: {
      Cookie: `${accessToken?.name}=${accessToken?.value}; ${refreshToken?.name}=${refreshToken?.value}`,
    },
  };
}
