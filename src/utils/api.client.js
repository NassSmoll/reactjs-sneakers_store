import axios from "axios";

//const API_KEY = 'a4679c85-b4c8-49fb-b8ac-63230b269dd7';

export default axios.create({
  baseURL:"http://localhost:3004",
    headers: {
      "Content-Type": "application/json",
     //"x-apikey": API_KEY,
      "cache-control": "no-cache",
    },
  });

 