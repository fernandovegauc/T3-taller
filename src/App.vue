<template>
  <div id="app" class="row">
    <div class="column">
    <Map :positions="positions" :flights="flights"> </Map>
    </div>
    <div class="column">
    <div id="container" v-for="flight in flights[0]" :key="flight.code">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">CODE: {{ flight.code }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              AIRLINE: {{ flight.airline }}
            </h6>
            <p class="card-text">
              Plane: {{ flight.plane }}
              <br />
              Seats: {{ flight.seats }}
            </p>
          </div>
        </div>
    </div>
    </div>
    <div class="column"></div>
      <div class="card" style="width: 18rem;">
        <ul class="list-group list-group-flush" v-for="(message, id) in msgs" :key="id">
          <li class="list-group-item"><span>{{message.name}}</span><span>: {{message.message}} </span></li>
        </ul>
        <form @submit.prevent="sendMessage">
      <input v-model="username" type="text" placeholder="Your Name" />
      <input v-model="message" type="text" placeholder="Your Message" />
      <button>Send Message</button>
      </form>
        
      </div>
    

  
  
  </div>

















    
</template>

<script>
import Map from "./components/Map.vue";

export default {
  name: "App",
  components: {
    Map,
  },
  data() {
    return {
      flights: [],
      positions: [],
      msgs: [],
      username: '',
      message: ''
    };
  },
  
  sockets: {
    POSITION(data) {
      
      this.positions.push(data.position);
      console.log(this.positions);
      
    },
    FLIGHTS(data) {
      this.flights.push(data);
      console.log(data);
      window.setInterval(() => {
            this.position = [];
        },1000);
    },
    CHAT(data){
      this.msgs.push(data);
      console.log(data)

    }
    
  },
  created() {
    console.log("CREATED");
    this.$socket.client.emit("FLIGHTS");
  },
  methods:{
    sendMessage(){
      this.$socket.client.emit("CHAT",{name: this.username, message: this.message});

    }
  }
 
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.column {
  float: left;
  width: 33.33%;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
</style>
