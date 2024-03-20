    let startTime, elapsedTime = 0, timerInterval;
    let lapCounter = 1;

    function startStop() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        } else {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(updateTimer, 10); // Update every 10 milliseconds for accuracy
        }
    }

    function updateTimer() {
        const currentTime = Date.now();
        elapsedTime = currentTime - startTime;
        displayTime(elapsedTime);
    }

    function displayTime(time) {
        const hours = Math.floor(time / 3600000);
        const minutes = Math.floor((time % 3600000) / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10); // Get milliseconds (tenths of a second)
        document.getElementById("timer").textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
    }

    function reset() {
        clearInterval(timerInterval);
        timerInterval = null;
        elapsedTime = 0;
        lapCounter = 1;
        document.getElementById("timer").textContent = "00:00:00.00";
        document.getElementById("lapTimes").innerHTML = "";
    }

    function pad(num) {
        return num.toString().padStart(2, "0");
    }

    function recordLap() {
        const currentTime = Date.now();
        const lapTime = currentTime - startTime;
        const formattedTime = formatTime(lapTime);
        const lapRecord = `<p>Lap ${lapCounter}: ${formattedTime}</p>`;
        document.getElementById("lapTimes").insertAdjacentHTML("beforeend", lapRecord);
        lapCounter++;
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);
        return `${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
    }

    // Social Sharing
    function shareResults() {
        const formattedTime = document.getElementById("timer").textContent;
        const shareMessage = `I just recorded a time of ${formattedTime} using the Unique Stopwatch web app! Check it out!`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`, "_blank");
    }
    

    // Keyboard Control
    document.addEventListener("keyup", function(event) {
        if (event.key === " ") { // Spacebar for Start/Stop
            startStop();
        } else if (event.key === "r") { // 'r' key for Reset
            reset();
        } else if (event.key === "l") { // 'l' key for Lap
            recordLap();
        }
    });
