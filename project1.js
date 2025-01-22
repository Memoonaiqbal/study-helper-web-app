// Dark Mode Toggle
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const themeToggle = document.getElementById("themeToggle");
    themeToggle.textContent = document.body.classList.contains("dark-mode")
        ? "Light Mode"
        : "Dark Mode";
});


// To-Do List Functionality
document.getElementById("addTask").addEventListener("click", () => {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                markTaskAsCompleted(li);
            }
        });

        const taskText = document.createElement("span");
        taskText.textContent = taskInput.value;

        li.appendChild(checkbox);
        li.appendChild(taskText);
        taskList.appendChild(li);
        taskInput.value = "";
    }
});

function markTaskAsCompleted(taskItem) {
    const completedTaskList = document.getElementById("completedTaskList");
    const tasksCompleted = document.getElementById("tasksCompleted");

    const taskText = taskItem.querySelector("span");
    taskText.textContent += " [Task Completed]"; // Modify the task name directly

    taskItem.querySelector("input").remove(); // Remove the checkbox
    completedTaskList.appendChild(taskItem); // Move task to completed list
    tasksCompleted.textContent = parseInt(tasksCompleted.textContent) + 1;
}


document.getElementById("resetTimer").addEventListener("click", () => {
    clearInterval(timerInterval);
    timeLeft = 25 * 60; // Reset to default
    document.getElementById("timer").textContent = "25:00";
});

;




// Timer Variables
let timerInterval = null; // Holds the interval ID
let timeLeft = 25 * 60; // Default time in seconds (25 minutes)

// Function to Update Timer Display
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Function to Start the Countdown
function startCountdown() {
    if (!timerInterval) { // Ensure only one timer runs at a time
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                alert("Time's up! Take a break.");
            }
        }, 1000); // Run every second
    }
}

// Event Listener for Start Timer Button
document.getElementById("startTimer").addEventListener("click", () => {
    if (timeLeft > 0) {
        startCountdown();
    } else {
        alert("Please set a valid timer duration first!");
    }
});

// Event Listener for Stop Timer Button
document.getElementById("stopTimer").addEventListener("click", () => {
    clearInterval(timerInterval); // Pause the countdown
    timerInterval = null; // Ensure the timer can be restarted
});

// Event Listener for Set Timer Button
document.getElementById("setTimer").addEventListener("click", () => {
    clearInterval(timerInterval); // Stop the current timer
    timerInterval = null;

    // Get hours and minutes from dropdowns
    const hours = parseInt(document.getElementById("hoursDropdown").value, 10);
    const minutes = parseInt(document.getElementById("minutesDropdown").value, 10);

    // Calculate time in seconds
    timeLeft = (hours * 60 * 60) + (minutes * 60);

    if (timeLeft > 0) {
        updateTimerDisplay(); // Update the timer display immediately
    } else {
        alert("Please select a valid time duration!");
    }
});

// Event Listener for Reset Timer Button
document.getElementById("resetTimer").addEventListener("click", () => {
    clearInterval(timerInterval); // Stop the timer
    timerInterval = null; // Ensure no timer is running
    timeLeft = 25 * 60; // Reset to default (25 minutes)
    updateTimerDisplay(); // Reset the display
});




// Notes Functionality
let lockedNotes = [];
let unlockedNotes = [];
let lockedNotesPassword = "";

// Save as Unlocked Note
document.getElementById("saveUnlockedNote").addEventListener("click", () => {
    const noteContent = document.getElementById("noteArea").value.trim();
    if (noteContent) {
        unlockedNotes.push(noteContent);
        updateNotesDisplay();
        document.getElementById("noteArea").value = "";
    } else {
        alert("Please write a note to save.");
    }
});

// Save as Locked Note
document.getElementById("saveLockedNote").addEventListener("click", () => {
    const noteContent = document.getElementById("noteArea").value.trim();
    if (!noteContent) {
        alert("Please write a note to save.");
        return;
    }

    if (!lockedNotesPassword) {
        lockedNotesPassword = prompt("Set a password for your locked notes:");
        if (!lockedNotesPassword) {
            alert("Password cannot be empty.");
            return;
        }
    }

    lockedNotes.push(noteContent);
    updateNotesDisplay();
    document.getElementById("noteArea").value = "";
});

// View Locked Notes
document.getElementById("viewLockedNotesButton").addEventListener("click", () => {
    const enteredPassword = prompt("Enter the password to view locked notes:");
    if (enteredPassword === lockedNotesPassword) {
        updateNotesDisplay(true);
    } else {
        alert("Incorrect password.");
    }
});

// Delete a Single Note
function deleteSingleNote(noteType, index) {
    if (noteType === "unlocked") {
        unlockedNotes.splice(index, 1);
    } else if (noteType === "locked") {
        lockedNotes.splice(index, 1);
    }
    updateNotesDisplay();
}

// Update Notes Display
function updateNotesDisplay(showLocked = false) {
    const unlockedNotesList = document.getElementById("unlockedNotesList");
    const lockedNotesList = document.getElementById("lockedNotesList");

    // Populate Unlocked Notes
    unlockedNotesList.innerHTML = unlockedNotes
        .map(
            (note, index) =>
                `<li>
                    ${note} 
                    <button class="deleteNoteButton" onclick="deleteSingleNote('unlocked', ${index})">Delete</button>
                </li>`
        )
        .join("");

    // Populate Locked Notes
    lockedNotesList.innerHTML = lockedNotes
        .map(
            (note, index) =>
                `<li>
                    ${showLocked ? note : "******"} 
                    <button class="deleteNoteButton" onclick="deleteSingleNote('locked', ${index})" ${
                    showLocked ? "" : "disabled"
                }>Delete</button>
                </li>`
        )
        .join("");
}
