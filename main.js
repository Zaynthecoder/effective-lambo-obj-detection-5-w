img = "";
status = "";
objects = [];

function setup() {
    canvas = createCanvas(380, 380);
    console.log("the canvas has been created");
    canvas.center();
    console.log("the canvas has been kept in the center");
    video = createCapture(VIDEO);
    console.log("video has been created");
    video.size(380, 380);
    video.hide();
    console.log("video has been hidden");

   

    
}

function modelLoaded() {
    console.log("yay, the model has been loaded, my amazing website should be able to detect objects now. ");
    status = true;
}

function preload() {
    //img = loadImage('a380.webp');
    console.log("image has not been loaded")
}

function draw() {
    image(video,0,0,380,380);
    

    if(status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);

        for (i=0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = objects.length + " objects detected"
            fill(r,g,b);

            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }


}

function gotResult(error, results) {
    if (error) {
        console.log( "there has been an error. the error is: " + error)
    }
    console.log(results);
    objects = results;

}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting the Objects in the image";
}