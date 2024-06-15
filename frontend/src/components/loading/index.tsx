import HashLoader from "react-spinners/HashLoader";

export const LoadingComponent = () => {
  return (
    <div className="w-full h-full flex justify-center mt-24">
      <HashLoader
        color="#4d7a86"
        size={115}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
