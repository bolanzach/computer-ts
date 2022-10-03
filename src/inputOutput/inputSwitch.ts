import { Bit, Charge, Input, Output } from "../circuits/index.ts";
import PowerSource from "../machine.ts";
import { bitToCharge, getId } from "../utils.ts";

export class InputSwitch implements Input, Output {
  id: string;

  private charge: Charge;
  private connections: Input[] = [];

  constructor(powerSource: PowerSource, onOrOffBit: Bit) {
    this.id = getId("input_switch");
    this.charge = bitToCharge(onOrOffBit);
    powerSource.handleConnectToInput(this);
  }

  handleInput(charge: boolean): void {
    if (this.connections.length) {
      this.connections.forEach((input) =>
        input.handleInput(charge && this.charge)
      );
    }
  }

  handleConnectToInput(input: Input): void {
    this.connections.push(input);
  }
}
