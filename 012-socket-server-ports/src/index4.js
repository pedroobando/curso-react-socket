const { SerialPort } = 'serialport';

async function main() {
  console.time();

  let serialPort = new SerialPort({
    path: '/dev/ttyS0',
    baudRate: 9600,
    autoOpen: false,
  });

  serialPort.on('data', (data) => {
    console.log('Data received: ' + data);
  });

  try {
    for (let i = 0; i < 3; i++) {
      //OPEN
      console.timeLog('default', 'open');
      await new Promise((resolve, reject) => {
        if (!serialPort.isOpen)
          serialPort.open((err) => {
            if (err) return reject(err);
            console.timeLog('default', 'serialPort opened');
            return resolve();
          });
      });

      await new Promise((resolve) => setTimeout(() => resolve(), 200));

      //WRITE
      console.timeLog('default', 'write');
      await new Promise((resolve, reject) => {
        if (serialPort.isOpen)
          serialPort.write('0010000202=?097\r', (err) => {
            if (err) return reject(err);
            console.timeLog('default', 'serialPort written');
            return resolve();
          });
      });

      await new Promise((resolve) => setTimeout(() => resolve(), 200));

      //CLOSE
      console.timeLog('default', 'close');
      await new Promise((resolve, reject) => {
        if (serialPort.isOpen)
          serialPort.close((err) => {
            if (err) return reject(err);
            console.timeLog('default', 'serialPort closed');
            return resolve();
          });
      });

      await new Promise((resolve) => setTimeout(() => resolve(), 200));
    }
  } catch (err) {
    console.error(err);

    // end the process
    process.exit(1);
  }
}

await main();
