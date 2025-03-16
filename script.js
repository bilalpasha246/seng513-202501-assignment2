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
        usernameInput.style.border = "2px solid red"; //Only allows user to proceed if they insert a Username
        return; 
      }
      else{
        usernameInput.style.border = "";
      }
      sessionStorage.setItem("username", usernameInput.value); //Sessionsstorage is use to save users name until they close
      window.location.replace("index.html"); //redirects user to the main html
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
    if(quiz.counter == 16){ //goes to the end screen if the user does 15 questions
      sessionStorage.setItem("quiz_score", quiz.score); //stores users highest score reached
      sessionStorage.setItem("quiz_diff", quiz.getlastdifficulty()) //stores the users highest difficulty reached
      window.location.replace("game-over.html");
    }
    questionCount.innerHTML = `<b>${quiz.counter}</b> of <b>15</b>`
    if(quiz.score%5 == 0 && quiz.score != 0){
      await quiz.fetchQuestions(); //uses the fetch questions to get harder questions
    }
    quiz.displayQuestion(); //displays questions using this
  });
}

if(window.location.pathname.includes("game-over.html")){
  const usernameUser = sessionStorage.getItem("username"); // Retrieve username
  const userScore = sessionStorage.getItem("quiz_score"); // Retrieve userscore
  const userDiff = sessionStorage.getItem("quiz_diff"); // Retrieve user difficulty
  var userDat = {username: usernameUser, score: userScore}
  const containerCall = document.getElementsByClassName("attempt-call")[0];
  containerCall.innerHTML = user.finalMessage.call(userDat) //Call is used to help display the usersname
  if (userDiff !== null) {
    user.addHighScore(userScore, userDiff);
    sessionStorage.removeItem("quiz_diff");
  }
  const highScores = user.getHighScores();
  userDat = {username: usernameUser, high_scores: highScores}
  user.displayRankings.call(userDat); //Call is used to display the users name and rankings associated with user
  document.querySelector(".retry").addEventListener("click", async () => {
    window.location.replace("index.html");
  });
}

});