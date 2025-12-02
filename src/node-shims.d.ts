declare module 'path' {
  export function join(...paths: string[]): string;
  export function basename(p: string, ext?: string): string;
  export function dirname(p: string): string;
  export function extname(p: string): string;
}

declare module 'child_process' {
  export interface ExecFileOptionsWithStringEncoding {
    cwd?: string;
    encoding?: string | null;
  }
  export interface ExecFileException extends Error {
    code?: string | number;
    killed?: boolean;
    signal?: NodeJS.Signals;
  }
  export interface ExecFileReturn {
    stdout: string;
    stderr: string;
  }
  export function execFile(
    file: string,
    args?: readonly string[] | null,
    options?: ExecFileOptionsWithStringEncoding | null,
    callback?: (error: ExecFileException | null, stdout: string, stderr: string) => void,
  ): any;
}

declare module 'fs/promises' {
  export interface MakeDirectoryOptions {
    recursive?: boolean;
  }
  export function mkdir(path: string, options?: MakeDirectoryOptions): Promise<void>;
  export function writeFile(path: string, data: string): Promise<void>;
}

declare module 'util' {
  export function promisify(original: any): any;
}

declare namespace NodeJS {
  type Signals =
    | 'SIGABRT'
    | 'SIGALRM'
    | 'SIGBUS'
    | 'SIGCHLD'
    | 'SIGCLD'
    | 'SIGCONT'
    | 'SIGFPE'
    | 'SIGHUP'
    | 'SIGILL'
    | 'SIGINT'
    | 'SIGIO'
    | 'SIGIOT'
    | 'SIGKILL'
    | 'SIGPIPE'
    | 'SIGPOLL'
    | 'SIGPROF'
    | 'SIGPWR'
    | 'SIGQUIT'
    | 'SIGSEGV'
    | 'SIGSTKFLT'
    | 'SIGSTOP'
    | 'SIGSYS'
    | 'SIGTERM'
    | 'SIGTRAP'
    | 'SIGTSTP'
    | 'SIGTTIN'
    | 'SIGTTOU'
    | 'SIGUNUSED'
    | 'SIGURG'
    | 'SIGUSR1'
    | 'SIGUSR2'
    | 'SIGVTALRM'
    | 'SIGWINCH'
    | 'SIGXCPU'
    | 'SIGXFSZ';
}

declare const process: {
  cwd(): string;
};
