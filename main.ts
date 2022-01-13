console.log("Initialising...");

enum NetcodeEvent {
    Connect
}

function sendNetcodeEvent(netcodeArray: number[]) {
    radio.sendBuffer(msgpack.packNumberArray(netcodeArray));
}

// Set the radio group
radio.setGroup(64);

// Register a local player
const localX = Math.randomRange(0, 5);
const localY = Math.randomRange(0, 5);

const localPlayer = game.createSprite(localX, localY);

// Register handlers for input
input.onButtonPressed(Button.A, () => {
    localPlayer.move(-1);
})
input.onButtonPressed(Button.B, () => {
    localPlayer.move(1);
})

input.onButtonPressed(Button.AB, () => {
    if (localPlayer.direction() === 0) {
        localPlayer.setDirection(90);
    } else {
        localPlayer.setDirection(0);
    }
})

// Send position over radio
sendNetcodeEvent([NetcodeEvent.Connect, localPlayer.x(), localPlayer.y()]);

// Remote player setup
radio.onReceivedBuffer((recievedBuffer: Buffer) => {
    const netData = msgpack.unpackNumberArray(recievedBuffer);

    if (netData[0] === NetcodeEvent.Connect) {
        const networkPlayer = game.createSprite(netData[1], netData[2]);

        sendNetcodeEvent([NetcodeEvent.Connect, localPlayer.x(), localPlayer.y()]);
    }
})