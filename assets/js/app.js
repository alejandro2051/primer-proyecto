const api_key = "c5266a9cb66b4367abf201332243010";
const update = document.getElementById('update');

function getClima(latitud, longitud) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${latitud},${longitud}&aqi=no`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const climaContainer = document.getElementById('clima');
            console.log(data);
            climaContainer.innerHTML = `
                <h2>El clima en: ${data.location.name}, ${data.location.region}, ${data.location.country}</h2>
                <h3>Hora: ${data.location.localtime}</h3>
                <h3>Temperatura: ${data.current.temp_c}</h3>
                <h3>Condicion: ${data.current.condition.text}</h3>
                <img src="${data.current.condition.icon}"> 
            ` 
        })
        .catch(error => {
            console.error(error)
        })
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitud = position.coords.latitude;
            const longitud = position.coords.longitude;
            getClima(latitud, longitud);
        }, error => {
            console.error('Error al obtener la ubicacion', error);
            alert('No hemos podido obtener su ubicacion');
            new Notification('No hemos podido obtener su ubicacion');
        });
    }
}
window.onload = getLocation; 
update.addEventListener('click', getLocation)