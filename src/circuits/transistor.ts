import { ElectriSignal } from "../machine.ts";
import { getId } from "../utils.ts";
import { Charge, Input, Output } from "./index.ts";

export interface Transistor extends Input, Output {
  isCharged: Charge;

  connect(inConnect: Output, outConnect: Input): void;
}

export class BasicTransistor implements Transistor {
  id: string;
  isCharged = false;

  private outConnects: Input[] = [];

  constructor() {
    this.id = getId("transistor");
  }

  connect(inConnect: Output, outConnect: Input) {
    this.handleConnectToInput(outConnect);
    inConnect.handleConnectToInput(this);
  }

  handleInput(charge: Charge): void {
    this.isCharged = charge;
    this.outConnects.forEach((input) =>
      ElectriSignal.sendElectricSignal(input, charge)
    );
  }

  handleConnectToInput(input: Input): void {
    this.outConnects.push(input);
  }
}
