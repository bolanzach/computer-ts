import { AndGate } from "./src/circuits/andGate.ts";
import { Inverter } from "./src/circuits/inverter.ts";
import PowerSource from "./src/machine.ts";
import { OrGate } from "./src/circuits/orGate.ts";
import { InputSwitch } from "./src/io/inputSwitch.ts";
import { LogGate } from "./src/io/logOutput.ts";
import { NorGate } from "./src/circuits/norGate.ts";
import { NandGate } from "./src/circuits/nandGate.ts";

const powerSource = new PowerSource({ tick: 1000 });

const inverter = new Inverter();
inverter.connect(powerSource);

const nandGate = new NandGate();
nandGate.connect(powerSource, powerSource);

const logger = new LogGate("asdf");
logger.connect(nandGate);
