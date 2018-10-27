var cfg = require('home-config').load('.howlongleft');
var readline = require('readline');

if(!cfg.target) {
    runSetup(cfg);
} else {
    console.log(howLongLeft(cfg.target, new Date()));
}


function runSetup(cfg) {
    const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
    });

    console.log("Welcome to howlongleft");

    rl.question("When is the end of your work day? (HH:MM): ", (answer) => {
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

function howLongLeft(time, date) {
    var message = "";

    // We know the format of time (HH:MM) so lets just split it
    time = time.split(":");
    var hours = parseInt(time[0]);
    var minutes = parseInt(time[1]);

    var hoursLeft = hours - date.getHours();
    var minutesLeft = minutes - date.getMinutes();

    if (hoursLeft <= 0 && minutesLeft <= 0) {
        return "It's time to go home!";
    } else if (hoursLeft < 0 && minutesLeft > 0) {
        return "You've got " + minutesLeft + " minutes left.";
    } else if (hoursLeft == 1) {
        var totalMinutes = 60 - date.getMinutes();
        totalMinutes = totalMinutes + parseInt(minutes);

        return "You've got " + totalMinutes + " minutes left.";
    } else {
        return "You've got " + hoursLeft + " hours and " + minutes + " minutes.";
    }
}

module.exports = {
    isValidTime: isValidTime,
    howLongLeft: howLongLeft
}
