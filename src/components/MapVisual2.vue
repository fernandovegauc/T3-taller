<template>
  <div style="height: 70vh">
    <LMap  style="height: 400px" :center="center">
      <LTileLayer :url="url"></LTileLayer>
      <div v-for="flight in flights[0]" :key="flight.code">
        
        <l-polygon :lat-lngs="[flight.origin,flight.destination]" ></l-polygon>
        <l-circle-marker
        :lat-lng = "flight.origin">
        </l-circle-marker>
        <div v-for="(position,code) in positions" :key="position[1]">
            <h2> {{position}}: {{code}}</h2>
            <l-marker
            
            :lat-lng="position"
            ></l-marker>
        </div>
       
      </div>
    </LMap>
   
  </div>
</template>

<script>
import { LMap,LCircleMarker,LMarker, LTileLayer,LPolygon } from "vue2-leaflet";
export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LPolygon,
    LMarker
  },
  data() {
    return {
      url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 16,
      center: [13.1367826,77.5711133],
      bounds: null,
      color: '#ff7800'
    };
  },
  inject:['flights', 'positions']
};
</script>