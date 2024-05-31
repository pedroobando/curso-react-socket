const { SerialPort } = require('serialport');

async function sleep(delay) {
  await new Promise((r) => setTimeout(r, delay));
}

async function open() {
  return new Promise((resolve, reject) => {
    const p = new SerialPort(
      {
        path: '/dev/ttyUSB1',
        baudRate: 9600,
      },
      (err) => {
        if (err) return reject(err);
        console.log('opened');
        resolve(p);
      }
    );
  });
}

async function close(port) {
  return new Promise((resolve, reject) => {
    port.close((err) => {
      if (err) return reject(err);
      console.log('closed');
      resolve();
    });
  });
}

async function test() {
  let p = await open();
  p.on('data', (data) => console.log(data.toString()));
  await sleep(5000);
  await close(p);
  p = null;
  await sleep(5000);
}

async function main() {
  try {
    await test();
    await test();
  } catch (e) {
    console.log(e.message);
  }
}

main();
