import { Charge, Input, Output } from "../circuits/index.ts";
import { chargeToBit, getId } from "../utils.ts";

export class LogGate implements Input {
  id: string;

  private output?: string;
  private lastCharge?: Charge;

  constructor(output = "") {
    this.id = getId("log_gate");
    this.output = output;
  }

  connect(outputConnect: Output) {
    outputConnect.handleConnectToInput(this);
  }

  handleInput(charge: boolean): void {
    if (charge !== this.lastCharge) {
      console.log(`${this.id} | ${this.output} ===> ${chargeToBit(charge)}`);
      this.lastCharge = charge;
    }
  }
}
