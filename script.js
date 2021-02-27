document.getElementById("weatherSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "") return;
    console.log(value);
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=54c0c52c55d72763004d82b1e2cdb280";
    fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
        let results = "";
        results += '<h3>Current Weather in ' + json.name + '</h3>';
        results += '<h3>' + json.main.temp + ' &deg;F' + '</h3>';
        results += '<h3>' + 'Feels Like: ' + json.main.feels_like + '</h3>';
        results += '<p>';
        for (let i=0; i < json.weather.length; i++) {
            let description1 = json.weather[i].description;
            description1 = description1.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
            results += '<h3>' + description1;
            if (i !== json.weather.length - 1)
                results += ", ";
        }
        for (let i=0; i < json.weather.length; i++) {
            results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
        }
        results += '</h3>';
        results += '</p>';
        document.getElementById("weatherResults").innerHTML = results;
        // console.log(results);
    });

    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=54c0c52c55d72763004d82b1e2cdb280";
    fetch(url2)
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        let forecast = "";
        forecast += '<table class="table">'

        // First row of table
        forecast += '<thead>';
        forecast += '<tr>';
        forecast += '<th scope="col"> Date/Time </th>';
        forecast += '<th scope="col"> Temperature </th>';
        forecast += '<th scope="col"> Wind Speed </th>';
        forecast += '<th scope="col"> Weather Condition </th>';
        forecast += '</tr>';
        forecast += '</thead>';

        // Rest of the rows for the table
        forecast += '<tbody>';
        for (let i=0; i < json.list.length; i++) {
            forecast += '<tr>';
            forecast += '<td>' + '<p>' + moment(json.list[i].dt_txt).format('lll') + '</p>' + '</td>';
            forecast += '<td>' + '<p>Temperature: ' + json.list[i].main.temp + '</p>' + '</td>';
            forecast += '<td>' + '<p>' + json.list[i].wind.speed + '</p>' + '</td>';
            forecast += '<td>' + '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>' + '</td>';
            forecast += '</tr>';
        }
        forecast += '</tbody>';
        forecast += '</table>'
        document.getElementById("forecastResults").innerHTML = forecast;
        // console.log(forecast);
    });
});

