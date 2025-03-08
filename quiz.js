import {Question} from "./question.js"
export class Quiz {
    constructor(){
        this.questions = [];
        this.score = 0;
        this.token = null;
    }

    *questionGenerator() {
        for (const question of this.questions) {
          yield question;
        }
    }

    async initToken(){
        try{
            const res = await fetch("https://opentdb.com/api_token.php?command=request");
            const data = await res.json();
            this.token = data.token;
        }catch(exception){
            console.log(`Error generating token: ${exception}`)
        }
    }

    async fetchQuestions(){
        try{
            if (!this.token){
                await this.initToken();
            }
            const res = await fetch(`https://opentdb.com/api.php?amount=30&type=multiple&token=${this.token}`);
            const data = await res.json();
            if(data.response_code == 0){
                this.questions = data.results.map(
                    item => new Question(item.question, item.correct_answer, item.incorrect_answers, item.difficulty)
                );
                this.questionIterator = this.questionGenerator();
                this.displayQuestion();
            }
        }catch(error){
            console.log(`Error generating token: ${error}`)
        }
    }
    
    displayQuestion(){
        const container = document.getElementsByClassName("question")[0];
        const buttons = document.querySelectorAll(".multiple-choice button");
        const nextButton = document.getElementsByClassName("next")[0];
        const scoreText = document.getElementById("score")
        const nextResult = this.questionIterator.next();

        if (nextResult.done){
            this.fetchQuestions();
            return;
        }


        buttons.forEach(button => {
            button.style.outline = "0px solid black"     
        });
        const currentQuestion = nextResult.value;
        container.innerHTML = currentQuestion.text;
        const choices = currentQuestion.shuffleAnswers()
        nextButton.disabled = true;
        nextButton.style.opacity = "0.5";
        let j = 0;
        console.log(currentQuestion.correct)
        for(let i = 0; i < 4; i++){
            buttons[i].innerHTML = choices[i];
            buttons[i].disabled = false;
            buttons[i].onclick = () => {
                if (currentQuestion.isCorrectAnswer(buttons[i].innerHTML) && j==0){
                    console.log("true");
                    buttons[i].style.outline = "3px solid green";
                    this.score += 1;
                    scoreText.innerHTML = `Score: ${this.score}/10`
                    j = 1
                }
                else if (j != 1){
                    buttons[i].style.outline = "3px solid red";
                    j = 1
                }
                nextButton.disabled = false;
                nextButton.style.opacity = "1"; // Optional: make it fully visible
            };
        }

    }

    nextQuestion() {
        this.currentIndex++;
        this.displayQuestion();
    }

}