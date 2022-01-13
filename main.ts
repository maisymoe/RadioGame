enum NetcodeEventType {
    Connect
}

interface NetcodeJSONObject {
    eventType: NetcodeEventType;
    position: {
        x: number;
        y: number;
    }
}

// Set the radio group
radio.setGroup(45);

// Initialise variables
const existingSprites = [];

// Register a local player
const localX = Math.randomRange(0, 5);
const localY = Math.randomRange(0, 5);

const localPlayer = game.createSprite(localX, localY);
existingSprites.push(localPlayer);

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

// Remote player setup
radio.onReceivedString((recievedString: string) => {
    let netJSON: NetcodeJSONObject;

    // Attempt to parse netcode data as JSON
    try {
        JSON.parse(recievedString);
    } catch(error) {
        console.log("Failed to parse netcode JSON, ignoring")
    }
})