import { Quiz } from "./quiz.js";
import { User } from "./user.js"

document.addEventListener("DOMContentLoaded", async () => {
  const user = new User()
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
  const usernameUser = localStorage.getItem("username"); // Retrieve username
  const userScore = localStorage.getItem("quiz_score"); // Retrieve username
  console.log(usernameUser); // This will now correctly display the username 
  const userDat = {username: usernameUser, score: userScore}
  const containerCall = document.getElementsByClassName("attempt-call")[0];
  containerCall.innerHTML = user.finalMessage.call(userDat)
  document.querySelector(".retry").addEventListener("click", async () => {
    window.location.replace("index.html");
  });
}

});