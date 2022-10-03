import { Input, Output } from "../circuits/index.ts";
import { getId } from "../utils.ts";

export class LogGate implements Input {
  id: string;

  private output: string;

  constructor(output: string) {
    this.id = getId("log_gate");
    this.output = output;
  }

  connect(outputConnect: Output) {
    outputConnect.handleConnectToInput(this);
  }

  handleInput(charge: boolean): void {
    console.log(`${this.id} | charge: ${charge} | ${this.output}`);
  }
}
