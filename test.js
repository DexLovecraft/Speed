let Temperature = {
    0: 15,
    500 : 11.8,
    1000 : 8.5,
    1500 : 5.3,
    2000 : 2.0,
    2500 : -1.3,
    3000: -4.5,
    3500: -7.8, 
    4000: -11.0,
    4500: -14.3,
    5000: -17.5,
    5500: -20.8,
    6000: -24.0,
    6500: -27.3,
    7000: -30.5,
    7500: -33.8,
    8000: -37.0,
    8500: -40.3,
    9000: -43.5,
    9500: -46.8,
    10000: -50.0,
    10500: -53.3,
    11000: -56.5,
}

const speedMetricInput = document.getElementById('SpeedMectric')
const speedKnotsInput = document.getElementById('SpeedKnots')
const altitudeMetricInput = document.getElementById('altitudeMetric')
const altitudeFootInput = document.getElementById('altitudeFoot')
const calculateButton = document.getElementById('Calculate')
const machInput = document.getElementById('Mach')
let dataTemperature = 0
let speedKnots = 1.944
let speedMetric = 1
let keys = 0
let machValue = 0
let altitudeMeter = 0

const temperatureConversion = (AltitudeUser) => {
    
    if (AltitudeUser > 11000) {
        keys = 11000
    }
    else if (AltitudeUser <= 0) {
        keys = 0
    }
    else {
        keys = Object.keys(Temperature).find(keys=> keys < AltitudeUser && keys >= AltitudeUser-500);
        keys = Number(keys)     
    }
    dataTemperature = Temperature[keys] + 273.15
} 

const altitudeMetricConversion = (footUser) => {
    altitudeMeter = footUser*0.3048 
    altitudeMetricInput.value = altitudeMeter.toFixed(0)
    temperatureConversion(altitudeMeter)
}

const altitudeFootConversion = (metricUser) => {
    altitudeMeter = metricUser 
    altitudeFootInput.value = (metricUser/0.3048).toFixed(0)
    temperatureConversion(altitudeMeter)
}

const speedKnotsConversion = (speedMetricUser) => {
    speedKnots = speedMetricUser*1.944
    speedKnotsInput.value = speedKnots.toFixed(2)
}

const speedMetricConversion = (speedKnotsUser) => {
    speedKnots = speedKnotsUser
    speedMetric = speedKnotsUser/1.944
    speedMetricInput.value = speedMetric.toFixed(2)
}

const machOperation = (temperature) => {
    machValue = speedKnots/(39*Math.sqrt(temperature))
    machInput.value = machValue.toFixed(2) 
}

const speedOperation = (mach, temperature) => {
    speedKnots = mach*(39*Math.sqrt(temperature))
    speedKnotsInput.value = speedKnots.toFixed(2)
    speedMetricConversion(speedKnots)
}

const temperatureReset = () => {
    speedKnotsInput.value = 0
    speedMetricInput.value = 0
    machInput.value = 0
}

const speedMetricTrigger = (e) => {
    speedKnotsConversion(e.target.value)
    machOperation(dataTemperature)
} 

const speedKnotsTrigger = (e) => {
    speedMetricConversion(e.target.value)
    machOperation(dataTemperature)
}   

const machTrigger = (e) => {
    speedOperation(e.target.value, dataTemperature)
}

const altitudeFootTrigger = (e) => {
    altitudeMetricConversion(e.target.value)
    temperatureReset()
}

const altitudeMetricTrigger = (e) => {
    altitudeFootConversion(e.target.value)
    temperatureReset()
}

speedKnotsInput.addEventListener('input', speedKnotsTrigger)
speedMetricInput.addEventListener('input', speedMetricTrigger)
altitudeFootInput.addEventListener('input', altitudeFootTrigger)
altitudeMetricInput.addEventListener('input', altitudeMetricTrigger)
machInput.addEventListener('input', machTrigger)

