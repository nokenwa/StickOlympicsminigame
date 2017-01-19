# StickOlympicsminigame
My first game. For some University Coursework

Message To lecturers;

As you may notice this game is not complete and does not necessarily show complete functionality as a game.
However it does show that I have been able to demonstrate programming skills and make them work.
Please be aware that some items may be slightly out of place graphically when run.
I will be the first to admit that I am a terrible artist but a decent (ish) programmer
I have labeled things that I wanted to change or ideas that I had too late to put into this submission.


Please Note:
-The Swimming Game does not work. I broke it right before the deadline and couldn't find what I did wrong. If you click on it P5 will  CRASH SO DO NOT Please!!!
-More games may be added as functions very easily, I hope to do this for the 2nd half of my coursework.
-The JSON file loaded only changes the name, gender, colour and trophy cabinet. In the second coursework I will also add high scores nd nationality;
-The Running animation was done using modulus of the movement speed, however as the speed of the player increases it begins to run 'faster then the frames per second' creating a slow motion effect. I will fix this in the 2nd piece of Coursework

I have included every thing you are looking for in my code and more. Use this guide below to find where I have used certain Programming concepts in my code

        Variables:  -There are many variables (lines 4 - 25)
                    -The navbar is an object made up of objects (e.g. line 89)
                    -The User variable is an object made up of data to control the player and can be loaded from a JSON file.(line 685)
    If Statements:
   & Control flow:  -A variable holds the current state of the game. (lines 4 & line 57)
                    -This variable is called as a function in draw calling each gamestate unless the variable holding the gamesates is changed.
                    -If statements are used to control clicks of all buttons. It checks the position of the mouse and compares it to button whenever the mouse is clicked. It will return a boolean if mouse is over button (line 762)

        Functions:  -There are several functions 
                    -Most of these functions take in parameters (e.g line 414)
                    -Many functions return objects (e.g. line 367)
        
           Arrays:  -There are arrays used to hold paths for assets such as sounds and images (lines 6-11)
                    -An array holds the trophies in the trophy cabinet (lines 516 to lines 551)
Thanks
                    

 