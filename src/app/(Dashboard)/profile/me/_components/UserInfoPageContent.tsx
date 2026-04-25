"use client";

import UserAvatar from "./UserAvatar";
import UserInfoForm from "./UserInfoForm";
import Fallback from "@/ui/Fallback";
import { useAuth } from "@/contexts/AuthContext";

function UserInfoPageContent() {
  const { isLoading, user } = useAuth();

  if (isLoading || !user) return <Fallback />;

  const initValue = {
    name: user.name,
    email: user.email,
  };

  return (
    <div className="flex flex-col items-center justify-between gap-12 xl:flex-row xl:px-6">
      <div>
        <UserAvatar avatarUrl={user.avatarUrl} />
      </div>

      <div className="w-full flex-1">
        <UserInfoForm initValue={initValue} />
      </div>
    </div>
  );
}

export default UserInfoPageContent;
