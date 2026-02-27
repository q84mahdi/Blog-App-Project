import { cookies } from "next/headers";
import {
  getAllUsersApi,
  getUserApi,
  getUserCommentsApi,
  getUserPostsApi,
} from "./authServices";
import { getAllCommentsApi } from "./commentServices";
import { getAllPostsApi } from "./postServices";
import setCookiesOnReq from "@/utils/setCookiesOnReq";
import { AxiosRequestConfig } from "axios";

export async function fetchAdminCardsData(): Promise<{
  numberOfUsers: number;
  numberOfComments: number;
  numberOfPosts: number;
}> {
  const cookiesStore = await cookies();
  const options = setCookiesOnReq(cookiesStore) as AxiosRequestConfig;

  try {
    const data = await Promise.all([
      getAllUsersApi("", options),
      getAllCommentsApi("", options),
      getAllPostsApi("", options),
    ]);

    const numberOfUsers = Number(data[0].dataCount ?? "0");
    const numberOfComments = Number(data[1].dataCount ?? "0");
    const numberOfPosts = Number(data[2].dataCount ?? "0");

    return {
      numberOfUsers,
      numberOfComments,
      numberOfPosts,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  return {
    numberOfUsers: 0,
    numberOfComments: 0,
    numberOfPosts: 0,
  };
}

export async function fetchUserCardsData(): Promise<{
  numberOfBookmarks: number;
  numberOfComments: number;
  numberOfPosts: number;
}> {
  const cookiesStore = await cookies();
  const options = setCookiesOnReq(cookiesStore) as AxiosRequestConfig;

  try {
    const data = await Promise.all([
      getUserApi(options),
      getUserCommentsApi("", options),
      getUserPostsApi("", options),
    ]);

    const numberOfBookmarks = Number(
      data[0].user.bookmarkedPosts.length ?? "0",
    );
    const numberOfComments = Number(data[1].dataCount ?? "0");
    const numberOfPosts = Number(data[2].dataCount ?? "0");

    return {
      numberOfBookmarks,
      numberOfComments,
      numberOfPosts,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  return {
    numberOfBookmarks: 0,
    numberOfComments: 0,
    numberOfPosts: 0,
  };
}
