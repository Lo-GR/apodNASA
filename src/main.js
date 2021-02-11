
import './css/styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ApodReturn from './apod.js';

function clearFields() {
  $("#resultImg").empty();
  $("#resultDate").empty();
  $("#resultDesc").empty();
}

$(document).ready(function(){

  $("#singleOp").click(function(){
    $(".multiSearch").hide();
    $(".singleSearch").show();
  });
  $("#multiOp").click(function(){
    $(".multiSearch").show();
    $(".singleSearch").hide();
  })

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
        $('#resultImg').html(`<iframe width="420" height="315" src="${body.url}"></iframe>`);
      } else {
        $('#resultImg').html(`<img src="${body.url}" alt="space image">`);}
      $('#resultDate').text(`${body.date}`);
      $('#resultDesc').text(body.explanation);

    }, function (error) {
      $('#results').text(`There was an error processing your request: ${error}`);
    });


    $("#resultDesc").show();
  });

  $("#randomButton").click(function(){
    clearFields();
    let promise2 = ApodReturn.randomAPOD();
    promise2.then(function (response){
      console.log(response);
      const body = JSON.parse(response);
      if (body[0].media_type === "video"){
        $('#resultImg').html(`<iframe width="420" height="315" src="${body[0].url}"></iframe>`);
      } else{
        $('#resultImg').html(`<img src="${body[0].url}" alt="space image">`);
      }
      $('#resultDate').text(`${body[0].date}`);
      $('#resultDesc').text(body[0].explanation);
    }, function (error) {
      $('#results').text(`There was an error processing your request: ${error}`);
    });
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
      console.log(newYear);
      let promise = ApodReturn.searchAPOD(newYear);
      promise.then(function (response) {
        const body = JSON.parse(response);
        if (body.media_type === "video"){
          $('#resultImg').append(`<iframe width="420" height="315" src="${body.url}"></iframe>`);
        } else {
          $('#resultImg').append(`<a href="${body.url}" target="_blank"><img src="${body.url}" alt="space image" class="images">`);}
      }, function (error) {
        $('#results').text(`There was an error processing your request: ${error}`);
      });
      $("#resultDesc").show();
      $("#resultDesc").text("Here are the images and videos from your birthday each year!");
    }
  });
});