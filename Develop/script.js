var dayHours = [
  {
      id: "0",
      hour: "8",
      time: "08",
      meridiem: " AM",
      reminder: ""
  },
  {
      id: "1",
      hour: "9",
      time: "09",
      meridiem: " AM",
      reminder: ""
  },
  {
      id: "2",
      hour: "10",
      time: "10",
      meridiem: " AM",
      reminder: ""
  },
  {
      id: "3",
      hour: "11",
      time: "11",
      meridiem: " AM",
      reminder: ""
  },
  {
      id: "4",
      hour: "12",
      time: "12",
      meridiem: " PM",
      reminder: ""
  },
  {
      id: "5",
      hour: "1",
      time: "13",
      meridiem: " PM",
      reminder: ""
  },
  {
      id: "6",
      hour: "2",
      time: "14",
      meridiem: " PM",
      reminder: ""
  },
  {
      id: "7",
      hour: "3",
      time: "15",
      meridiem: " PM",
      reminder: ""
  },
  {
      id: "8",
      hour: "4",
      time: "16",
      meridiem: " PM",
      reminder: ""
  },
  {
      id: "8",
      hour: "5",
      time: "17",
      meridiem: " PM",
      reminder: ""
  },
  
]

dayHours.forEach(function(thisHour) {
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".time-block").append(hourRow);
  
    var hourField = $("<div>")
        .text(`${thisHour.hour}${thisHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });
  
    var hourPlan = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attr("id", thisHour.id);
    if (thisHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }
  
    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourField, hourPlan, savePlan);
  })
  
  init();

function getHeaderDate() {
  var headerDate = moment().format('dddd, MMMM Do, YYYY');
  $("#currentDay").text(headerDate);
}

function saveReminder() {
  localStorage.setItem("myDay", JSON.stringify(dayHours));
}

function displayReminder() {
  dayHours.forEach(function (_thisHour) {
      $(`#${_thisHour.id}`).val(_thisHour.reminder);
  })
}

function init() {
  var storedDay = JSON.parse(localStorage.getItem("myDay"));

  if (storedDay) {
      dayHours = storedDay;
  }

  saveReminder();
  displayReminder();
}

getHeaderDate();

$(".saveBtn").on("click", function(event) {
  event.preventDefault();
  var saveIndex = $(this).siblings(".description").children(".future").attr("id");
  dayHours[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
  console.log(saveIndex);
  saveReminder();
  displayReminder();
})
