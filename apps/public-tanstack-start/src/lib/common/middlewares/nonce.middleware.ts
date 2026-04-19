import { createMiddleware } from '@tanstack/react-start';
import crypto from 'node:crypto';

const nonceMiddleware = createMiddleware({
  type: 'request',
}).server(({ next, request }) => {
  if (request.method !== 'GET') {
    return next({
      context: {
        nonce: '',
      },
    });
  }

  const nonce = crypto.randomBytes(16).toString('base64');
  // const directives = [
  //   "upgrade-insecure-requests",
  //   "default-src 'none'",
  //   "base-uri 'self'",
  //   "connect-src 'self'",
  //   "img-src 'self' data:",
  //   `script-src 'strict-dynamic' 'nonce-${nonce}'`,
  //   `style-src 'nonce-${nonce}'`,
  // "report-uri https://example.com/api/report-csp",
  // "report-to csp-endpoint",
  // ].join("; ");

  // const headerName = import.meta.env.DEV
  // ? "Content-Security-Policy-Report-Only"
  // : "Content-Security-Policy";
  // setResponseHeader(headerName, directives);
  // setResponseHeader("Report-To", 'csp-endpoint="https://example.com/api/report-csp"');

  return next({
    context: {
      nonce,
    },
  });
});

export default nonceMiddleware;
