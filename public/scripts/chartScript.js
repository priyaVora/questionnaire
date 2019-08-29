// const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb+srv://dbUser:dbUserPassword@cluster0-t2kyl.gcp.mongodb.net/test?retryWrites=true&w=majority';
// const dbName = 'questionnaire_db';

// var mongoOptions = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// };



new Chart(document.getElementById("Q1").getContext("2d"), {
    type: 'bar',
    data: {
      labels: ["A", "B", "C", "D"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [2478,5267,734,784,433]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Favorite Ice Cream Flavor'
      }
    }
});

new Chart(document.getElementById("Q2").getContext("2d"), {
    type: 'bar',
    data: {
      labels: ["A", "B", "C", "D"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [2478,5267,734,784,433]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Favorite Messaging System'
      }
    }
});

new Chart(document.getElementById("Q3").getContext("2d"), {
    type: 'bar',
    data: {
      labels: ["A", "B", "C", "D"],
      datasets: [
        {
          label: "Population",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [2478,5267,734,784,433]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Favorite Season'
      }
    }
});