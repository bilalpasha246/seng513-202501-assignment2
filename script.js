import { Quiz } from "./quiz.js";

document.addEventListener("DOMContentLoaded", async () => {
  const quiz = new Quiz();
  await quiz.fetchQuestions();
  document.querySelector(".next").addEventListener("click", async () => {
    if(quiz.incorrect == false){
      if(quiz.score%5 == 0 && quiz.score != 0){
        await quiz.fetchQuestions();
      }
      quiz.displayQuestion();
    }
    else{
      window.location.replace("game-over.html");
    }

  });
});