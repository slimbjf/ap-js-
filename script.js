document.getElementById('get-weather-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    const apiKey = '075a3d3cfe28d186e2ab9fe8180dd753'; // Remplacez avec votre propre clé API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const weatherOutput = document.getElementById('weather-output');
        if (data.cod === '404') {
          weatherOutput.innerHTML = `<p>City not found!</p>`;
        } else {
          const { main, weather, wind } = data;
          let description = weather[0].description;
  
          // Ajout de la description de la température
          let temperatureDescription;
          if (main.temp > 30) {
            temperatureDescription = "Hot";
          } else if (main.temp < 10) {
            temperatureDescription = "Cold";
          } else {
            temperatureDescription = "Moderate";
          }
  
          weatherOutput.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Temperature:</strong> ${main.temp}°C (${temperatureDescription})</p>
            <p><strong>Humidity:</strong> ${main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
          `;
          
        }
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-output').innerHTML = '<p>Error fetching data. Try again later.</p>';
      });
  });
  