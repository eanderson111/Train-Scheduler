// Initialize Firebase
var config = {
    apiKey: "AIzaSyAnjJdTyPk8qBsUPAneykhQw71lrK3WGS8",
    authDomain: "traindatabase-9003a.firebaseapp.com",
    databaseURL: "https://traindatabase-9003a.firebaseio.com",
    projectId: "traindatabase-9003a",
    storageBucket: "",
    messagingSenderId: "145087474099"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database
  var database = firebase.database();

   // Initial Values
   var name = "";
   var destination = "";
   var firstTime = 0;
   var tFrequency = 0;


    // Capture Button Click
    $("#add-user").on("click", function(event) {
    
        // Don't refresh the page!
        event.preventDefault();
  
        // Code in the logic for storing and retrieving the most recent entry.
        name = $("#name-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTime = $("#time-input").val().trim();
        tFrequency = $("#frequency-input").val().trim();
  
        
        database.ref().push({
          name: name,
          destination: destination,
          firstTime: firstTime,
          tFrequency: tFrequency
        });
      });

        // Firebase watcher + initial loader
    database.ref().on("child_added", function(childSnapshot) {

        // Log everything that's coming out of snapshot

        console.log("============Next Train=============");
        console.log("Whole Shibang: ",childSnapshot.val());
        console.log("Name : ",childSnapshot.val().name);
        console.log("Destination: ",childSnapshot.val().destination);
        console.log("First Time: ",childSnapshot.val().firstTime);
        console.log(childSnapshot.val().tFrequency);
  
        
        //Moment JS

            // // Assumptions
            // var tFrequency = 3;

            // // Time is 3:30 AM
            // var firstTime = "03:30";
            // console.log (childSnapshot.val().firstTime)
            // var timeArr = childSnapshot.val().firstTime.split(":");
            // var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
            // var maxMoment = moment().max(moment(),trainTime);

              // timestamp (train time entry, hh:mm) split hour vs minutes into an array

            var tArrival;
            var tRemainder;

            var firstTime = childSnapshot.val().firstTime;
            var tFrequency = childSnapshot.val().tFrequency;

            // if (trainTime === maxMoment){
            //     tArrival = trainTime.format("hh:mm");
            //     tRemainder = trainTime.diff(moment(), "minutes")
            // }  else {

            // current time in unix and subtract the train arrival time

            // First Time (pushed back 1 year to make sure it comes before current time)
            var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
            console.log("First Time Converted: ", firstTimeConverted);

            // Current Time
            var currentTime = moment();
            console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

            // Difference between the times
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            // var diffTime = moment().diff(trainTime, "minutes");
            console.log("DIFFERENCE IN TIME: " + diffTime);

            // Time apart (remainder)
            tRemainder = diffTime % tFrequency;
            console.log("Remianing Time dude!: ",tRemainder);

            // Minute Until Train
            var tMinutesTillTrain = tFrequency - tRemainder;
            console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
            
            tArrival = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
            console.log ("Your arrival time: " + tArrival);
            console.log ("Remaining minutes: " + tRemainder);

            // Next Train
            // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
            // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        // }
        //end else stmnt
       
        var row = $("<tr>");
        var name = $("<td>");
        name.text(childSnapshot.val().name);
        row.append(name);

        var destination = $("<td>");
        destination.text(childSnapshot.val().destination);
        row.append(destination);

        var tFrequency = $("<td>");
        tFrequency.text(childSnapshot.val().tFrequency);
        row.append(tFrequency);

        var nextTrain = $("<td>");
        nextTrain.text(tArrival);
        row.append(nextTrain);
        

        var minutesAway = $("<td>");
        minutesAway.text(tMinutesTillTrain);
        row.append(minutesAway);



    $(".table").append(row);

    });
