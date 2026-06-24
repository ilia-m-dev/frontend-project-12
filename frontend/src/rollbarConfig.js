const rollbarAccessToken = import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN;

const rollbarConfig = {
  accessToken: rollbarAccessToken,
  environment: import.meta.env.VITE_ROLLBAR_ENVIRONMENT ?? import.meta.env.MODE,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    client: {
      javascript: {
        source_map_enabled: true,
      },
    },
  },
};

export const isRollbarEnabled = Boolean(rollbarAccessToken);

export default rollbarConfig;
