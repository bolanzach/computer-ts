import { AndGate } from "./src/circuits/andGate.ts";
import { Inverter } from "./src/circuits/inverter.ts";
import PowerSource from "./src/machine.ts";
import { OrGate } from "./src/circuits/orGate.ts";
import { InputSwitch } from "./src/inputOutput/inputSwitch.ts";
import { LogGate } from "./src/inputOutput/logOutput.ts";
import { NorGate } from "./src/circuits/norGate.ts";
import { NandGate } from "./src/circuits/nandGate.ts";
import { HalfAdder } from "./src/circuits/adders/halfAdder.ts";
import { FullAdder } from "./src/circuits/adders/fullAdder.ts";

const powerSource = new PowerSource({ tick: 1000 });

const halfAdder = new HalfAdder();
halfAdder.connect(powerSource, powerSource);

const fullAdder = new FullAdder();
fullAdder.connect(powerSource, powerSource, halfAdder.carryOutput);

const logger = new LogGate("Sum");
logger.connect(fullAdder.sumOutput);

const logger2 = new LogGate("Carry");
logger2.connect(fullAdder.carryOutput);
