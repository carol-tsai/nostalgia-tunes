//const req = require("express/lib/request");


// define variables
var nativePicker = document.querySelector(".nativeDatePicker");
// var fallbackPicker = document.querySelector(".fallbackDatePicker");
// var fallbackLabel = document.querySelector(".fallbackLabel");

var yearSelect = document.querySelector("#year");
var monthSelect = document.querySelector("#month");
var daySelect = document.querySelector("#musicDay");
let addPlaylistEl = document.querySelector('#addPlaylistBtn');
var playlistNameEl = document.querySelector("#playlistName");

// hide fallback initially
// fallbackPicker.style.display = "none";
// fallbackLabel.style.display = "none";

// test whether a new date input falls back to a text input or not
var test = document.createElement("input");

try {
  test.type = "date";
} catch (e) {
  console.log(e.message);
}

// if it does, run the code inside the if() {} block
if (test.type === "text") {
  // hide the native picker and show the fallback
  nativePicker.style.display = "none";
  // fallbackPicker.style.display = "block";
  // fallbackLabel.style.display = "block";

  // populate the days and years dynamically
  // (the months are always the same, therefore hardcoded)
  populateDays(monthSelect.value);
  populateYears();
}

function populateDays(month) {
  // delete the current set of <option> elements out of the
  // day <select>, ready for the next set to be injected
  while (daySelect.firstChild) {
    daySelect.removeChild(daySelect.firstChild);
  }

  // Create variable to hold new number of days to inject
  var dayNum;

  // 31 or 30 days?
  if (
    (month === "January") |
    (month === "March") |
    (month === "May") |
    (month === "July") |
    (month === "August") |
    (month === "October") |
    (month === "December")
  ) {
    dayNum = 31;
  } else if (
    (month === "April") |
    (month === "June") |
    (month === "September") |
    (month === "November")
  ) {
    dayNum = 30;
  } else {
    // If month is February, calculate whether it is a leap year or not
    var year = yearSelect.value;
    var isLeap = new Date(year, 1, 29).getMonth() == 1;
    dayNum = isLeap ? 29 : 28;
  }

  // inject the right number of new <option> elements into the day <select>
  for (i = 1; i <= dayNum; i++) {
    var option = document.createElement("option");
    option.textContent = i;
    daySelect.appendChild(option);
  }

  // if previous day has already been set, set daySelect's value
  // to that day, to avoid the day jumping back to 1 when you
  // change the year
  if (previousDay) {
    daySelect.value = previousDay;

    // If the previous day was set to a high number, say 31, and then
    // you chose a month with less total days in it (e.g. February),
    // this part of the code ensures that the highest day available
    // is selected, rather than showing a blank daySelect
    if (daySelect.value === "") {
      daySelect.value = previousDay - 1;
    }

    if (daySelect.value === "") {
      daySelect.value = previousDay - 2;
    }

    if (daySelect.value === "") {
      daySelect.value = previousDay - 3;
    }
  }
}

// function populateYears() {
//   // get this year as a number
//   var date = new Date();
//   var year = date.getFullYear();

//   // Make this year, and the 100 years before it available in the year <select>
//   for (var i = 0; i <= 100; i++) {
//     var option = document.createElement("option");
//     option.textContent = year - i;
//     yearSelect.appendChild(option);
//   }
// }

// // when the month or year <select> values are changed, rerun populateDays()
// // in case the change affected the number of available days
// yearSelect.onchange = function () {
//   populateDays(monthSelect.value);
// };

// monthSelect.onchange = function () {
//   populateDays(monthSelect.value);
// };

// //preserve day selection
// var previousDay;

// // update what day has been set to previously
// // see end of populateDays() for usage
// daySelect.onchange = function () {
//   previousDay = daySelect.value;
// };

var submit = document.querySelector("#submitbutton");
submit.addEventListener("click", getBillboard);

async function getBillboard(event) {
  event.preventDefault();
  console.log("click");
  var day = daySelect.value;

  const response = await fetch("/api/song/billboard", {
    method: "POST",
    body: JSON.stringify({ day }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const chartData = await response.json();
<<<<<<< HEAD
=======
  

<<<<<<< HEAD
  // console.log(day);
=======
>>>>>>> origin/main
  renderSongs(chartData);
    
>>>>>>> b25928e3ced600723ab201c56d2ec0b689d2771c
}


<<<<<<< HEAD
var songs = document.querySelector("#songs");

for (i = 0; i <= 20; i++) {
  var test = document.createElement("div");
  test.textContent = "SONG";
  songs.append(test);
}
=======


function renderSongs(chart){

  var songs = document.querySelector("#songs")
  songs.innerHTML = "";
  console.log(chart);
  for (i = 0; i < chart.length; i++){
    var test = document.createElement("div");
    var saveButton = document.createElement("button");
    saveButton.setAttribute("id",`${chart[i].rank}`)
    test.textContent = `${chart[i].title}  by: ${chart[i].artist}    `;
    songs.append(test);
    saveButton.textContent = "Save song to playlist"
    test.append(saveButton);
    document.getElementById(`${chart[i].rank}`).addEventListener("click", handleSave)

  }
}

async function handleSave(event){
  var checkPlaylist = await fetch("/api/playlist", {
    method: "GET"

  })

  console.log(checkPlaylist)
  if(checkPlaylist.status == 404){
    var createPlaylist = await fetch("/api/playlist", {
      method: "POST",
      body: JSON.stringify({name: "newPlaylist",user_id: "1"}),
      
    })
  if(checkPlaylist.ok){
    console.log("Working")
  }
  else{
    console.log("Not working")
  }
  }
  // var response = await fetch("/api/playlist",{
  //   method: "POST",
  //   body: JSON.stringify({req.body})
  
  // })

  // if (response.ok){
  //   console.log(response)
  // }
}

// Add a New Playlist
addPlaylistEl.addEventListener('click', addPlaylist)

async function addPlaylist(event) {
  event.preventDefault();
  playlistName = playlistNameEl.value;
  playlistNameEl.value = "";
  const response = await fetch('/api/playlist', {
    method: 'POST',
    body: JSON.stringify({ playlistName }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

>>>>>>> b25928e3ced600723ab201c56d2ec0b689d2771c
