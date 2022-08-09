Status = "";
objects = [];
alarm = "";

function preload() {
    alarm = loadSound('alarm.mp3');
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    coco = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status: detecting objects";
}

function modelloaded() {
    console.log("model is loaded");
    Status = true;
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (Status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        coco.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == "person") {
                document.getElementById("objects").innerHTML = "Baby Found";
                console.log("stop");
                song.stop();
            }
            else {
                document.getElementById("objects").innerHTML = "Baby Not Found";
                console.log("play");
                song.play();
            }

        }
        if (objects.length == 0) {
            alarm.play();
            document.getElementById("objects").innerHTML = "Status : Baby is not detected";
        }
    }
}
