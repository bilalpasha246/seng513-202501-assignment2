import { Quiz } from "./quiz.js";
document.addEventListener("DOMContentLoaded", async () => {
  const quiz = new Quiz();
  await quiz.fetchQuestions();
  document.querySelector(".next").addEventListener("click", () => {
    quiz.nextQuestion();
  });
});