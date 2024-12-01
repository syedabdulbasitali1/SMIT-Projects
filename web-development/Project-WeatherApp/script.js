// f9cdce05e49602cacc7433be245bc6f0
// BACKGROUND WEATHER ANIMATIONS
// 1) Light Raining no Lightning

var makeItRain = function () {
    //clear out everything
    $('.rain').empty();

    var increment = 0;
    var drops = "";
    var backDrops = "";

    while (increment < 100) {
        //couple random numbers to use for various randomizations
        //random number between 98 and 1
        var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
        //random number between 5 and 2
        var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
        //increment
        increment += randoFiver;
        //add in a new raindrop with various randomizations to certain CSS properties
        drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
        backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
    }

    $('.rain.front-row').append(drops);
    $('.rain.back-row').append(backDrops);
}

// $('.splat-toggle.toggle').on('click', function () {
//     $('body').toggleClass('splat-toggle');
//     $('.splat-toggle.toggle').toggleClass('active');
//     makeItRain();
// });

// $('.back-row-toggle.toggle').on('click', function () {
//     $('body').toggleClass('back-row-toggle');
//     $('.back-row-toggle.toggle').toggleClass('active');
//     makeItRain();
// });

//   $('.single-toggle.toggle').on('click', function() {
//     $('body').toggleClass('single-toggle');
//     $('.single-toggle.toggle').toggleClass('active');
//     makeItRain();
//   });

makeItRain();






// 2) Havy Rain with Thunder

var makeItRainHeavy = function () {
var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');
var canvas3 = document.getElementById('canvas3');
var ctx1 = canvas1.getContext('2d');
var ctx2 = canvas2.getContext('2d');
var ctx3 = canvas3.getContext('2d');

var rainthroughnum = 500;
var speedRainTrough = 120;
var RainTrough = [];

var rainnum = 500;
var rain = [];

var lightning = [];
var lightTimeCurrent = 0;
var lightTimeTotal = 0;

var w = canvas1.width = canvas2.width = canvas3.width = window.innerWidth;
var h = canvas1.height = canvas2.height = canvas3.height = window.innerHeight;
window.addEventListener('resize', function () {
    w = canvas1.width = canvas2.width = canvas3.width = window.innerWidth;
    h = canvas1.height = canvas2.height = canvas3.height = window.innerHeight;
});

function random(min, max) {
    return Math.random() * (max - min + 1) + min;
}

function clearcanvas1() {
    ctx1.clearRect(0, 0, w, h);
}

function clearcanvas2() {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
}

function clearCanvas3() {
    ctx3.globalCompositeOperation = 'destination-out';
    ctx3.fillStyle = 'rgba(0,0,0,' + random(1, 30) / 100 + ')';
    ctx3.fillRect(0, 0, w, h);
    ctx3.globalCompositeOperation = 'source-over';
};

function createRainTrough() {
    for (var i = 0; i < rainthroughnum; i++) {
        RainTrough[i] = {
            x: random(0, w),
            y: random(0, h),
            length: Math.floor(random(1, 830)),
            opacity: Math.random() * 0.2,
            xs: random(-2, 2),
            ys: random(10, 20)
        };
    }
}

function createRain() {
    for (var i = 0; i < rainnum; i++) {
        rain[i] = {
            x: Math.random() * w,
            y: Math.random() * h,
            l: Math.random() * 1,
            xs: -4 + Math.random() * 4 + 2,
            ys: Math.random() * 10 + 10
        };
    }
}

function createLightning() {
    var x = random(100, w - 100);
    var y = random(0, h / 4);

    var createCount = random(1, 3);
    for (var i = 0; i < createCount; i++) {
        single = {
            x: x,
            y: y,
            xRange: random(5, 30),
            yRange: random(10, 25),
            path: [{
                x: x,
                y: y
            }],
            pathLimit: random(40, 55)
        };
        lightning.push(single);
    }
};

function drawRainTrough(i) {
    ctx1.beginPath();
    var grd = ctx1.createLinearGradient(0, RainTrough[i].y, 0, RainTrough[i].y + RainTrough[i].length);
    grd.addColorStop(0, "rgba(255,255,255,0)");
    grd.addColorStop(1, "rgba(255,255,255," + RainTrough[i].opacity + ")");

    ctx1.fillStyle = grd;
    ctx1.fillRect(RainTrough[i].x, RainTrough[i].y, 1, RainTrough[i].length);
    ctx1.fill();
}

function drawRain(i) {
    ctx2.beginPath();
    ctx2.moveTo(rain[i].x, rain[i].y);
    ctx2.lineTo(rain[i].x + rain[i].l * rain[i].xs, rain[i].y + rain[i].l * rain[i].ys);
    ctx2.strokeStyle = 'rgba(174,194,224,0.5)';
    ctx2.lineWidth = 1;
    ctx2.lineCap = 'round';
    ctx2.stroke();
}

function drawLightning() {
    for (var i = 0; i < lightning.length; i++) {
        var light = lightning[i];

        light.path.push({
            x: light.path[light.path.length - 1].x + (random(0, light.xRange) - (light.xRange / 2)),
            y: light.path[light.path.length - 1].y + (random(0, light.yRange))
        });

        if (light.path.length > light.pathLimit) {
            lightning.splice(i, 1);
        }

        ctx3.strokeStyle = 'rgba(255, 255, 255, .1)';
        ctx3.lineWidth = 3;
        if (random(0, 15) === 0) {
            ctx3.lineWidth = 6;
        }
        if (random(0, 30) === 0) {
            ctx3.lineWidth = 8;
        }

        ctx3.beginPath();
        ctx3.moveTo(light.x, light.y);
        for (var pc = 0; pc < light.path.length; pc++) {
            ctx3.lineTo(light.path[pc].x, light.path[pc].y);
        }
        if (Math.floor(random(0, 30)) === 1) { //to fos apo piso
            ctx3.fillStyle = 'rgba(255, 255, 255, ' + random(1, 3) / 100 + ')';
            ctx3.fillRect(0, 0, w, h);
        }
        ctx3.lineJoin = 'miter';
        ctx3.stroke();
    }
};

function animateRainTrough() {
    clearcanvas1();
    for (var i = 0; i < rainthroughnum; i++) {
        if (RainTrough[i].y >= h) {
            RainTrough[i].y = h - RainTrough[i].y - RainTrough[i].length * 5;
        } else {
            RainTrough[i].y += speedRainTrough;
        }
        drawRainTrough(i);
    }
}

function animateRain() {
    clearcanvas2();
    for (var i = 0; i < rainnum; i++) {
        rain[i].x += rain[i].xs;
        rain[i].y += rain[i].ys;
        if (rain[i].x > w || rain[i].y > h) {
            rain[i].x = Math.random() * w;
            rain[i].y = -20;
        }
        drawRain(i);
    }
}

function animateLightning() {
    clearCanvas3();
    lightTimeCurrent++;
    if (lightTimeCurrent >= lightTimeTotal) {
        createLightning();
        lightTimeCurrent = 0;
        lightTimeTotal = 200;  //rand(100, 200)
    }
    drawLightning();
}

function init() {
    createRainTrough();
    // createRain();
    window.addEventListener('resize', createRainTrough);
}
init();

function animloop() {
    animateRainTrough();
    // animateRain();
    animateLightning();
    requestAnimationFrame(animloop);
}
animloop();

}
// 2) End









