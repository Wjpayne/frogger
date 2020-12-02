// animation functions
function animate() {
  ctx1.clearRect(0, 0, canvas.width, canvas.height);
  ctx2.clearRect(0, 0, canvas.width, canvas.height);
  ctx3.clearRect(0, 0, canvas.width, canvas.height);
  ctx4.clearRect(0, 0, canvas.width, canvas.height);
  ctx5.clearRect(0, 0, canvas.width, canvas.height);

  handleRipples();
  handleParticles();
  handleObstacles();
  ctx2.drawImage(background_lvl2, 0, 0);
  frogger.draw();
  frogger.update();
  ctx4.drawImage(grass, 0, 0);
  frame++;
  handleScoreBoard();
  requestAnimationFrame(animate);
}

animate();

//eventListenern to make frog move

window.addEventListener("keydown", function (e) {
  keys = [];
  keys[e.keyCode] = true;
  if (keys[37] || keys[38] || keys[39] || keys[40]) {
    frogger.jump();
  }
});

window.addEventListener("keyup", function (e) {
  delete keys[e.keyCode];
  frogger.moving = false;
  frogger.frameX = 0;
});



upArrow = () => {
  frogger.jump();


  if ((frogger.moving = true)) {
    frogger.y -= grid;
    frogger.moving = true;
    frogger.frameX = 1;
    frogger.frameY = 0;
  }
  return frogger.moving === false;
  
};

downArrow = () => {
    frogger.jump();
    
  
    if (frogger.moving === true && frogger.y < canvas.height - frogger.height * 2) {
        frogger.y += grid;
        frogger.moving = true;
        frogger.frameY = 3;
      }
      
    }

    leftArrow = () => {
        frogger.jump();
        
        if (frogger.moving === true && frogger.x > frogger.width) {
            frogger.x -= grid;
            frogger.moving = true;
            frogger.frameY = 2;
          }
    }

    rightArrow = () => {
        frogger.jump();
        
        if (frogger.moving === true && frogger.x < canvas.width - frogger.width * 2) {
            frogger.x += grid;
            frogger.moving = true;
            frogger.frameY = 1;
          }
    }



//keeping score

function scored() {
  score++;
  gameSpeed += 0.09;
  frogger.x = canvas.width / 2 - frogger.width / 2;
  frogger.y = canvas.height - frogger.height - 40;
}

//scoredboard

function handleScoreBoard() {
  ctx4.fillStyle = "black";
  ctx4.strokeStyle = "black";
  ctx4.font = "15px Verdana";
  ctx4.strokeText("Score", 265, 15);
  ctx4.font = "60px Verdana";
  ctx4.fillText(score, 270, 65);
  ctx4.font = "15px Verdana";
  ctx4.strokeText("Collisions: " + collisionCount, 10, 175);
  ctx4.strokeText("Game Speed: " + gameSpeed.toFixed(1), 10, 195);
}

// collision detection between two rect.

function collision(first, second) {
  return !(
    first.x > second.x + second.width ||
    first.x + first.width < second.x ||
    first.y > second.y + second.height ||
    first.y + first.height < second.y
  );
}

function resetGame() {
  frogger.x = canvas.width / 2 - frogger.width / 2;
  frogger.y = canvas.height - frogger.height - 40;
  score = 0;
  collisionCount++;
  gameSpeed = 1;
}
