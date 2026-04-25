interface EmptyProps {
  resourceName: string;
}

function Empty({ resourceName }: EmptyProps) {
  return (
    <p className="text-center font-bold text-secondary-700">
      هیچ {resourceName} یافت نشد !
    </p>
  );
}
export default Empty;
