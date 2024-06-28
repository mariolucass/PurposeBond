import ClipLoader from "react-spinners/ClipLoader";

export const LoadingComponent = () => (
  <div className="w-full h-full flex justify-center mt-24">
    <ClipLoader
      color="#4d7a86"
      size={115}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
);
