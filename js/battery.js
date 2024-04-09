/* Variables */
// STEP 1a: Grab the first <dd> element for displaying the battery charging status
const chargeStatus = document.querySelector('#battery dd:nth-of-type(1)');
// STEP 1b: Grab the <output> element inside the second <dd> element for displaying the battery charge level
const chargeLevel = document.querySelector('#battery dd:nth-of-type(2) output');
// STEP 1c: Grab the <progress> element inside the second <dd> element for a more graphical representation of the battery's state of charge (SOC)
const chargeMeter = document.querySelector('#battery dd:nth-of-type(2) progress');

/* Functions
-------------------------------------------------- */
// STEP 3a: Create the updateBatteryStatus() function
function updateBatteryStatus(battery) {
    if (battery.charging === true) {
        chargeStatus.textContent = "Charging...";
    } else {
        chargeStatus.textContent = "Discharging...";
    }
        // STEP 3c: Update the charge level
    chargeLevel.textContent = (battery.level * 100) + "%";
    chargeMeter.value = (battery.level * 100);

    // Fetching image from Robohash API based on battery percentage
    const batteryPercentage = Math.round(battery.level * 100);
    const robohashUrl = `https://robohash.org/${batteryPercentage}.png`; // or https://robohash.org/${batteryPercentage}percent.png
    const image = new Image();
    image.src = robohashUrl;
    document.body.appendChild(image); // Appending the image 
}

navigator.getBattery().then(battery => {
    updateBatteryStatus(battery);

    battery.addEventListener("chargingchange", () => {
        updateBatteryStatus(battery);
    })

    battery.addEventListener("levelchange", () => {
        updateBatteryStatus(battery);
    })
})

/* This script adapted from the excellent code examples found at https://www.w3.org/TR/battery-status/#examples and https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API */
