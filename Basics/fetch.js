import { hasKey, isObject, isString, isNumber } from "./utilities.js";

const baseUrl = "https://tie.digitraffic.fi"

function getFullUrl() {
    return `${baseUrl}/api/weather/v1/stations/${state.stationId}/data`
}

function getStationUrl() {
    return `${baseUrl}/api/weather/v1/stations/${state.stationId}`
}

async function fetchTemporaryData() {
    const stationData = await fetch()

    if (!stationData.ok) {
        throw new Error(`Failed to fetch station data: ${stationData.statusText}`)
    }

    const data = await stationData.json()

   console.log(data)
}


async function fetchWeatherData() {
    const fullUrl = getFullUrl()
    const stationUrl = getStationUrl()

    const response = await fetch(fullUrl)
    const stationResponse = await fetch(stationUrl)

    if (!stationResponse.ok) {
        throw new Error(`Failed to fetch station data: ${stationResponse.statusText}`)
    }

    if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`)
    }

    const weatherData = await response.json()
    const stationData = await stationResponse.json()

    return { weatherData, stationData }
}




function setState(newStatus) {
    state = {
        ...state,
        ...newStatus,
    }
}

const Status = {
    IDLE: "idle",
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
}

let state = {
    status: Status.IDLE,
    stationId: null,
    view: {
        air: null,
        wind: null,
        humidity: null,
    },
    result: null,
    stationData: null,
    error: null,
}


function render() {
    if (state.status === Status.IDLE) {
        console.log("Idle")
    }

    if (state.status === Status.LOADING) {
        console.log("Loading data...")
    }

   if (state.status === Status.SUCCESS) {
    console.log("Data loaded successfully: " + state?.stationId)
   }

   if (state.status === Status.ERROR) {
        console.log("Error loading data: " + state?.error)
    }
}


function isStationData(data) {
    if(!isObject(data)) return false

    if(!hasKey(data, "id")) return false

    if(!hasKey(data, "dataUpdatedTime")) return false

    if(!hasKey(data, "sensorValues")) return false


    if(isNumber(data.id) && isString(data.dataUpdatedTime) && Array.isArray(data.sensorValues)) {
        return true
    }

    return false
}

const whatWeWant = {
    id: "number",
    geometry: { coordinates: ["number", "number"] },
    names: { en: "string"}
}

function isStationMetadata(data) {

    if(!isObject(data)) return false

    if(!hasKey(data, "id")) return false

    if(!hasKey(data, "geometry")) return false


    if(!hasKey(data.geometry, "coordinates")) return false

    if(!hasKey(data, "properties")) return false

    if(!hasKey(data.properties, "names")) return false

    if(!hasKey(data.properties.names, "en")) return false

    if( isNumber(data.id) && 
        Array.isArray(data.geometry.coordinates) && 
        data.geometry.coordinates.every((coordinate) => isNumber(coordinate)) &&
        isString(data.properties.names.en)
    
    )  {
        return true
    }

    return false
}




function isSensorData(data, sensorId) {

    if(!isObject(data)) return false

    if(!hasKey(data, "name")) return false

    if(!hasKey(data, "stationId")) return false

    if(!hasKey(data, "measuredTime")) return false

    if(!hasKey(data, "value")) return false

    if( isString(data.name) && 
        isString(data.measuredTime) && 
        isNumber(data.value) && 
        isNumber(data.stationId) &&
        data.stationId === sensorId) {

        return true
    }

    return false
}

function isAirTemperatureData(data) {
    if(!isStationData(data) || !data.sensorValues.every((sensor) => isSensorData(sensor, data.id))) {
        return false
    }

    return true
}

async function displayWeatherData(props) {
    const { stationId, view } = props

    setState({ status: Status.LOADING, stationId: stationId, view: view })



    try {
        const { weatherData, stationData } = await fetchWeatherData(stationId)

        if (!isStationMetadata(stationData)) {
            console.error("Invalid station metadata")
            return
        }

        if (!isAirTemperatureData(weatherData)) {
            console.error("Invalid weather data")
            return
        }

        setState({ status: Status.SUCCESS, result: weatherData, stationData: stationData })
    } catch (error) {
        setState({ status: Status.ERROR, error: error.message })
    }

    printWeatherData()
};

function findSensorByKeywords(keywords) {
    const normalizedKeywords = keywords.map((k) => k.toLowerCase());
  
    const { sensorValues } = state.result

    return sensorValues.find((item) => {
      return normalizedKeywords.every((keyword) => item.name.toLowerCase().includes(keyword));
    });
  }


function printLocation() {
    const longitude = state.stationData.geometry.coordinates[0]
    const latitude = state.stationData.geometry.coordinates[1]

    return `Longitude: ${longitude} Latitude: ${latitude}`
}

function printWeatherData() {
   render();

   if (state.status === Status.SUCCESS) {
    const airTemperatureData = findSensorByKeywords(["ilma"])
    const windSpeedData = findSensorByKeywords(["TUULI", "keski"]) 
    const humidityData = findSensorByKeywords(["kosteus"]) 


    console.log(`Station: ${state.stationData.properties.names.en} \n Coordinates: ${printLocation()}`)

        if (state.view.air === true) {
            console.log(`Station ID: ${state.result.id} Air temperature: ${airTemperatureData?.value} date:${airTemperatureData?.measuredTime}`)
        }

        if (state.view.wind === true) {
            console.log(`Wind speed: ${windSpeedData?.value} date: ${windSpeedData?.measuredTime}`)
        }

        if (state.view.humidity === true) {
            console.log(`Humidity: ${humidityData?.value} date: ${humidityData?.measuredTime}`)
        }
    }
 }

 displayWeatherData({stationId: 1002, view: { air: true, wind: true, humidity: true }})