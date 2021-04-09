// This function is called when the request is successful.
// The object it takes in is a response argument to retrieve specified data from the server.
// Axios will convert JSON into a JS object when needed. Woot woot!!!
function getActivitySuccess(res) {
    let randomActivities = res.data;
    let randomContainer = document.getElementById("randomContainer");
    let activity = randomActivities.activity;
    
    randomContainer.innerHTML += `<h1>${activity}</h1>`;
}
// This function is called when the request fails.
// A message will be displayed to the user if something goes wrong.
function getActivityFailure(err) {
    document.getElementById("randomContainer").innerHTML = "<p>Sorry for the error. Something went wrong</p>";
}

function getUserBasedSuccess(res) {
    let userBasedActivities = res.data;
    let userContainer = document.getElementById("userBasedContainer");
    let activity = userBasedActivities.activity;
    let participants = userBasedActivities.participants;

    userContainer.innerHTML += `<h1>${participants} - ${activity}<h2>`;
}

function getUserBasedFailure(err) {
    document.getElementById("userBasedContainer").innerHTML = "<p>Sorry for the error. Something went wrong</p>";
}
// This function is used alongside an addEventListener and generates the random activity.
function getRandomActivity(eventDetails) {
    // This is a get request with the specified api url to retrieve the data.
    // The success and failure functions are called upon using the promise based syntax.
    axios.request({
        method: "GET",
        url: "http://www.boredapi.com/api/activity/"
    }).then(getActivitySuccess).catch(getActivityFailure);
}
// This function is used alongside an addEventListener and generates an activity specific to the number of people chosen.
function getUserActivity(eventDetails) {
    let optionsElement = document.getElementById("options");
    axios.request({
        method: "GET",
        url: "http://www.boredapi.com/api/activity/",
        
        params: {
            participants: optionsElement.value
        }
    
    }).then( getUserBasedSuccess).catch(getUserBasedFailure);
}

let randomActivity = document.getElementById("randomizerButton");
randomActivity.addEventListener('click', getRandomActivity);

let userActivity = document.getElementById("userActivityButton");
userActivity.addEventListener('click', getUserActivity);

