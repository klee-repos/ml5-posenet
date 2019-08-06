let video;
let poseNet;
// nose
let noseX = 0;
let noseY = 0;
// eye
let eyelX = 0;
let eyelY = 0;

function setup() {
  createCanvas(640,480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  // Listen to new 'pose' events
  poseNet.on("pose", getPoses);
}

function getPoses(poses) {
  console.log(poses)
  if (poses.length > 0) {

    let newEyelX = poses[0].pose.keypoints[1].position.x;
    let newEyelY = poses[0].pose.keypoints[1].position.y;
    eyelX = lerp(eyelX, newEyelX, 0.5);
    eyelY = lerp(eyelY, newEyelY, 0.5);

    let newNoseX = poses[0].pose.keypoints[0].position.x;
    let newNoseY = poses[0].pose.keypoints[0].position.y;
    noseX = lerp(noseX, newNoseX, 0.5);
    noseY = lerp(noseY, newNoseY, 0.5);


  }
}

function modelReady() {
  console.log('model loaded');
}

function draw() {
  image(video, 0, 0);
  let d = dist(noseX, noseY, eyelX, eyelY);  
  fill(255, 0, 0);
  ellipse(noseX, noseY, d);
  // fill(0, 0, 255);
  // ellipse(eyelX, eyelY, 50);
}