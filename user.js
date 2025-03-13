export class User {
    constructor(){
        this.high_scores = JSON.parse(sessionStorage.getItem("high_scores")) || [];
    }

    sortFunction(twodarr) {
        for(let i = 0; i < twodarr.length; i++){
            for(let j = i+1; j < twodarr.length; j++){
                if(Number(twodarr[i][0]) < Number(twodarr[j][0])){
                    let temp = twodarr[j];
                    twodarr[j] = twodarr[i];
                    twodarr[i] = temp;
                }
            }
        }
        return twodarr;
    }



    finalMessage(){
        return(`Congrats ${this.username}, your score on this run was ${this.score}/15`)
    }
    

    addHighScore(score, difficulty){

        if(this.high_scores.length < 5){
            this.high_scores.push([score, difficulty]);
            this.high_scores = this.sortFunction(this.high_scores)
        }
        else if(this.high_scores.length == 5){
            console.log(`The score is ${score}`)
            if(Number(this.high_scores[4][0]) <  Number(score)){
                this.high_scores[4] = [score,difficulty]
                this.high_scores = this.sortFunction(this.high_scores)
                console.log("Sorted")
            }
        }
        sessionStorage.setItem("high_scores", JSON.stringify(this.high_scores));
        console.log(this.high_scores);
    }

    displayRankings(){
        const ranks = document.querySelectorAll(".leaderboard li");
        for(let i = 0; i < this.high_scores.length; i++){
            ranks[i].innerHTML = `Score: ${this.high_scores[i][0]}/15, Difficulty: ${this.high_scores[i][1]}`;
        }
    }
}
    