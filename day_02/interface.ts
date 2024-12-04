export interface INodeSystemError extends Error {
    // https://nodejs.org/api/errors.html#class-systemerror node error interface
    code: string;
    errno?: number;
    syscall?: string;
    path?: string;
    address?: string;
    port?: number;
}