export class User {
    constructor(){
        this.high_scores = JSON.parse(sessionStorage.getItem("high_scores")) || [];
    }

    sortFunction(a, b) {
        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] > b[0]) ? -1 : 1;
        }
    }

    finalMessage(){
        return(`Congrats ${this.username}, your score on this run was ${this.score}/15`)
    }
    

    addHighScore(score, difficulty){

        if(this.high_scores.length < 5){
            this.high_scores.push([score, difficulty]);
            this.high_scores.sort(this.sortFunction);
        }
        else if(this.high_scores.length == 5){
            if(this.high_scores[4][0] <  score){
                this.high_scores[4] = [score,difficulty]
                this.high_scores.sort(this.sortFunction);
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
    