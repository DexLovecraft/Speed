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
let speed = 1.944

const temperatureConversion = (AltitudeUser) => {
    let keys = 0

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

const altitudeConversion = (e, type) => {
    let altitudeMeter = 0
    if (type == "foot") {
        altitudeMeter = e.target.value*0.3048
        altitudeMetricInput.value = altitudeMeter.toFixed(0)
    }
    else if (type == "meter"){
        altitudeMeter = e.target.value
        altitudeFootInput.value = (e.target.value/0.3048).toFixed(0)
    }
    temperatureReset()
    temperatureConversion(altitudeMeter)
}

const speedConversion = (e, type) => {
    if (type == "knots") {
        speed = e.target.value
        speedMetricInput.value = e.target.value/1.944.toFixed(0)
    }
    else if (type == "meter"){
        speed = e.target.value*1.944
        speedKnotsInput.value = speed.toFixed(0)
    }
}

const machOperation = (temperature) => {
    let machValue = 0
    machValue = speedKnots/(39*Math.sqrt(temperature))
    machValue = machValue.toFixed(2)
    machInput.value = machValue
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

speedKnotsInput.addEventListener('input', (e) => {speedConversion(e, "knots")})
speedMetricInput.addEventListener('input', (e) => {speedConversion(e, "meter")})
altitudeFootInput.addEventListener('input', (e) => {altitudeConversion(e, "foot")})
altitudeMetricInput.addEventListener('input',(e) => {altitudeConversion(e, "meter")})
machInput.addEventListener('input', machTrigger)