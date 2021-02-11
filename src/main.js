
import './css/styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ApodReturn from './apod.js';

function clearFields() {
  $("#resultImg").empty();
  $("#resultVid").empty();
  $("#resultImg").hide();
  $("#resultVid").hide();
  $("#containImg").hide();
  $("#containVid").hide();
  $("#resultDate").empty();
  $("#resultDesc").empty();
  $(".moon").hide();
}

$(document).ready(function(){
  $("body").show();
  $(".popup").show();

  $("button#popup-button").click(function() {
    $(".popup").slideUp();
  });

  $("#singleOp").click(function(){
    $(".multiSearch").hide();
    $(".singleSearch").show();
  });
  $("#multiOp").click(function(){
    $(".multiSearch").show();
    $(".singleSearch").hide();
  });

  $("form#dateSearch").submit(function(event) {
    clearFields();
    event.preventDefault();
    const dateSearch = $("#dateInput").val();
    console.log(dateSearch);
    let promise = ApodReturn.searchAPOD(dateSearch);


    promise.then(function (response) {
      const body = JSON.parse(response);
      console.log(body.media_type);
      if (body.media_type === "video"){
        $('#resultVid').html(`<iframe width="840" height="630" src="${body.url}"></iframe>`);
        $("#containVid").show();
        $("#resultVid").show();
      } else {
        $('#resultImg').html(`<img src="${body.url}" alt="space image" class="singleImage">`);
        $("#containImg").show();
        $("#resultImg").show();}
      $('#resultDate').text(`${body.date}`);
      $('#resultDesc').text(body.explanation);
    }, function (error) {
      $('#results').text(`There was an error processing your request: ${error}`);
    });
    $("#resultDesc").show();
  });

  $("#randomButton").click(function(){
    clearFields();
    const random = parseInt($("#randomAmount").val());
    let promise2 = ApodReturn.randomAPOD(random);
    promise2.then(function (response){
      if (random === 1){
        console.log("got to 1 branch");
        const body = JSON.parse(response);
        if (body[0].media_type === "video"){
          $('#resultVid').html(`<iframe width="840" height="630" src="${body[0].url}"></iframe>`);
          $("#containVid").show();
          $("#resultVid").show();
        } else{
          $('#resultImg').html(`<img src="${body[0].url}" alt="space image">`);
          $("#containImg").show();
          $("#resultImg").show();
        }
        $('#resultDate').text(`${body[0].date}`);
        $('#resultDesc').text(body[0].explanation);
      } else {
        console.log(random);
        console.log("got to multi branch");
        const body = JSON.parse(response);
        const urlArray = body.map(x => x.url);
        const typeArray = body.map(x => x.media_type);
        for (let index = 0; index < urlArray.length; index++){
          if (typeArray[index] === "video"){
            $('#resultVid').append(`<iframe width="210" height="157.5" src="${urlArray[index]}"></iframe>`);
            $("#containVid").show();
            $("#resultVid").show();
          } else {
            $('#resultImg').append(`<a href="${urlArray[index]}" target="_blank"><img src="${urlArray[index]}" alt="space image" class="images">`);
            $("#containImg").show();
            $("#resultImg").show();
            $("#resultDesc").show();
          }
        }
      }
    }, function (error) {
      $('#results').text(`There was an error processing your request: ${error}`);
    });
    $("#resultDesc").append(`<div class="align-center">Below are your ${random} random APODs</div>`);
    $(".moon").show()
    $("#resultDesc").show();
  });

  $("#bdayButton").click(function(){
    clearFields();
    const dateSearch = $("#dateInput").val();
    let inputYear = parseInt(dateSearch.slice(0, 4));
    const inputBday = dateSearch.slice(4, 10);
    const currentYear = (new Date).getFullYear();
    for (inputYear; inputYear < currentYear; inputYear++) {
      let newYear = inputYear.toString() + inputBday;
      let promise = ApodReturn.searchAPOD(newYear);
      promise.then(function (response) {
        const body = JSON.parse(response);
        if (body.media_type === "video"){
          $('#resultVid').append(`<iframe width="210" height="157.5" src="${body.url}"></iframe>`);
          $("#containVid").show();
          $("#resultVid").show();
        } else {
          $('#resultImg').append(`<a href="${body.url}" target="_blank"><img src="${body.url}" alt="space image" class="images">`);
          $("#resultImg").show();
          $("#containImg").show();}
      }, function (error) {
        $('#results').text(`There was an error processing your request: ${error}`);
      });
      $("#resultDesc").show();
    }
    $("#resultDesc").append(`<div class="align-center">Below are the images and videos from your birthday each year!</div>`);
    $(".moon").show()
  });

  $("#multiButton").click(function(){
    clearFields();
    const startDate = $("#dateStart").val();
    const endDate = $("#dateEnd").val();
    console.log(startDate);
    console.log(endDate);
    let promise = ApodReturn.multipleAPOD(startDate, endDate);
    promise.then(function(response){
      const body = JSON.parse(response);
      const urlArray = body.map(x => x.url);
      const typeArray = body.map(x => x.media_type);
      for (let index = 0; index < urlArray.length; index++){
        if (typeArray[index] === "video"){
          $('#resultVid').append(`<iframe width="210" height="157.5" src="${urlArray[index]}"></iframe>`);
          $("#containVid").show();
          $("#resultVid").show();
        } else {
          $('#resultImg').append(`<a href="${urlArray[index]}" target="_blank"><img src="${urlArray[index]}" alt="space image" class="images">`);
          $("#containImg").show();
          $("#resultImg").show();
        }
      }
    }, function (error) {
      $('#results').text(`There was an error processing your request: ${error}`); 
    });
    $("#resultDesc").show();
    $("#resultDesc").append(`<div class="align-center">Below are the images and videos between the dates you selected!</div>`);
    $(".moon").show()
  });
});