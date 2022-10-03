import { getId } from "../utils.ts";
import { AndGate } from "./andGate.ts";
import { Input, Output } from "./index.ts";
import { Inverter } from "./inverter.ts";

export class NandGate implements Input, Output {
  id: string;

  private andGate = new AndGate();
  private inverter = new Inverter();

  constructor() {
    this.id = getId("nand_gate");
  }

  connect(connectA: Output, connectB: Output) {
    this.andGate.connect(connectA, connectB);
    this.inverter.connect(this.andGate);
  }

  handleInput(charge: boolean): void {
    // inverter handles this
  }

  handleConnectToInput(connect: Input) {
    this.inverter.handleConnectToInput(connect);
  }
}
