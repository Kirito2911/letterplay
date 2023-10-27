import axios from "axios"

const instance = axios.create({
    baseURL: 'https://api.rawg.io/api',
  });



export default function getGame(search){
return instance.get('/games',{ params: {key: "3a27f22286a44b37873aa859b07d8c5a", search } })
}