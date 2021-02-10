export default class ApodReturn{
  static searchAPOD (date){
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const api = `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&date=${date}`;
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", api, true);
      request.send();
    });
  }
  static randomAPOD(){
    return new Promise(function(resolve, reject){
      let request = new XMLHttpRequest();
      const api = `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&count=1`;
      request.onload = function(){
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", api, true);
      request.send();
    });
  }
}