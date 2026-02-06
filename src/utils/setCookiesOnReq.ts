import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

export default function setCookiesOnReq(cookies: RequestCookies): RequestInit {
  const accessToken = cookies.get("accessToken");
  const refreshToken = cookies.get("refreshToken");

  return {
    credentials: "include",
    headers: {
      Cookie: `${accessToken?.name}=${accessToken?.value}; ${refreshToken?.name}=${refreshToken?.value}`,
    },
  };
}
