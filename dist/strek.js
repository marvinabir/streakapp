"use strict";
const form = document.getElementById("streakForm");
const displayBox = document.getElementById("displayBox");
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const stopDateInput = document.getElementById("stopDate");
    const activityInput = document.getElementById("activity");
    if (stopDateInput.value && activityInput.value) {
        const stopDate = new Date(stopDateInput.value);
        const activity = activityInput.value;
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - stopDate.getTime();
        const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        const streakData = {
            stopDate: stopDate.toISOString().split('T')[0],
            activity: activity,
            days: dayDifference
        };
        await fetch('http://localhost:3000/streaks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(streakData)
        });
        displayHabits();
    }
    else {
        displayBox.innerHTML = `<p>Please fill in all fields.</p>`;
    }
});
async function displayHabits() {
    const response = await fetch('http://localhost:3000/streaks');
    const streaks = await response.json();
    const displayBox = document.getElementById("displayBox");
    displayBox.innerHTML = streaks.map((streak) => `
               <div class="c"> <p><strong>Start/Stop Date:</strong> ${new Date(streak.stopDate).toDateString()}</p>
                <p><strong>Activity:</strong> ${streak.activity}</p>
                <p><strong>Days:</strong> ${streak.days}</p> 
                <div class="t"><button id="f" ><strong>Reset</strong> </button>
                <button id="f" ><strong>Delete</strong> </button></div> <br><hr><br></div>
            `).join('');
}
displayHabits();
