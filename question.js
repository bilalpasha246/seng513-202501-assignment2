export class Question {
    constructor(questionText, correctAnswer, incorrectAnswers, difficulty){
        this.text = questionText;
        this.correct = correctAnswer;
        this.incorrect = incorrectAnswers;
        this.difficulty = difficulty;
    }


shuffleAnswers() {
    const choices = [...this.incorrect, this.correct];
    let currentIndex = choices.length;
    while (currentIndex !== 0){
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [choices[currentIndex], choices[randomIndex]] = [choices[randomIndex], choices[currentIndex]];
      }
      return choices;
}

isCorrectAnswer(choice) {
    return choice === this.correct;
}
}
