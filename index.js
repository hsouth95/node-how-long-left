var cfg = require('home-config').load('.howlongleft');
var readline = require('readline');
var moment = require('moment');

// Check the config file - target should be a timestamp (HH:mm)
if(!cfg.target) {
    runSetup(cfg);
} else {
    console.log(howLongLeft(cfg.target,moment()));
}

function runSetup(cfg) {
    const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
    });

    console.log("Welcome to howlongleft");

    rl.question("When is the end of your work day? (HH:mm): ", (answer) => {
        if(isValidTime(answer)) {
            cfg.target = answer;
            cfg.save();
            console.log("Saved! You can now run howlongleft to see how long left in the work day.");
            rl.close();
        } else {
            console.log("Not a valid timestamp, needs to be (HH:MM)");
            rl.close();
        }
    });
}

function isValidTime(time) {
    const timeRegex = /([01]\d|2[0-3]):[0-5]\d/

    return timeRegex.test(time);
}

function howLongLeft(time, currentTime) {
    // We know the format of time (HH:MM) so split it
    time = time.split(":");

    var hours = parseInt(time[0]);
    var minutes = parseInt(time[1]);

    var targetTime = moment();
    targetTime.set({
        hour: hours,
        minute: minutes,
        second: 0
    });
    
    var duration = moment.duration(targetTime.diff(currentTime));

    if(duration.asMinutes() <= 0) {
        return "It's time to go home";
    } else if (duration.asHours() < 1) {
        return `You have ${Math.ceil(duration.asMinutes())} minutes left.`;
    }

    var hoursLeft = Math.floor(duration.asHours());

    // Remove the hours to determine the actual minutes difference
    var minutesLeft = Math.ceil(duration.subtract(hoursLeft, 'h').asMinutes());

    return `You have ${hoursLeft} hours and ${minutesLeft} minutes left.`;
}

module.exports = {
    isValidTime: isValidTime,
    howLongLeft: howLongLeft
}
