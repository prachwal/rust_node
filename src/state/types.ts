
export interface ErrorObject { 
  message: string;
  Error?: Error;
}

export interface Process {
  pid: string;
  command: string;
}

export interface ListeningPort {
  protocol: string;
  localAddress: string;
  state: string;
}

export interface ProcessDetails {
  pid: string;
  ppid: string;
  command: string;
  cpu: string;
  memory: string;
  elapsedTime: string;
}