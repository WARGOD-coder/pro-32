const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backgroundImg;
var dateTimeObject;
var bg;

function preload() {
    // create getBackgroundImg( ) here
    getBackgroundImg();

}

function setup() {
    var canvas = createCanvas(1200,700);
    engine = Engine.create();
    world = engine.world;

}


function draw() {

    // add condition to check if any background image is there to add
    if (backgroundImg) {
        background(backgroundImg);
        Engine.update(engine);

        // write code to display time in correct format here
        const formattedTimeString = dateTimeObject.toLocaleTimeString();
        
        text("Time: " + formattedTimeString, 900, 50);
        textSize(35);
        fill ("white");
    }
}

async function getBackgroundImg() {
    // write code to fetch time from API
    const response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    //change the data in JSON format
    const responseJson = await response.json();
    // write code slice the datetime
    const hour = responseJson.datetime.slice(11,13);

    dateTimeObject = new Date(responseJson.datetime);

    var sunRiseOrSet, imageNumber;
        // add conditions to change the background images from sunrise to sunset
    if (hour >= 04 && hour <= 16) {
        sunRiseOrSet = "rise";
    } else {
        sunRiseOrSet = "set";
    }
    if (hour >= 04 && hour <= 06) {
        imageNumber = 1;
    } else if (hour >= 06 && hour <= 08) {
        imageNumber = 2;
    } else if (hour >= 08 && hour <= 10) {
        imageNumber = 3;
    } else if (hour >= 10 && hour <= 12) {
        imageNumber = 4;
    } else if (hour >= 12 && hour <= 14) {
        imageNumber = 5;
    } else if (hour >= 14 && hour <= 16) {
        imageNumber = 6;
    } else if (hour >= 16 && hour <= 18) {
        imageNumber = 7;
    } else if (hour >= 18 && hour <= 20) {
        imageNumber = 8;
    } else if (hour >= 20 && hour <= 23) {
        imageNumber = 9;
    } else if (hour >= 23 && hour == 03) {
        imageNumber = 10;
    } else if (hour == 0 && hour <= 03) {
        imageNumber = 11;
    } else {
        imageNumber = 12;
    }
    bg = `sun${sunRiseOrSet}${imageNumber}.png`;
    //load the image in backgroundImg variable here
    backgroundImg = loadImage(bg);
}
