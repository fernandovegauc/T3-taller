<template>
  <div style="height: 70vh">
    <LMap style="height: 400px" :center="center" :zoom="zoom">
      <LTileLayer :url="url"></LTileLayer>
      <div v-for="flight in flights[0]" :key="flight.code">
        <l-polygon :lat-lngs="[flight.origin, flight.destination]"></l-polygon>
        <l-circle-marker :lat-lng="flight.origin"></l-circle-marker>
        <div v-for="pos in positions" :key="pos[0]">
        <l-circle :lat-lng="pos" :radius="radius" :color="color2" ></l-circle>
        
        </div>
      </div>
    </LMap>
    
    
  
  </div>
  
</template>

<script>
import { LMap, LTileLayer, LPolygon, LCircleMarker, LCircle } from "vue2-leaflet";
export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LPolygon,
    LCircleMarker,
    LCircle
  },
  props: ["positions", "flights"],
  data() {
    return {
      url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 4,
      center: [-36.8723055, -71.79577856666667],
      bounds: null,
      color: "#ff7800",
      radius: 1,
      color2:"#FF5733"
       
    };
  },
};
</script>
