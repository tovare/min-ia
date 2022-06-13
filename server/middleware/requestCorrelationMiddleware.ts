// import { Request } from "express";
// import { randomUUID } from "crypto";
// import morgan from "morgan";
//
// export const requestCorrelationMiddleware = () => {
//   return [correlationIdMiddleware, requestLoggingMiddleware];
// };
//
// const correlationIdMiddleware = (req: Request, res, next) => {
//   if (noCorrelationIdHeaderExists(req)) {
//     addCorrelationIdHeader(req);
//   }
//   next();
// };
//
// const requestLoggingMiddleware = morgan(
//   (tokens, req, res) => {
//     return JSON.stringify({
//       level: "info",
//       message: writeRequestLogMessage(tokens, req, res),
//       correlationId: getCorrelationIdHeader(req),
//     });
//   },
//   { skip: skipAllInternalRequests }
// );
//
// function writeRequestLogMessage(tokens, req, res) {
//   return [
//     tokens.method(req, res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//     "(length " + tokens.res(req, res, "content-length") + ")",
//     "-" + tokens["response-time"](req, res) + "ms",
//   ].join(" ");
// }
//
// const getCorrelationIdHeader = (req: Request) => {
//   return req.headers["X-Correlation-ID"];
// };
//
// const addCorrelationIdHeader = (req: Request) => {
//   req.headers["X-Correlation-ID"] = randomUUID();
// };
//
// const noCorrelationIdHeaderExists = (req): boolean => {
//   return getCorrelationIdHeader(req) === undefined;
// };
//
// function skipAllInternalRequests(req: Request) {
//   return req.originalUrl?.includes("/internal/");
// }
