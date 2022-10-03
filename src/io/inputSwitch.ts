import { Charge, Input, Output } from "../circuits/index.ts";
import PowerSource from "../machine.ts";
import { getId } from "../utils.ts";

export class InputSwitch implements Input, Output {
  id: string;

  private charge: Charge;
  private connectedInput?: Input;

  constructor(powerSource: PowerSource, charge: Charge) {
    this.id = getId("input_switch");
    this.charge = charge;
    powerSource.handleConnectToInput(this);
  }

  handleInput(charge: boolean): void {
    if (this.connectedInput) {
      this.connectedInput.handleInput(charge && this.charge);
    }
  }

  handleConnectToInput(input: Input): void {
    this.connectedInput = input;
  }
}
