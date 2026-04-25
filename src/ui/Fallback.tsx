import SvgLoaderComponent from "./SvgLoaderComponent";

function Fallback() {
  return (
    <div className="mx-auto my-12 flex items-center justify-center gap-x-4">
      <span className="text-secondary-500">در حال بارگذاری اطلاعات</span>
      
      <SvgLoaderComponent />
    </div>
  );
}
export default Fallback;
