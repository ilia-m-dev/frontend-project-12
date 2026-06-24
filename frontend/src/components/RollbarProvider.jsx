import { ErrorBoundary, Provider as RollbarProviderBase } from '@rollbar/react';
import rollbarConfig, { isRollbarEnabled } from '../rollbarConfig.js';

const RollbarProvider = ({ children }) => {
  if (!isRollbarEnabled) {
    return children;
  }

  return (
    <RollbarProviderBase config={rollbarConfig}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </RollbarProviderBase>
  );
};

export default RollbarProvider;
