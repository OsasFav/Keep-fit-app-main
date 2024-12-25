
const Skeleton = ({ className, width }: { className?: string, width?: string }) => {
  return (
    <span className={`block p-1 bg-gray-200 animate-pulse rounded-lg ` + className + " " + width}></span>
  );
};


export default Skeleton;