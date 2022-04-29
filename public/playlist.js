



var nativePicker = document.querySelector(".nativeDatePicker");


var yearSelect = document.querySelector("#year");
var monthSelect = document.querySelector("#month");
var daySelect = document.querySelector("#musicDay");
var playlistNameEl = document.querySelector("#playlistName");




var test = document.createElement("input");

try {
  test.type = "date";
} catch (e) {
  console.log(e.message);
}


if (test.type === "text") {
  
  nativePicker.style.display = "none";
  

  
  populateDays(monthSelect.value);
  populateYears();
}

function populateDays(month) {
 
  while (daySelect.firstChild) {
    daySelect.removeChild(daySelect.firstChild);
  }

  
  var dayNum;

 
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

 
  if (previousDay) {
    daySelect.value = previousDay;

    
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

  // console.log(day);
  renderSongs(chartData);
}




function renderSongs(chart){
 
  var songs = document.querySelector("#songs")
  songs.innerHTML = "";
  console.log(chart);
  for (i = 0; i < chart.length; i++){
    var test = document.createElement("div");
    test.setAttribute("data-title",`${chart[i].title}`)
    test.setAttribute("data-artist",`${chart[i].artist}`)
    test.setAttribute("class","songDiv")
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
     event.preventDefault();
     console.log(event.target);
     console.log(event.target.parentNode);
     const title = event.target.parentNode.getAttribute("data-title")
     const artist = event.target.parentNode.getAttribute("data-artist")
     console.log(title)
     console.log(artist)
     const playlist_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
     console.log(playlist_id)

     if (title && artist && playlist_id ) {
        const response = await fetch(`/api/song`, {
          method: 'POST',
          body: JSON.stringify({ title, artist, playlist_id }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
     
        if (response.ok) {
          document.location.replace(`/playlist/${playlist_id}`);
        } else {
          alert('Failed to create project');
        }
      }

 }



