import { useEffect, type ComponentType } from 'react';

/**
 * Higher-Order Component that logs to the console whenever the
 * wrapped component mounts and unmounts.
 */
export function withLogger<P extends object>(
  WrappedComponent: ComponentType<P>,
  displayName?: string,
) {
  const componentName =
    displayName || WrappedComponent.displayName || WrappedComponent.name || 'Component';

  function WithLogger(props: P) {
    useEffect(() => {
      console.log(`[withLogger] ${componentName} mounted`);
      return () => {
        console.log(`[withLogger] ${componentName} unmounted`);
      };
    }, []);

    return <WrappedComponent {...props} />;
  }

  WithLogger.displayName = `withLogger(${componentName})`;
  return WithLogger;
}
