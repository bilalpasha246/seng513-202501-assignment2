export class User {
    constructor(){
        this.username = "default"
        this.high_scores = [];
    }

    sortFunction(a, b) {
        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    }

    finalMessage(){
        return(`Congrats ${this.username}, your score on this run was ${this.score}/15`)
    }
    

    addHighScore(difficulty, score){
        for(let i = 4; i >= 0; i--){
            if(this.high_scores.length < 5){
                this.high_scores.push(difficulty, score);
                high_scores.sort(this.sortFunction);
                break;
            }
            else if(i <= this.high_scores.length()-1){
                if(this.high_scores[i][1] <  score){
                    this.high_scores[0][1] = score;
                    this.high_scores.sort(this.sortFunction);
                }
            }
        }
    }
    
}