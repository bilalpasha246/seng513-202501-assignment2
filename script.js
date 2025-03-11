import { Quiz } from "./quiz.js";

document.addEventListener("DOMContentLoaded", async () => {
  const submitButton = document.querySelector(".submit");
  if(submitButton){
    submitButton.addEventListener("click", async () => {
      const usernameInput = document.getElementById("username");

      if(usernameInput) {
        localStorage.setItem("username", usernameInput.value);
        window.location.replace("index.html");
      }
    })
  }

if(window.location.pathname.includes("index.html")){
  const username = localStorage.getItem("username"); // Retrieve username
  console.log(username); // This will now correctly display the username  
  const quiz = new Quiz();
  quiz.score = 0;  // Reset score when starting a new game
  quiz.incorrect = false; // Reset incorrect flag
  await quiz.fetchQuestions();
  document.querySelector(".next").addEventListener("click", async () => {
    if(quiz.incorrect == false){
      if(quiz.score%5 == 0 && quiz.score != 0){
        await quiz.fetchQuestions();
      }
      if(quiz.score == 15){
        localStorage.setItem("quiz_score", quiz.score);
        window.location.replace("game-over.html");
      }
      quiz.displayQuestion();
    }
    else{
      localStorage.setItem("quiz_score", quiz.score);
      window.location.replace("game-over.html");
    }
  });
}

if(window.location.pathname.includes("game-over.html")){
  document.querySelector(".retry").addEventListener("click", async () => {
    window.location.replace("index.html");
  });
}

});