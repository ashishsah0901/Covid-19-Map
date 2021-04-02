function updateData() {
    let totalcases = 0;
    fetch("https://disease.sh/v3/covid-19/all")
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            totalcases = data.cases;
        })
    fetch("https://corona.lmao.ninja/v3/covid-19/countries")
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            data.forEach(element => {
                let latitute = element.countryInfo.lat;
                let longitute = element.countryInfo.long;
                let color = (element.cases * 255) / totalcases * 100;
                // console.log(color);
                new mapboxgl.Marker({
                        draggable: false,
                        color: `rgb(${color},0,0)`
                    })
                    .setLngLat([longitute, latitute])
                    .addTo(map);
            });
        })
}
setInterval(updateData, 5000);