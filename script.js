document.getElementById("nameSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const name = document.getElementById("nameInput").value;
    if (name === "") name = "You";
    console.log(name);

    const chartURL = "https://quickchart.io/chart?bkg=white&c={ type: 'line', data: { labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021'], datasets: [{ label: '" + name + "', data: [150, 130, 80, 70, 60, 40, 20] }, { label: 'Kevin', data: [100, 200, 300, 400, 600, 800, 1200, ] }] }}";
    fetch(chartURL)
    .then(function(response) {
        return response.blob();
    }).then(function(blobResponse) {
        const urlCreator = window.URL || window.webkitURL;
        document.getElementById('graphResult').innerHTML = '<h2>Graph of Babes You Are (Not) Picking Up</h2>'
        + '<hr>'
        + '<div class="whiteSpace"></div>'
        + '<p> This graph shows the number of babes you\'re picking up compared to Kevin</p>'
        + '<img src="' + urlCreator.createObjectURL(blobResponse) + '"/>';  
    });


    const adviceURL = "https://api.adviceslip.com/advice";
    fetch(adviceURL)
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        let resultAdvice = '<h2>Advice for You</h2>'
        + '<hr>'
        + '<br>'
        + '<p> Obviously you need some help, so here\'s some advice to help you increase in your confidence.</p>'
        + '<p> Advice will appear below:</p>'
        + '<br>'
        + '<p>' + name + ', ' + json.slip.advice + '</p>';

        document.getElementById("adviceResult").innerHTML = resultAdvice;
    });

    const quoteURL = "https://quote-garden.herokuapp.com/api/v3/quotes";
    fetch(quoteURL)
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        let entry = getRandomInt(0,9);
        let resultQuote = '<h2>Inspirational Quote for You</h2>'
        + '<hr>'
        + '<br>'
        + '<p> Now that you\'ve gotten some life changing advice, '
        + 'it\'s time to learn from history\'s greatest teachers.</p>'
        + '<p> An inspirational quote will appear below:</p>'
        + '<br>'
        + '<p>' + name + ', "' + json.data[entry].quoteText +'" - ' + json.data[entry].quoteAuthor + '</p>';

        document.getElementById("quoteResult").innerHTML = resultQuote;

        let congratsText = '<h2>Congratulations Lady Slayer!</h2>'
        + '<hr>'
        + '<br>'
        + '<p>Congratulations. Now that you\'ve gotten some incredible advice, '
        + 'and you\'ve been inspired by a historical figure, '
        + 'you have everything you need to start picking up more babes!</p>'
        + '<br>'

        document.getElementById("congratsBox").innerHTML = congratsText;
    });

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

});

