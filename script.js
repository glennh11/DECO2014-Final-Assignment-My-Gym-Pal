document.addEventListener('DOMContentLoaded', function() {
    loadProfileFromLocalStorage();
    loadProgressFromLocalStorage();

    /* Declaring all relevant variables for the web application, this includes
    the survey-form, and generating the program */
    document.getElementById('survey-form').addEventListener('submit', function(event) {
        event.preventDefault();

        let name = document.getElementById('name').value;
        let age = document.getElementById('age').value;
        let gender = document.getElementById('gender').value;
        let weight = document.getElementById('weight').value;

        let goals = Array.from(document.querySelectorAll('input[name="goals"]:checked')).map(goal => goal.value);
        let days = Array.from(document.querySelectorAll('input[name="days"]:checked')).map(day => day.value);

        let program = generateProgram(days.length, experience);
        displayProfile(name, age, gender, goals, days, weight);
        displayWorkoutNav(days, program);
        displayWorkoutOfDay(program[0]); // Display the first workout of the program by default

        saveProfileToLocalStorage(name, age, gender, goals, days, weight);

        document.getElementById('survey-section').classList.add('hidden');
        document.getElementById('workout-section').classList.remove('hidden');
        document.getElementById('journey-section').classList.remove('hidden');
        document.getElementById('profile-section').classList.remove('hidden');
    });
});