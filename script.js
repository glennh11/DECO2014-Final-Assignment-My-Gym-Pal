document.addEventListener('DOMContentLoaded', function() {
    loadProfileFromLocalStorage();
    loadProgressFromLocalStorage();

    /* Declaring all relevant variables for the survey section and creating an eventListener
    for when the user submits the survey */
    document.getElementById('survey-form').addEventListener('submit', function(event) {
        event.preventDefault();

        let name = document.getElementById('name').value;
        let age = document.getElementById('age').value;
        let gender = document.getElementById('gender').value;
        let weight = document.getElementById('weight').value;

        let goals = Array.from(document.querySelectorAll('input[name="goals"]:checked')).map(goal => goal.value);
        let days = Array.from(document.querySelectorAll('input[name="days"]:checked')).map(day => day.value);

        /* Display the first workout of the program by default and generate the program 
        furthermore displaying survey results in user profile and displaying the workout 
        navigation as to which days the user is available */
        let program = generateProgram(days.length);
        displayProfile(name, age, gender, goals, days, weight);
        displayWorkoutNav(days, program);
        displayWorkoutOfDay(program[0]); 

        //saving profile to localStorage for Data persistence
        saveProfileToLocalStorage(name, age, gender, goals, days, weight);
        
        // The initial survey form will disappear when the eventListener is called upon
        document.getElementById('survey-section').classList.add('hidden');
        document.getElementById('workout-section').classList.remove('hidden');
        document.getElementById('journey-section').classList.remove('hidden');
        document.getElementById('profile-section').classList.remove('hidden');
    });
});

/* This function will generate the program based on the survey and how many days are available
if and else if functions are used here in response to the days that the user selects */
function generateProgram(days) {
    let program = [];

    if (days >= 6) {
        program = [
            { day: "Push", exercises: ["Barbell Bench Press", "Dumbbell Incline Bench Press", "Military Press", "Dumbbell Arnold Press", "Tricep Dips", "Tricep Push Downs", "Sit Ups"] },
            { day: "Pull", exercises: ["Pull-Ups", "Deadlifts", "Seated Cable rows", "Bicep Curls", "Hammer Curls"] },
            { day: "Legs", exercises: ["Squats", "Leg Press", "Lunges", "Hamstring Curls", "Leg Extensions"] },
            { day: "Push", exercises: ["Incline Bench Press", "Machine Chest Fly", "Dumbbell Shoulder Press", "Lateral Raises", "Tricep Extensions", "Skull Crushers"] },
            { day: "Pull", exercises: ["Barbell Rows", "Lat Pulldowns", "Machine low rows", "Ez Bar Curls", "Hammer Curls"] },
            { day: "Legs", exercises: ["Deadlifts", "Bulgarian Split Squat", "Ha Curls", "Calf Raises"] }
        ];
    } else if (days == 5) {
        program = [
            { day: "Chest/Tris", exercises: ["Bench Press", "Dumbbell Incline Press", "Tricep Dips", "Chest Flyes", "Tricep Extensions"] },
            { day: "Back/Bis", exercises: ["Pull-Ups", "Cable pull downs", "Barbell Rows", "Bicep Curls", "Cable Hammer Curls"] },
            { day: "Legs", exercises: ["Squats", "Leg Press", "Lunges", "Romanian Deadlift"] },
            { day: "Shoulders", exercises: ["Shoulder Press", "Lateral Raises", "Front Raises", "Rear-delt Raises"] },
            { day: "Core/Cardio", exercises: ["Planks with up and down movement", "Crunches", "Mountain Climbers", "Roll outs"] }
        ];
    } else if (days == 4) {
        program = [
            { day: "Upper", exercises: ["Bench Press", "Pull-Ups", "Rows", "Shoulder Press", "Dumbbell Flyes"] },
            { day: "Lower", exercises: ["Squats", "Deadlifts", "Lunges", "Hamstring Curls"] },
            { day: "Upper", exercises: ["Incline Bench Press", "Lat Pulldowns", "Bicep Curls", "Tricep Extensions"] },
            { day: "Lower", exercises: ["Leg Press", "Calf Raises", "Leg Extensions", "Hamstring Curls"] }
        ];
    } else if (days == 3) {
        program = [
            { day: "Full Body", exercises: ["Squats", "Bench Press", "Rows", "Overhead Press"] },
            { day: "Full Body", exercises: ["Deadlifts", "Pull-Ups", "Lunges", "Bicep Curls"] },
            { day: "Full Body", exercises: ["Leg Press", "Incline Bench Press", "Lat Pulldowns", "Tricep Extensions"] }
        ];
    } else if (days == 2) {
        program = [
            { day: "Full Body (Day 1)", exercises: ["Squats", "Bench Press", "Rows", "Overhead Press", "Tricep pushdown"] },
            { day: "Full Body (Day 2)", exercises: ["Deadlifts", "Pull-Ups", "Lunges", "Bicep Curls"] }
        ];
    }

    return program;
}

