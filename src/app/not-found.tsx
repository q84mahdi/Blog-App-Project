"use client";

import Header from "@/components/Header";
import useMoveBack from "@/hooks/useMoveBack";
import Button from "@/ui/Button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

function NotFound() {
  const moveBack = useMoveBack();

  return (
    <div className="h-screen">
      <Header />

      <div className="container xl:max-w-screen-xl">
        <div className="flex flex-col items-center justify-center pt-10">
          <h1 className="mb-8 text-xl font-bold text-secondary-800">
            صفحه ای که دنبالش بودید، پیدا نشد.
          </h1>

          <Button
            variant="outline"
            onClick={moveBack}
            className="outline-button flex items-center gap-x-2 px-6 py-2"
          >
            <ArrowRightIcon className="h-5 w-5 text-primary-900" />

            <span>برگشت</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
export default NotFound;
