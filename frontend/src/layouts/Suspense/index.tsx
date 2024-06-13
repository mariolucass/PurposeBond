import { Suspense } from "react";
import { LoadingFallback } from "./loadingFallback";

export const SuspenseComponent = ({ children }: any) => (
  <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
);