//Function to display the profile and update it after the user completes the survey
function displayProfile(name, age, gender, goals, days, weight) {
    document.getElementById('profile-name').textContent = `Name: ${name}`;
    document.getElementById('profile-age').textContent = `Age: ${age}`;
    document.getElementById('profile-gender').textContent = `Gender: ${gender}`;
    document.getElementById('profile-goals').textContent = `Fitness Goals: ${goals.join(', ')}`;
    document.getElementById('profile-days').textContent = `Available Days: ${days.join(', ')}`;
    document.getElementById('profile-weight').textContent = `Body Weight: ${weight}`;
}

// This is to display the workout navigation bar which includes the days of which the user is exercising
function displayWorkoutNav(days, program) {
    let navBar = document.getElementById('workout-nav');
    navBar.innerHTML = '';

    days.forEach((day, index) => {
        let dayButton = document.createElement('button');
        dayButton.innerText = day;
        dayButton.classList.add('day-button');
        dayButton.dataset.index = index;

        // eventListener to display the workout for the day
        dayButton.addEventListener('click', () => {
            displayWorkoutOfDay(program[index]);
            document.querySelectorAll('.day-button').forEach(btn => btn.classList.remove('active'));
            dayButton.classList.add('active');
        });

        navBar.appendChild(dayButton);
    });
}

function displayWorkoutOfDay(workout) {
    let workoutSection = document.getElementById('workout-section');
    document.getElementById('workout-day-title').textContent = `Workout for ${workout.day}`;

    let workoutList = document.getElementById('workout-list');
    workoutList.innerHTML = '';

    workout.exercises.forEach(exercise => {
        let template = document.getElementById('exercise-template').content.cloneNode(true);
        template.querySelector('.exercise-button').textContent = exercise;
        template.querySelector('.exercise-button').dataset.exercise = exercise;
        template.querySelector('.exercise-details').id = `details-${exercise}`;
        template.querySelector('.log-button').dataset.log = exercise;

        // Attach the showExerciseDetails event listener
        template.querySelector('.exercise-button').addEventListener('click', function() {
            showExerciseDetails(exercise);
        });

        //Using a forLoop to create dynamic content and simplify the code
        let rows = template.querySelector('.exercise-rows');
        for (let i = 1; i <= 3; i++) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${i}</td>
                <td><input type="number" class="weight-input" id="weight-set${i}-${exercise}"></td>
                <td>8</td>
            `;
            rows.appendChild(row);
        }

        template.querySelector('.log-button').addEventListener('click', function(event) {
            logExercise(exercise, `weight-set1-${exercise}`, `weight-set2-${exercise}`, `weight-set3-${exercise}`);
        });

        workoutList.appendChild(template);
    });

    workoutSection.classList.remove('hidden');
}


// function to show the exercise details within the table
function showExerciseDetails(exercise) {
    document.getElementById(`details-${exercise}`).classList.toggle('hidden');
}

//updating the progress to the local storage 
let progress = JSON.parse(localStorage.getItem('progress')) || {};

//logging the exercises per set, maximum 3 sets per exercise
function logExercise(exercise, set1Id, set2Id, set3Id) {
    let set1Weight = document.getElementById(set1Id).value;
    let set2Weight = document.getElementById(set2Id).value;
    let set3Weight = document.getElementById(set3Id).value;

    //using an if statement to constantly update the users personal record, and update their journey
    let maxWeight = Math.max(set1Weight, set2Weight, set3Weight);
    if (!progress[exercise] || progress[exercise] < maxWeight) {
        progress[exercise] = maxWeight;
    }

    //updating the journey section to demonstrate user progression and to store data here
    updateJourneySection();

    let logEntry = `Exercise: ${exercise}, Set 1: ${set1Weight} kg, Set 2: ${set2Weight} kg, Set 3: ${set3Weight} kg`;
    let progressDisplay = document.getElementById('progress-display');
    let entry = document.createElement('p');
    entry.innerText = logEntry;
    progressDisplay.appendChild(entry);

    localStorage.setItem('progress', JSON.stringify(progress));
}

//calling the updateJourneySection
function updateJourneySection() {
    let progressDisplay = document.getElementById('progress-display');
    progressDisplay.innerHTML = ''; // Clear previous entries

    for (let [exercise, weight] of Object.entries(progress)) {
        let entry = document.createElement('p');
        entry.innerText = `Exercise: ${exercise}, Max Weight: ${weight} kg`;
        progressDisplay.appendChild(entry);
    }
}

//Local storage to store and load user data implemented here 
function saveProfileToLocalStorage(name, age, gender, goals, days, weight) {
    let profile = { name, age, gender, goals, days, weight };
    localStorage.setItem('profile', JSON.stringify(profile));
}

function loadProfileFromLocalStorage() {
    let profile = JSON.parse(localStorage.getItem('profile'));
    if (profile) {
        displayProfile(profile.name, profile.age, profile.gender, profile.goals, profile.days, profile.weight);
        document.getElementById('survey-section').classList.add('hidden');
        document.getElementById('profile-section').classList.remove('hidden');
        document.getElementById('workout-section').classList.remove('hidden');
        document.getElementById('journey-section').classList.remove('hidden');
        const program = generateProgram(profile.days.length, "beginner");
        displayWorkoutNav(profile.days, program);
    }
}

function loadProgressFromLocalStorage() {
    let savedProgress = JSON.parse(localStorage.getItem('progress'));
    if (savedProgress) {
        Object.assign(progress, savedProgress);
        updateJourneySection();
    }
}
