// Import React
import React, { lazy, Suspense } from "react";

// Import Loader
import Loader from "../../components/loader/Loader";

// Export helper function for lazy loading components
export const lazyLoadComponent = (importFunc) => {
  const LazyComponent = lazy(importFunc);

  // Display fallback until component is fully imported
  return (props) => (
    <Suspense fallback={<Loader color="darkmagenta" />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