//   Main Weather icon Tilting Effect
const card = document.querySelector('.weather-icon');

card.addEventListener("mousemove", (event) => {
    const pointerX = event.clientX;
    const pointerY = event.clientY;

    const cardRec = card.getBoundingClientRect();

    const halfWidth = cardRec.width / 2;
    const halfHeight = cardRec.height / 2;

    const cardCenterX = cardRec.left + halfWidth;
    const cardCenterY = cardRec.top + halfHeight;

    const deltaX = pointerX - cardCenterX;
    const deltaY = pointerY - cardCenterY;

    const rx = deltaY / halfHeight;
    const ry = deltaX / halfWidth;
    const distanceToTheCenter = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    const maxDistance = Math.max(halfWidth, halfHeight);
    const degree = (distanceToTheCenter * 10) / maxDistance;
    card.style.transform = `perspective(400px) rotate3D(${-rx}, ${ry}, 0, ${degree}deg)`;
    // glass.style.transform = `translate(${-ry * 100}%, ${-rx * 100}%) scale(2.4)`;
    // glass.style.opacity = (distanceToTheCenter * 0.6) / maxDistance;
});
card.addEventListener("mouseleave", () => {
    card.style = null;
    // glass.style.opacity = 0;
});














// // Using weather API

let isHandlingInput = false;
function search() {
    let searchBar = document.querySelector(".container-top .search .city-name");
    let input = document.querySelector(".container-top .search .input-field");
    // Show the input field and hide the search bar on click
    searchBar.addEventListener("click", () => {
        searchBar.style.display = "none";
        input.style.display = "block";
        input.focus(); // Ensure the input gets focused
    });

    // Handle hiding on blur and updating the value
    input.addEventListener("focusout", (event) => {
        handleInputClose(event);
    });

    // Handle hiding and updating the value when pressing Enter
    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            handleInputClose(event);

        }
    });

    function checkWeatherCondition(data) {

        // Query selectors for dynamic updates
        let backgroundImage = document.querySelector(".background-animation");
        let weatherIcon = document.querySelector(".basic .weather-icon");
        let tempIcon = document.querySelector("details img");
        let weatherIcon2 = document.querySelector(".container-bottom .div1 .icon1 .weather-icon");
        // Update common details
        document.querySelector(".details .temp .temperature").innerText = `${data.main.temp}°C`;
        document.querySelector(".details .feels").innerText = `Feels like ${data.main.feels_like}°C`;
        document.querySelector(".details .weather").innerText = `${data.weather[0].main}`;
        document.querySelector(".div1 .unit .values").innerText = `${data.weather[0].description}`;
        document.querySelector(".div2 .unit .values .data").innerText = `${data.main.humidity}%`;
        document.querySelector(".div3 .unit .values .val1").innerText = `${data.wind.speed} m/s`;
        document.querySelector(".div3 .unit .values .val2").innerText = `${data.wind.deg}°`;
        document.querySelector(".div4 .unit .values .value").innerText = `${data.main.pressure} hPa`;
        document.querySelector(".div5 .unit .values .val1").innerText = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
document.querySelector(".div5 .unit .values .val2").innerText = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let currentTime = Math.floor(Date.now() / 1000);
        // Main weather condition and description
        const mainCondition = data.weather[0].main.toLowerCase();
        // const mainCondition = "clear";
        const description = data.weather[0].description.toLowerCase();

        if (data.main.temp < 5) {
            tempIcon.src = `./images/thermometer0.png`
        }
        else if (data.main.temp > 5 && data.main.temp < 50) {
            tempIcon.src = `./images/thermometer50.png`
        }
        else {
            tempIcon.src = `./images/thermometer80.png`
        }
        console.log("working")
        // Handle different weather conditions

        if (mainCondition === "rain") {
            weatherIcon.src = `./images/raining-cloud.png`;
            weatherIcon2.src = `./images/raining-cloud.png`;

            // Additional rain effects
            if (description === "light rain" || description === "moderate rain") {
                backgroundImage.style.backgroundImage = `url(./images/night/night3.png)`;
                // Rain animations
                // Light Raining No Lightning
                backgroundImage.innerText = `
        <div class="back-row-toggle splat-toggle">
            <div class="rain front-row"></div>
            <div class="rain back-row"></div>
        </div>`;
            }
            else {
                weatherIcon2.src = `./images/thunder-cloud.png`;
                backgroundImage.style.backgroundImage = `url(./images/night/night.png)`;
                // Thunder animation
                // 2) Havy Raining with Lightning
                backgroundImage.innerText = `
        <div class="thunder">
            <canvas id="canvas1"></canvas>
            <canvas id="canvas2"></canvas>
            <canvas id="canvas3"></canvas>
        </div>`;
        makeItRainHeavy();
            }
        } else if (mainCondition === "snow") {
            weatherIcon.src = `./images/snowfall-cloud.png`;
            // Additional snowfall animations
            document.querySelector(".snow.effect").style.display = "block";

            // note get three states of snow weather than implement this


        } else if (mainCondition === "clear") {
            let night = document.querySelector(".night-anime");
            let clouds = document.querySelector(".clouds");

            if (currentTime > data.sys.sunrise) {
                backgroundImage.style.backgroundImage = `url(./images/day.sunny-day.jpg)`;

                if (data.clouds.all > 0) {
                    // Day with clouds
                    weatherIcon.src = `./images/light-cloud.png`;
                    weatherIcon2.style.display = "none";
                } else {
                    // Sunny day
                    weatherIcon.style.display = "none";
                    weatherIcon2.style.display = "none";

                    document.querySelector(".container-bottom .div1 .icon").innerHTML = `<div class="sunny2 sunny"></div>`;
                    document.querySelector(".basic .icon").innerHTML = `<div class="sunny"></div>`;
                }
            } else {
                document.querySelector(".main-container").style.backgroundColor = `rgba(255, 255, 255, 0.1)`;

                const cityNameElement = document.querySelector(".search .city-name");
                const inputText = document.querySelector(".container-top .input-field");

                cityNameElement.style.background = "linear-gradient(220.55deg, #EAEAEA 0%, #8B8B8B 100%)";
                cityNameElement.style.webkitBackgroundClip = "text";
                cityNameElement.style.webkitTextFillColor = "transparent";

                inputText.style.background = "linear-gradient(220.55deg, #EAEAEA 0%, #8B8B8B 100%)";
                inputText.style.webkitBackgroundClip = "text";
                inputText.style.webkitTextFillColor = "transparent";


                if (data.clouds.all > 0) {
                    weatherIcon.src = `./images/moon-cloud.png`;
                    weatherIcon2.src = `./images/moon-cloud.png`;
                    // 3) Night with Clouds
                    backgroundImage.innerHTML = `
        <div class="night-anime">
            <div class="stars"></div>
            <div class="clouds"></div>
        </div>`;
                } else {
                    backgroundImage.style.backgroundImage = `url(./images/night/night3.png)`;
                    weatherIcon.src = `./images/half-moon-cloud.png`;
                    weatherIcon2.src = `./images/full-moon.png`;
                    backgroundImage.innerHTML = `
        <div class="night-anime">
            <div class="stars"></div>
        </div>`;
                }
            }




            // Hide rain/snow effects if previously active
            document.querySelector("back-row-toggle").style.display = "none";
            document.querySelector(".thunder").style.display = "none";
            document.querySelector(".snow.effect").style.display = "none";
        }
        else if (mainCondition === "clouds") {
            weatherIcon.src = `./images/happy-cloud.png`;
            if (currentTime > data.sys.sunrise){
                weatherIcon2.src = `light-cloud-day.png`;
            }
            else{
                weatherIcon2.src = `moon-cloud.png`;
            }
        }
        else if (mainCondition === "thunderstorm") {
            backgroundImage.style.backgroundImage = `url(./images/night/thunderstorm.jpg)`;
            weatherIcon.src = `./images/thunderstorm.png`;
            weatherIcon2.src = `./images/snowfall-cloud2.png`;
            // Thunder animation
                // 2) Havy Raining with Lightning
                backgroundImage.innerText = `
        <div class="thunder">
            <canvas id="canvas1"></canvas>
            <canvas id="canvas2"></canvas>
            <canvas id="canvas3"></canvas>
        </div>`;
        }
        else if (["mist", "haze", "fog"].includes(mainCondition)) {

            weatherIcon.src = `./images/haze.png`;
            if (currentTime > data.sys.sunrise ) {
                backgroundImage.style.backgroundImage = `url(./images/day/clear.jpg)`;

                weatherIcon2.src = `./images/light-cloud-day.png`
            }
            else {
                backgroundImage.style.backgroundImage = `url(./images/day/clear.jpg)`;
                weatherIcon2.src = `./images/half-moon-cloud.png`
            }
        } else {
            console.log("Unusual weather condition detected.");
        }
    }

    function getWeather(cityName) {
        const apiKey = "f9cdce05e49602cacc7433be245bc6f0";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

        axios.get(url)
            .then((response) => {
                // Check if the response is successful
                if (response.status === 200) {
                    console.log("Weather Data:", response.data);
                    // Process and update the weather details
                    try {
                        checkWeatherCondition(response.data);
                    } catch (error) {
                        console.log("Error processing weather data:", error.message);
                    }
                } else {
                    console.error("Unexpected response status:", response.status);
                    showError("Unexpected error occurred. Please try again.");
                }
            })
            .catch((error) => {
                // Handle errors during the API call
                if (error.response) {
                    // The API returned an error response
                    console.log("API Error:", error.response.status, error.response.data);
                    if (error.response.status === 404) {
                        alert("City not found. Please enter a valid city name.");
                    } else if (error.response.status === 401) {
                        console.log("Invalid API key. Please check your credentials.");
                    } else {
                        alert("An error occurred. Please try again.");
                    }
                } else if (error.request) {
                    // Request made but no response received
                    console.error("No response from API:", error.request);
                    alert("No response from the server. Please check your internet connection.");
                } else {
                    // Any other error
                    console.error("Error:", error.message);
                    alert("An unexpected error occurred. Please try again.");
                }
            });
    }







    function handleInputClose(event) {
        if (isHandlingInput) return; // Prevent multiple executions
        isHandlingInput = true;

        const container = document.querySelector(".container-top .search");
        if (!container.contains(event.relatedTarget) || event.type === "keypress") {
            searchBar.style.display = "block";
            input.style.display = "none";
            if (input.value.trim() !== "") {
                const searchValue = input.value; // Get the current input value
                searchBar.innerText = searchValue; // Display the input value
                console.log("Search Value:", searchValue); // Log updated value

                // Call the API to get weather details
                getWeather(searchValue);

            }
            input.value = ""; // Clear the input field for new entries
        }


        isHandlingInput = false;

    }
}



search();
