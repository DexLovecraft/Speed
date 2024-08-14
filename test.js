let Temperature = {0: 15, 500 : 11.8, 1000 : 8.5, 1500 : 5.3, 2000 : 2.0, 2500 : -1.3, 3000: -4.5, 3500: -7.8, 4000: -11.0, 4500: -14.3, 5000: -17.5, 5500: -20.8, 6000: -24.0, 6500: -27.3, 7000: -30.5, 7500: -33.8, 8000: -37.0, 8500: -40.3, 9000: -43.5, 9500: -46.8, 10000: -50.0, 10500: -53.3,11000: -56.5}

const speedMetricInput = document.getElementById('speed_form_metric')
const speedKnotsInput = document.getElementById('speed_form_knots')
const altitudeMetricInput = document.getElementById('altitude_form_metric')
const altitudeFootInput = document.getElementById('altitude_form_foot')
const machInput = document.getElementById('mach')
const QNHInput = document.getElementById('QFE_form_QNH')
const QFEaltitudeInput = document.getElementById('QFE_form_alt-in-ft')
let QFEInput = document.getElementById('QFE_form_QFE') 
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
    speedKnotsInput.value = 0
    speedMetricInput.value = 0
    machInput.value = 0
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
    machOperation(dataTemperature)
}

const QFEOperation = () => {
    QFEInput.value = (QNHInput.value-(QFEaltitudeInput.value*0.3048)/9.3).toFixed(0)
}

const machOperation = (temperature) => {
    let machValue = 0
    machValue = speed/(39*Math.sqrt(temperature))
    machValue = machValue.toFixed(2)
    machInput.value = machValue
}

const speedOperation = (e, temperature) => {
    speed = e.target.value*(39*Math.sqrt(temperature))
    speedKnotsInput.value = speed.toFixed(0)
    speedMetricInput.value = (speed/1.944).toFixed(0)
}

speedKnotsInput.addEventListener('input', (e) => {speedConversion(e, "knots")})
speedMetricInput.addEventListener('input', (e) => {speedConversion(e, "meter")})
altitudeFootInput.addEventListener('input', (e) => {altitudeConversion(e, "foot")})
altitudeMetricInput.addEventListener('input',(e) => {altitudeConversion(e, "meter")})
machInput.addEventListener('input', (e) => {speedOperation(e, dataTemperature)})
QNHInput.addEventListener('input', ()=>{
    if(QNHInput && QFEaltitudeInput != undefined){
        QFEOperation()
    }
})
QFEaltitudeInput.addEventListener('input', ()=>{
    if(QNHInput && QFEaltitudeInput != undefined){
        QFEOperation()
    }
})