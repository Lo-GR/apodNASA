
import './css/styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ApodReturn from './apod.js';

$(document).ready(function(){

  $("form#dateSearch").submit(function(event) {
    event.preventDefault();
    const dateSearch = $("#dateInput").val();
    console.log(dateSearch);
    let promise = ApodReturn.searchAPOD(dateSearch);
    promise.then(function (response) {
      const body = JSON.parse(response);
      $('#resultDate').text(`${body.date}`);
      $('#resultImg').html(`<img src="${body.url}" alt="space image">`);
      $('#resultDesc').text(body.explanation);
      // $('#results').text(`${body.date}`);
    }, function (error) {
      $('#results').text(`There was an error processing your request: ${error}`);
    });
    $("#resultDesc").show();
  });

  $("#randomButton").click(function(){
    let promise2 = ApodReturn.randomAPOD();
    promise2.then(function (response){
      console.log(response);
      const body = JSON.parse(response);
      $('#resultDate').text(`${body[0].date}`);
      $('#resultImg').html(`<img src="${body[0].url}" alt="space image">`);
      $('#resultDesc').text(body[0].explanation);
      // $('#results').text(`${body.date}`);
    }, function (error) {
      $('#results').text(`There was an error processing your request: ${error}`);
    });
    $("#resultDesc").show();
  });
});