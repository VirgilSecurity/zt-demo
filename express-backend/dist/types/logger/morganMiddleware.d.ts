/// <reference types="node" />
declare const morganMiddleware: (req: import("http").IncomingMessage, res: import("http").ServerResponse<import("http").IncomingMessage>, callback: (err?: Error | undefined) => void) => void;
export default morganMiddleware;
