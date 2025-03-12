import { Quiz } from "./quiz.js";
import { User } from "./user.js"

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
  await new Promise(resolve => setTimeout(resolve, 3000));
  await quiz.fetchQuestions();
  document.querySelector(".next").addEventListener("click", async () => {
    if(quiz.score%5 == 0 && quiz.score != 0){
      await quiz.fetchQuestions();
    }
    if(quiz.counter == 16){
      localStorage.setItem("quiz_score", quiz.score);
      window.location.replace("game-over.html");
    }
    quiz.displayQuestion();
  });
}

if(window.location.pathname.includes("game-over.html")){
  const user = new User()
  const userData = { username: username, score: quiz_score };
  const message = user.finalMessage
  document.querySelector(".retry").addEventListener("click", async () => {
    window.location.replace("index.html");
  });
}

});