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

const powerSource = new PowerSource({ tick: 100 });

const invertPower = new Inverter();
invertPower.connect(powerSource);

// const halfAdder = new HalfAdder();
// halfAdder.connect(powerSource, invertPower);

const fullAdder = new FullAdder();
fullAdder.connect(invertPower, powerSource, powerSource);

const fullAdder2 = new FullAdder();
fullAdder2.connect(invertPower, invertPower, fullAdder.carryOutput);

const logger4 = new LogGate("Sum--1");
logger4.connect(fullAdder.sumOutput);
const logger3 = new LogGate("Carry--1");
logger3.connect(fullAdder.carryOutput);

const logger = new LogGate("     Sum");
logger.connect(fullAdder2.sumOutput);

const logger2 = new LogGate("    Carry");
logger2.connect(fullAdder2.carryOutput);
