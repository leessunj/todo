/**
 * 위치 기반 날씨
 */
// require("dotenv").config()

const loc=document.querySelector("#loc")
const weather=document.querySelector("#weather")
const wicon=document.querySelector("#weather-icon")

navigator.geolocation.getCurrentPosition(onGeoSuccess,onGeoError)

async function onGeoSuccess(position){
    console.log(position)
    const lat=position.coords.latitude
    const lon=position.coords.longitude
    const key="405705707616b2b9e2c4cb551ee70733"
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
    await fetch(url)
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        loc.innerHTML=data.name
        weather.innerHTML=`${data.main.temp}°C`
        wicon.src=`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    })
}

function onGeoError(){
    console.log("OK bye...")
}