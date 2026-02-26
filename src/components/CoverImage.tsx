import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

interface CoverImageProps {
  title: string;
  coverImageUrl: string | StaticImport;
  slug: string;
}

function CoverImage({ title, coverImageUrl, slug }: CoverImageProps) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-md">
      <Link href={`/blogs/${slug}`}>
        <Image
          src={coverImageUrl}
          alt={title}
          fill
          className="object-cover object-center transition-all duration-300 ease-out hover:scale-110"
        />
      </Link>
    </div>
  );
}
export default CoverImage;
