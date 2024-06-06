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
        let program = generateProgram(days.length, experience);
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

// This function will generate the program based on the survey and how many days are available
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

function displayProfile(name, age, gender, goals, days, weight) {
    document.getElementById('profile-name').textContent = `Name: ${name}`;
    document.getElementById('profile-age').textContent = `Age: ${age}`;
    document.getElementById('profile-gender').textContent = `Gender: ${gender}`;
    document.getElementById('profile-goals').textContent = `Fitness Goals: ${goals.join(', ')}`;
    document.getElementById('profile-days').textContent = `Available Days: ${days.join(', ')}`;
    document.getElementById('profile-weight').textContent = `Body Weight: ${weight}`;
}





