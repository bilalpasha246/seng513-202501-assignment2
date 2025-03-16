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
        this.user = this.username
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
                this.high_scores[4] = [score,difficulty] //Removes the lowest score and resorts the leaderboard
                this.high_scores = this.sortFunction(this.high_scores)
                console.log("Sorted")
            }
        }
        sessionStorage.setItem("high_scores", JSON.stringify(this.high_scores));
        console.log(this.high_scores);
    }

    getHighScores(){
        return this.high_scores;
    }

    displayRankings(){
        const ranks = document.getElementById("leaderboard-body");
        for(let i = 0; i < this.high_scores.length; i++){ //Creates new rows and cells based on the amount of scores the user made (5 max)
            let row = ranks.insertRow(i); 
            row.insertCell(0).innerHTML = `${i+1}`;
            row.insertCell(1).innerHTML = `${this.username}`;
            row.insertCell(2).innerHTML = `${this.high_scores[i][0]}`;
            row.insertCell(3).innerHTML = `<b>${this.high_scores[i][1].charAt(0).toUpperCase() + this.high_scores[i][1].slice(1)}<b>`;        
        }
    }
}
    