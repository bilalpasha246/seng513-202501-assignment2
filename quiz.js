import {Question} from "./question.js"
export class Quiz {
    constructor(){
        this.questions = [];
        this.score = 0;
        this.token = null;
        this.start = 0;
        this.counter = 1;
        this.fetchedDiff = [true,true]
        this.lastDiff = null;
    }



    *questionGenerator() {
        for (const question of this.questions) {
          yield question;
        }
    }

    getlastdifficulty(){
        return this.lastDiff;
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
        var getDat = false;
        try{
            if (!this.token){
                await this.initToken();
            }
            let res; 
            if(this.score < 5){
                res = await fetch(`https://opentdb.com/api.php?amount=15&difficulty=easy&type=multiple&token=${this.token}`);
                console.log("easy");
                getDat = true;  
            }
            else if(this.score < 10 & this.fetchedDiff[0]){
                res = await fetch(`https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple&token=${this.token}`);
                console.log("medium");  
                this.fetchedDiff[0] = false;
                getDat = true;   
            }
            else if(this.score >= 10 && this.fetchedDiff[1]){
                res = await fetch(`https://opentdb.com/api.php?amount=10&difficulty=hard&type=multiple&token=${this.token}`);
                console.log("hard");
                this.fetchedDiff[1] = false;
                getDat = true;       
            }
            if(getDat == true){
                const data = await res.json();
                if(data.response_code == 0){
                    this.questions = data.results.map(
                        item => new Question(item.question, item.correct_answer, item.incorrect_answers, item.difficulty)
                    );
                    this.questionIterator = this.questionGenerator();
                    if(this.start == 0){
                        this.displayQuestion();
                        this.start += 1;
                    }
                }
                getDat = false;
            }
        }catch(error){
            console.log(`Error token: ${error}`)
        }
    }
    
    displayQuestion(){
        const container = document.getElementsByClassName("question")[0];
        const buttons = document.querySelectorAll(".multiple-choice button");
        const nextButton = document.getElementsByClassName("next")[0];
        const scoreText = document.getElementById("score");
        const diffText = document.getElementById("difficulty");
        const nextResult = this.questionIterator.next();

        if (nextResult.done){
            this.fetchQuestions();
            return;
        }
        buttons.forEach(button => {
            button.style.outline = "0px solid black"     
        });
        const currentQuestion = nextResult.value;
        diffText.innerHTML = `Difficulty: ${currentQuestion.difficulty}`
        container.innerHTML = `Question ${this.counter}: ${currentQuestion.text}`;
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
                    scoreText.innerHTML = `Score: ${this.score}/15`
                    j = 1
                }
                else if (j != 1){
                    buttons[i].style.outline = "3px solid red";
                    for(let k = 0; k < 4; k++){
                        if (currentQuestion.isCorrectAnswer(buttons[k].innerHTML)){
                            buttons[k].style.outline = "3px solid green";
                        }
                    }
                    j = 1
                }
                this.lastDiff = currentQuestion.difficulty
                nextButton.disabled = false;
                nextButton.style.opacity = "1"; // Optional: make it fully visible
                this.counter += 1;
            };
        }

    }
}