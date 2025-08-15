 let score =JSON.parse(localStorage.getItem('score')) || {
        player: 0,
        computer: 0,
        ties: 0
      };

      updateScore();


      const playerMove = ''; 
        // Function to pick a random move for the computer
        function pickComputerMove() {
          const randomNumber = Math.random();
          let computerMove = '';

          if (randomNumber < 0.34) {
            computerMove = 'Rock';
          } else if (randomNumber <= 0.67) {
            computerMove = 'Paper';
          } else {
            computerMove = 'Scissors';
          }
          
          return computerMove;
        } 
        let  isAutoPlaying =  false;
        let intervelId;

        function autoPlay () {
          if (!isAutoPlaying) {
            intervelId =   setInterval(() => {
            const playerMove =     pickComputerMove(); 
            playGame(playerMove);
          }, 2000);
          isAutoPlaying = true;

          } else {
            clearInterval(intervelId);
            isAutoPlaying = false;
          }
        } 
        
        
        document.querySelector('.js-rock-button').addEventListener('dblclick',() => {
          playGame('Rock');
        });

        document.querySelector('.js-Paper-button').addEventListener('dblclick',() => {
          playGame('Paper');
        });

        document.querySelector('.js-Scissors-button').addEventListener('dblclick',() => {
          playGame('Scissors');
        });

        document.body.addEventListener('keydown', (event) => {
          if (event.key === 'r') {
            playGame('Rock');
          } else if (event.key === 'p') {
            playGame('Paper');
          } else if (event.key === 's') {
            playGame('Scissors');
          }
        });



        function playGame(playerMove) {
          const computerMove = pickComputerMove();
          let result = '';

          if (playerMove === computerMove) {
            result = 'It\'s a tie !';
          } else if (
            (playerMove === 'Rock' && computerMove === 'Scissors') ||
            (playerMove === 'Paper' && computerMove === 'Rock') ||
            (playerMove === 'Scissors' && computerMove === 'Paper')
          ) {
            result = 'You won !';
          } else {
            result = 'You lost!';
          }
           if (result === 'You won !') {
            score.player += 1;
          
           } else if (result === 'You lost!') {
            score.computer += 1;

           } else {
            score.ties += 1;
           };

           localStorage.setItem('score',
           JSON.stringify(score));

           updateScore();

           document.querySelector('.js-result').innerHTML = result;
           document.querySelector('.js-moves').innerHTML = 
             ` You
               <img src="images/${playerMove}-emoji.png" class="button-icon">
      
                <img src="images/${computerMove}-emoji.png"   class="button-icon">
              Computer`}; 
        
        function updateScore() {
          document.querySelector('.js-score')
            .innerHTML = `Player: ${score.player}, Computer: ${score.computer}, Ties: ${score.ties}`;
        };

        
     
