import { Charge, Input, Output } from "./circuits/index.ts";

export interface Options {
  tick?: number;
  logComponents?: boolean;
}

export default class PowerSource implements Output {
  private isOn = false;
  private tick: number;

  private connectedInputs: Record<string, [Input, Charge]> = {};

  constructor(options: Options = {}) {
    const { tick = 1, logComponents = false } = options;
    this.tick = tick;

    this.isOn = true;
    this.run();
  }

  run() {
    setInterval(() => {
      if (this.isOn) {
        console.log(".");
        if (!Object.keys(ElectriSignal.masterInputs).length) {
          ElectriSignal.masterInputs = this.connectedInputs;
          ElectriSignal.resetElectricSignal();
        }

        const stuff = { ...ElectriSignal.masterInputs };
        ElectriSignal.masterInputs = {};

        Object.keys(stuff).forEach((key) => {
          const [input, charge] = stuff[key];
          input.handleInput(charge);
        });
      }
    }, this.tick);
  }

  handleConnectToInput(input: Input) {
    this.connectedInputs[input.id] = [input, true];
  }
}

export class ElectriSignal {
  static seenIds: Record<string, boolean> = {};
  static masterInputs: Record<string, [Input, Charge]> = {};

  static sendElectricSignal(input: Input, charge: Charge) {
    if (!this.seenIds[input.id]) {
      this.masterInputs[input.id] = [input, charge];
      this.seenIds[input.id] = true;
    }
  }

  static resetElectricSignal() {
    this.seenIds = {};
  }
}
