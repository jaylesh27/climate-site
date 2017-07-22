$(document).ready(function(){

      google.charts.load('current', {
        'packages':['geochart'],
        'mapsApiKey': 'AIzaSyDPRICJtLBC8l2U2t9fP8czRvrfagHM8VM'
      });
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable([
          ['State', 'Energy Sources %'],
          ['US-PA', 20], ['US-NJ', 40], ['US-OH', 10], ['US-DE', 60]
        ]);

        var options = {
          region: 'US',
          colorAxis: {colors: ['red', 'white', 'blue']},
          backgroundColor: '#81d4fa',
          datalessRegionColor: '#f8bbd0',
          defaultColor: '#f5f5f5',
        };

        var chart = new google.visualization.GeoChart(document.getElementById('geo-chart'));

        chart.draw(data, options);
      }



});