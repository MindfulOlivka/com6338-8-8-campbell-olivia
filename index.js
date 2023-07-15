// Enter city in INPUT window
// Press search BUTTON
// App makes a call to API weather end point using fetch API
// App displays the information:
// - the city and country code
// - link to google maps (coord property)
// - a weather icon for current weather condition
// - description of weather condition
// - current temperature (units=imperial)
// - feels-like temperature
// - the time of the last info update
// If wrong term entered app displays 'location not found'
// Input field resets with each submission


var apiKey = '&units=imperial&appid=bd4f68a84873628cc33e93c209af4eb4'
var weather = document.getElementById('weather')
var form = document.querySelector('form')


form.onsubmit = function(e) {
  e.preventDefault()
  var URL = "https://api.openweathermap.org/data/2.5/weather?q="
  var city = this.search.value.trim()         //extract the value
  var fullUrl = URL + city + apiKey
  if (!city) return                  //prevent making api request without city name
  form.search.value = ""              // reset the value of the search

  fetch(fullUrl)
    .then(function(res) {
      return res.json()                // pass JSON data to broadct function
    })
    .then(broadcast)

    .catch(function(err) {                           // execute catch block for err message
      var errMessage = document.createElement('p')
      errMessage.textContent = 'Location not found'
      errMessage.style.fontSize = "xx-large"
      weather.appendChild(errMessage)
    })
} 

function broadcast(data) {                       // clear existing content
    weather.innerHTML = ""
    var city = document.createElement('h2')
    city.textContent = data.name + ', ' + data.sys.country
    weather.appendChild(city)                   // add city name to the weather display

    var map = document.createElement('a')        // create anchor for a map link
    var lat = data.coord.lat
    var lon = data.coord.lon
    map.href = 'https://www.google.com/maps/search/?api=1&query=' + lat + ',' + lon
    map.target = '_BLANK'                       // open new browser tab 
    map.textContent = 'Click to view map'
    weather.appendChild(map)
  

  var img = document.createElement('img')
  img.setAttribute("src","https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
  )
  weather.appendChild(img)


  var currentWeather = document.createElement('p')
  currentWeather.textContent = data.weather[0].description
  currentWeather.style.textTransform = 'capitalize'
  weather.appendChild(currentWeather)

  
  var currentTemp = document.createElement('p')
  tempNumber = data.main.temp
  currentTemp.textContent = 'Current:  ' + tempNumber + '° F'
  weather.appendChild(currentTemp)


  var feelsLike = document.createElement('p')
  feelsLikeNumber = data.main.feels_like
  feelsLike.textContent = 'Feels like:  ' + feelsLikeNumber + '° F'
  weather.appendChild(feelsLike)
  
  var date = new Date(data.dt * 1000)
  var timeString = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  })

  var updated = document.createElement('p')
  updated.textContent = 'Last Updated:  ' + timeString
  weather.appendChild(updated)
  }
  
  




/*
var queryString = "?units=imperial&appid=yourapikeyhere&q=" + userQuery
var fetchURL = weatherUrl + queryString
var date = new Date(/* milliseconds go here *)
var timeString = date.toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "2-digit",
}) */

/*form.onsubmit = function(e) {
    e.preventDefault()
    var city = this.search.value.trim()
    var fullURL = URL + city + "&units=imperial&appid=" + APIkey
    if ((!city) ||  (weatherSearch.value = '')) {
        city = ''
        weatherSearch.value = ''
        div.innerHTML = ''
    fetch(fullURL)
    .then(function(res) {
        if (res.status !== 200) throw new Error('Location not Found')
        return res.json()
      })
        .then(renderData)

        .catch(function (err) {
            div.innerHTML = err.message
        })
    }} */

   
/*
      .then(function(city) {     // .then(getInfo)
        div.innerHTML = ""
        var h2 = document.createElement('h2')
        h2.textContent = div.name.toUpperCase
        div.appendChild(h2)

        var img = document.createElement('img');
        var iconCode = data.weather[0].icon
        var iconURL = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png"
        img src = iconURL
        div.appendChild(img);
      })
}



testBtn.onclick = function() {
    fetch('URL')
    .then(function(res) {
        return res.json()
    })
     .then(getInfo)
}

     function getInfo(data) {
     for(var user of data.results) {
        var userDiv = document.createElement('div')
        console.log(user.name)

        var img = document.createElement('img')
        img.style = 'float: center;'
        img src = user.picture.small
        img.alt = 
        userDiv.appendChild(img)

        var h3 = document.createElement('h3')
        h3.textContent = username
        userDiv.appendChild(h3)

        var cell = document.createElement('a')
        cell.href = 'tel:' + user.phone
        cell.textContent = user.phone
        userDiv.appendChild(cell)
     }
    }
*/
