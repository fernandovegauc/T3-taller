<template>
<div id="app" class="container">
  <div class="row">
    <div class="column">
      <Map :positions="positions" :flights="flights"> </Map>
    </div>
  </div>
  <div class="row">
    
    <div class="col-3">
      <div class="card text-dark bg-warning mb-3" style="max-width: 18rem;">
        <ul
          class="list-group list-group-flush"
          v-for="(message, id) in msgs"
          :key="id"
        >
          <li class="list-group-item">
            <span>{{ message.name }}</span
            ><span>: {{ message.message }} </span>
          </li>
        </ul>
        <form @submit.prevent="sendMessage">
          <input v-model="username" type="text" placeholder="Your Name" />
          <input v-model="message" type="text" placeholder="Your Message" />
          <button>Send Message</button>
        </form>
      </div>
    </div>
    <div class="col-9">
      <div id="container" v-for="flight in flights[0]" :key="flight.code">
        <div class="card border-dark mb-3" style="max-width: 18rem;">
          <div class="card-header">Code : {{ flight.code }}
          </div>
          <div class="card-body text-primary">
            <h5 class="card-title">Plane : {{ flight.plane }}</h5>
            <p class="card-text">
              Origin: ({{flight.origin[0]}}, {{flight.origin[0]}})
              <br />
              Destination: ({{flight.destination[0]}}, {{flight.destination[0]}})
               <br />
              Seats: {{ flight.seats }}
            </p>
          </div>
        </div>
      </div>
    </div>
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
      username: "",
      message: "",
    };
  },

  sockets: {
    POSITION(data) {
      this.positions.push(data.position);
     
    },
    FLIGHTS(data) {
      this.flights.push(data);
      console.log(data);
     
    },
    CHAT(data) {
      this.msgs.push(data);
     
    },
  },
  created() {
    console.log("CREATED");
    this.$socket.client.emit("FLIGHTS");
  },
  methods: {
    sendMessage() {
      this.$socket.client.emit("CHAT", {
        name: this.username,
        message: this.message,
      });
    },
  },
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
