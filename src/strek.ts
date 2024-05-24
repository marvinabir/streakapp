
    const form = document.getElementById("streakForm") as HTMLFormElement;
    const displayBox = document.getElementById("displayBox") as HTMLDivElement;
  
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
  
        const stopDateInput = document.getElementById("stopDate") as HTMLInputElement;
        const activityInput = document.getElementById("activity") as HTMLSelectElement;
  
        if (stopDateInput.value && activityInput.value) {
            const stopDate = new Date(stopDateInput.value);
            const activity = activityInput.value;
            const currentDate = new Date();
  
            const timeDifference =  currentDate.getTime()-stopDate.getTime() ;
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
        } else {
            displayBox.innerHTML = `<p>Please fill in all fields.</p>`;
        }
    });
  
  
async function displayHabits () {

      
      
      const response = await fetch('http://localhost:3000/streaks');
      const streaks = await response.json();
      
      
    const displayBox = document.getElementById("displayBox") as HTMLDivElement;
      displayBox.innerHTML = streaks.map((streak: { stopDate:  Date; activity: any; days: any; }) => `
               <div class="c"> <p><strong>Start/Stop Date:</strong> ${new Date(streak.stopDate).toDateString()}</p>
                <p><strong>Activity:</strong> ${streak.activity}</p>
                <p><strong>Days:</strong> ${streak.days}</p> 
                <div class="t"><button id="f" ><strong>Reset</strong> </button>
                <button id="f" ><strong>Delete</strong> </button></div> <br><hr><br></div>
            `).join('');
    }
    displayHabits();    