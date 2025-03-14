import { Quiz } from "./quiz.js";
import { User } from "./user.js"

document.addEventListener("DOMContentLoaded", async () => {
  const user = new User()
  const submitButton = document.querySelector(".submit");
  const usernameInput = document.getElementById("username");
  if(submitButton){
    submitButton.addEventListener("click", async () => {
      const usernameValue = usernameInput.value.trim();
      if (!usernameValue) {
        usernameInput.style.border = "2px solid red";
        return; 
      }
      else{
        usernameInput.style.border = "";
      }
      sessionStorage.setItem("username", usernameInput.value);
      window.location.replace("index.html");
    })
  }
if(window.location.pathname.includes("index.html")){ 
  const questionCount = document.getElementById("question-count")
  const countDown = document.getElementsByClassName("question")[0];
  const quiz = new Quiz();
  questionCount.innerHTML = `<b>${quiz.counter}</b> of <b>15</b>`
  await new Promise(resolve => setTimeout(resolve, 1000));
  countDown.innerHTML = "3"
  await new Promise(resolve => setTimeout(resolve, 1000));
  countDown.innerHTML = "2"
    await new Promise(resolve => setTimeout(resolve, 1000));
  countDown.innerHTML = "1"
  await new Promise(resolve => setTimeout(resolve, 1000));

  await quiz.fetchQuestions();
  document.querySelector(".next").addEventListener("click", async () => {
    if(quiz.counter == 16){
      sessionStorage.setItem("quiz_score", quiz.score);
      sessionStorage.setItem("quiz_diff", quiz.getlastdifficulty())
      window.location.replace("game-over.html");
    }
    questionCount.innerHTML = `<b>${quiz.counter}</b> of <b>15</b>`
    if(quiz.score%5 == 0 && quiz.score != 0){
      await quiz.fetchQuestions();
    }
    quiz.displayQuestion();
  });
}

if(window.location.pathname.includes("game-over.html")){
  const usernameUser = sessionStorage.getItem("username"); // Retrieve username
  const userScore = sessionStorage.getItem("quiz_score"); // Retrieve username
  const userDiff = sessionStorage.getItem("quiz_diff"); // Retrieve username
  console.log(usernameUser); // This will now correctly display the username 
  const userDat = {username: usernameUser, score: userScore}
  const containerCall = document.getElementsByClassName("attempt-call")[0];
  containerCall.innerHTML = user.finalMessage.call(userDat)
  if (userDiff !== null) {
    user.addHighScore(userScore, userDiff);
    sessionStorage.removeItem("quiz_diff");
  }

  user.displayRankings();
  document.querySelector(".retry").addEventListener("click", async () => {
    window.location.replace("index.html");
  });
}

});