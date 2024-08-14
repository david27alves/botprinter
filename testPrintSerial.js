import { Printer } from "@node-escpos/core";
import Serial from "@node-escpos/serialport-adapter";


const options = { // In Windows I was put "COM4"
  baudRate: 115200,
  stopBit: 1,
}

const device = new Serial("COM3", options);



const printer = new Printer(device, {encoding: "utf-8"});

device.open((error) => {
  if (error) {
    console.error(error);
    return;
  }

  let printer = new Printer(device, {});

  printer
    .font("a")
    .align("ct")
    .style("bu")
    .size(1, 1)
    .text("The quick brown fox jumps over the lazy dog");

  printer.cut().close();
});