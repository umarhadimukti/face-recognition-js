let video = document.querySelector("#video");
let model;
let canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const startVideo = () => {
  navigator.mediaDevices
    .getUserMedia({
      video: {},
      audio: false,
    })
    .then((stream) => (video.srcObject = stream));
};

const detectFaces = async () => {
  const prediction = await model.estimateFaces(video, false);
  // console.log(prediction);
  ctx.drawImage(video, 0, 0, 530, 400);
  prediction.forEach((pred) => {
    ctx.beginPath();
    ctx.lineWidth = "4";
    ctx.strokeStyle = "yellow";
    ctx.rect(
      pred.topLeft[0],
      pred.topLeft[1],
      pred.bottomRight[1] - pred.topLeft[1],
      pred.bottomRight[1] - pred.topLeft[1]
    );
    ctx.stroke();
    ctx.fillStyle = "yellow";
    pred.landmarks.forEach((landmark) => {
      ctx.fillRect(landmark[0], landmark[1], 5, 5);
    });
  });
};

startVideo();

video.addEventListener("loadeddata", async () => {
  model = await blazeface.load();
  setInterval(detectFaces, 50);
});
