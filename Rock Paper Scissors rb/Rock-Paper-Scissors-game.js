 let score =JSON.parse(localStorage.getItem('score')) || {
        player: 0,
        computer: 0,
        ties: 0
      };

      updateScore();



      const playerMove = ''; 
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
            intervelId = setInterval(() => {
            const playerMove =     pickComputerMove(); 
            playGame(playerMove);
          }, 2000);
          isAutoPlaying = true;

          document.querySelector('.js-auto-play-button').innerHTML = 'Stop playing';
          document.querySelector('.js-auto-play-button').classList.add('is-auto-playing');
         

          } else {
            clearInterval(intervelId);
            isAutoPlaying = false;

            document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
            document.querySelector('.js-auto-play-button').classList.remove('is-auto-playing');
          }
        };

        let  autoPlayMode = document.querySelector('.js-auto-play-button ');
         autoPlayMode.addEventListener('dblclick',() => {autoPlay()});
        
        document.querySelector('.js-rock-button').addEventListener('click',() => {
          playGame('Rock');
        });

        document.querySelector('.js-Paper-button').addEventListener('click',() => {
          playGame('Paper');
        });

        document.querySelector('.js-Scissors-button').addEventListener('click',() => {
          playGame('Scissors');
        });

        document.body.addEventListener('keydown', (event) => {
          if (event.key === 'r') {
            playGame('Rock');
          } else if (event.key === 'p') {
            playGame('Paper');
          } else if (event.key === 's') {
            playGame('Scissors');
          } else if (event.key === 'a') {
            autoPlay();
          } else if (event.key === 'Escape') { 
            showResetConfirmation();
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
          
           } else if (result === 'You lost !') {
            score.computer += 1;

           } else {
            score.ties += 1;
           }

           localStorage.setItem('score',
           JSON.stringify(score));

           updateScore();

           document.querySelector('.js-result').innerHTML = result;
           document.querySelector('.js-moves').innerHTML = 
             ` You
               <img src="images/${playerMove}-emoji.png" class="button-icon">
      
                <img src="images/${computerMove}-emoji.png"   class="button-icon">
              Computer`;

          
        }  
        
        function updateScore() {
          document.querySelector('.js-score')
            .innerHTML = `Player: ${score.player} Computer:  ${score.computer} Ties: ${score.ties}`;

        }

       function resetScore() {
          score = {
            player: 0,
            computer: 0,
            ties: 0
          };
          localStorage.removeItem('score');
          updateScore();
        }

        document.querySelector('.js-reset-score-button')
      .addEventListener('click', () => {
        showResetConfirmation();
      });
    function showResetConfirmation() {
      document.querySelector('.js-reset-confirmation')
        .innerHTML = `
      Are you sure you want to reset the score?
      <button class="js-reset-confirm-yes reset-confirm-button">
        Yes
      </button>
      <button class="js-reset-confirm-no reset-confirm-button">
        No
      </button>
    `;
  document.querySelector('.js-reset-confirm-yes')
    .addEventListener('click', () => {
      resetScore();
      hideResetConfirmation();
    });
  
  document.querySelector('.js-reset-confirm-no')
    .addEventListener('click', () => {
      hideResetConfirmation();
    });
}

function hideResetConfirmation() {
  document.querySelector('.js-reset-confirmation')
    .innerHTML = '';
}