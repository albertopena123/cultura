import { OpenStreetMapProvider } from 'leaflet-geosearch';
const provider = new OpenStreetMapProvider();

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#mapa')) {
        const lat = document.querySelector('#lat').value === '' ? -12.5960536 : document.querySelector('#lat').value;
        const lng = document.querySelector('#lng').value === '' ? -69.1937976 : document.querySelector('#lng').value;

        const mapa = L.map('mapa').setView([lat, lng], 16);

        //eliminar pines previos
        let markers = new L.FeatureGroup().addTo(mapa);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapa);

        let marker;

        // agregar el pin
        marker = new L.marker([lat, lng],{
            draggable: true,
            autoPan: true
        }).addTo(mapa);
        
        //agregar el pin a las capas
        markers.addLayer(marker);
        
        //Geocode Service
        const geocodeService = L.esri.Geocoding.geocodeService({
            apikey: "AAPK2b31d4de2336426389d7d55e7a06a1a5PrdIFpY1ieDUyMkbrIoU1xyBJvjpwZ2c6uHu5AJzEGEZHOEuVf85C10M2MkRHO6a" 
        });
        //buscador de direcciones
        const buscador = document.querySelector('#formbuscador');
        buscador.addEventListener('blur', buscarDireccion);

        reubicarPin(marker);

        function reubicarPin(marker) {
            // detectar movimiento del marker
            marker.on('moveend', function(e) {
                marker = e.target;

                const posicion = marker.getLatLng();

                //console.log(posicion);
                
                //centrar Pin automaticamente
                mapa.panTo(new L.LatLng(posicion.lat, posicion.lng));

                //Reverse Geocoding, cuando el usuario reubica el Pin
                geocodeService.reverse().latlng(posicion, 16).run(function(error, resultado) {
                    //console.log(error);

                    //console.log(resultado.address);

                    marker.bindPopup(resultado.address.LongLabel);
                    marker.openPopup();

                    //llenar los campos de direccion
                    llenarInputs(resultado);
                })
            });
        }

        function buscarDireccion(e) {

            if (e.target.value.length>1) {
                provider.search({query: e.target.value})
                    .then(resultado => {
                        if ( resultado ) {

                            //limpiar los pines previos
                            markers.clearLayers();

                            //Reverse Geocoding, cuando el usuario reubica el Pin
                            geocodeService.reverse().latlng(resultado[0].bounds[0], 16).run(function(error, resultado) {
                                //llenar inputs
                                llenarInputs(resultado);

                                //centrar el mapa
                                mapa.setView(resultado.latlng);

                                //agregar el pin
                                marker = new L.marker(resultado.latlng,{
                                    draggable: true,
                                    autoPan: true
                                }).addTo(mapa);

                                //asignar el contenedor de markers el nuevo pin
                                markers.addLayer(marker);
                                
                                //mover el pin
                                reubicarPin(marker);
                            })
                        }
                    })
                    .catch(error => {
                        //console.log(error)
                    })
            }
        }

        function llenarInputs(resultado) {
            //console.log(resultado);
            document.querySelector('#direccion').value =  resultado.address.Match_addr || '';
            document.querySelector('#lat').value = resultado.latlng.lat || '';
            document.querySelector('#lng').value = resultado.latlng.lng || '';
        }
    }
    
  });