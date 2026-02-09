import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface AvatarProps {
  src?: string | StaticImport;
  size?: number;
}

const Avatar = ({ src, size = 24 }: AvatarProps) => {
  return (
    <Image
      src={src || "/images/avatar.png"}
      width={size}
      height={size}
      className="rounded-full ring-1 ring-secondary-300"
      alt="user avatar"
    />
  );
};
export default Avatar;
