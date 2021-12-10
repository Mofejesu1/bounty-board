// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const debugString = process.env.SENTRY_DEBUG;
const debug = debugString === "true";
const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn:
    SENTRY_DSN ||
    "https://8cd5c6d0a0a14e2ab48371d22a9535b4@o1071534.ingest.sentry.io/6069034",
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
  debug,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});

// capturing errors
// Sentry.captureMessage("Insert message with captureMessage.");
