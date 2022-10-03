export type Charge = boolean;

export interface ID {
  id: string;
}

export interface Input extends ID {
  handleInput(charge: Charge): void;
}

export interface Output {
  handleConnectToInput(input: Input): void;
}

export interface MultiOutput<T> {
  handleConnectToInput(input: Input, output: keyof T): void;
}
