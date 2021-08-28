<template>
  <div class="app-container">
    <img
      v-if="isFeching"
      class="animation-fade-in"
      src="./assets/loading.gif"
      alt="loading"
    />
    <div class="animation-fade-inr" v-else>
      <div v-if="percentage" class="result">
        {{ percentage }} %
        <p>{{ result }}</p>
        <button @click="repitTest">Repetir test</button>
      </div>

      <div v-else>
        <div class="title">Calculador de amor</div>

        <div class="form-container">
          <input type="text" v-model="fname" placeholder="Tu nombre" />

          <input type="text" v-model="sname" placeholder="Nombre de tu crush" />
          <button @click="getCalculator">Calcular</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCalculatorApi } from "./api";

export default {
  name: "App",
  data() {
    return {
      fname: "",
      sname: "",
      percentage: null,
      result: "",
      isFeching: false,
      isValidData: false,
    };
  },
  methods: {
    repitTest() {
      this.fname = "";
      this.sname = "";
      this.percentage = null;
      this.result = "";
    },
    async getCalculator() {
      if (!(this.fname && this.sname)) return;
      this.isFeching = true;
      const { result, percentage } = await getCalculatorApi(
        this.fname,
        this.sname
      );
      this.result = result;
      this.percentage = percentage;
      this.isFeching = false;
    },
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  background: rgb(236, 172, 183);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url("assets/valentines.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.animation-fade-in {
  animation-name: fade-in;
  animation-duration: 2s;
}

.title {
  text-align: center;
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 50px;
}

.result {
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  color: #ffffff;
}

.result p {
  margin: 0 0 30px 0;
}

.form-container {
  width: 35rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  background: #ffffff;
  border: 0;
  margin: 5px;
  padding: 15px;
  border-radius: 20px;
  text-align: center;
  font-size: 23px;
  font-weight: bold;
  width: 400px;
  margin-bottom: 20px;
}

input:focus,
button {
  outline: none;
}

button {
  background: #ffffff;
  color: brown;
  font-size: 23px;
  font-weight: bold;
  border: 0;
  padding: 15px;
  border-radius: 20px;
  width: 170px;
  cursor: pointer;
  margin-top: 20px;
  box-shadow: 3px 10px 14px -3px rgba(0, 0, 0, 0.64);
  -webkit-box-shadow: 3px 10px 14px -3px rgba(0, 0, 0, 0.64);
  -moz-box-shadow: 3px 10px 14px -3px rgba(0, 0, 0, 0.64);
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
