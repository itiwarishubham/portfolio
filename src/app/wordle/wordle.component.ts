import { Component, OnInit, HostListener } from '@angular/core';
import words from '../../assets/json/words.json';
import { WordleService } from '../service/wordle.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.scss']
})
export class WordleComponent implements OnInit {

  tileCount: number = 0
  currentWord: string = ""
  end: number = 5
  start: number = 0
  isGameOver: boolean = false
  guessCount: number = 0
  meaning: string = ''
  score: number=0;
  storage = window.localStorage;

  //audio: HTMLAudioElement = new Audio('assets/audio/game.mp3');
  constructor(private wordleService: WordleService, private userService: UserService) {
  }

  increaseScore(){
    this.score++;
    this.updateScoreInLocalStorage(this.score)
  }

  resetScore(){
    this.score = 0;
    this.updateScoreInLocalStorage(this.score)
  }

  updateScoreInLocalStorage(score: number){
    this.storage.setItem('score', ''+score);
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    const div = document.getElementById('' + this.tileCount) as HTMLDivElement;
    div.style.borderStyle = 'dashed'
    this.score = Number(this.storage.getItem('score'))
  }

  numbers: number[] = Array.from({ length: 30 }, (_, i) => i);
  generateSecretWord(): string {
    const word = words[Math.floor(Math.random() * words.length)];
    this.setMeaning(word)
    return word;
  }
  // Define the target word as a string
  secretWord: string = this.generateSecretWord();

  // toggleVolume() {
  //   const soundIcon = document.getElementById("sound-icon");
  //   if(soundIcon?.classList.value === 'fas fa-volume-xmark'){
  //     this.playAudio()
  //   }else{
  //     this.stopAudio()
  //   }
  //   soundIcon?.classList.toggle("fa-volume-xmark");
  //   soundIcon?.classList.toggle("fa-volume-high");
  // }

  setMeaning(word: string){
    this.wordleService.getMeaning(word).subscribe(
      response => {
        this.meaning = response.meanings[0].definitions[0].definition
      },
      error => {
        this.meaning = error.error
      }
    );
  }

  onClick(event: MouseEvent) {
    const key = (event.currentTarget as HTMLButtonElement).value.toLowerCase();
    this.playing(key, event)
  }
  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    const keyCode = event.keyCode || event.which;
    // Allow only alphabet characters, backspace and enter key
    if ((keyCode >= 65 && keyCode <= 90) || (key === 'backspace') || (keyCode === 13)) {
      this.playing(key, event)
    }
  }

  // Game Sound
  // playAudio() {
  //   this.audio.loop = true;
  //   this.audio.play();
  // }

  // pauseAudio() {
  //   this.audio.pause();
  // }
  
  // stopAudio() {
  //   this.audio.pause();
  //   this.audio.load();
  // }  

  updateCurrentWord(char: string) {
    this.currentWord += char
  }

  charMatches(guessWord: string, secretWord: string): string[] {
    const matches: string[] = [];

    for (let i = 0; i < guessWord.length; i++) {
      if (guessWord[i] === secretWord[i]) {
        matches.push('green');
      } else if (secretWord.includes(guessWord[i])) {
        matches.push('orange');
      } else {
        matches.push('gray');
      }
    }

    return matches;
  }


  isInWords(str: string): boolean {
    return words.includes(str);
  }

  changeColor(colorArr: string[]) {
    for (let i = this.start, j = 0; i < this.end; i++, j++) {
      if (colorArr[j] === 'red') {
        const div = document.getElementById('' + i) as HTMLDivElement;
        div.style.borderColor = colorArr[j];
      } else {
        const div = document.getElementById('' + i) as HTMLDivElement;
        div.style.backgroundColor = colorArr[j];
        //div.style.color = 'white'
      }

      if (colorArr[j] !== 'red') {
        const keypadDiv = document.getElementById('' + this.currentWord.charAt(j)) as HTMLDivElement;
        keypadDiv.style.backgroundColor = colorArr[j];
      }
    }
  }

  playAgain() {
    this.resetTileColor();
    this.resetKeyPadColor()
    const alphabet: string = "abcdefghijklmnopqrstuvwxyz";
    const lettersArray: string[] = alphabet.split("");
    this.secretWord = this.generateSecretWord()
    this.isGameOver = false;
    this.guessCount = 0
    const div = document.getElementById('' + this.tileCount) as HTMLDivElement;
    div.style.borderStyle = 'dashed'
  }
  resetTileColor() {
    const last = document.getElementById('' + (this.tileCount - 1)) as HTMLDivElement;
    last.style.borderStyle = 'solid'
    for (let i = 0; i < 30; i++) {
      let div = document.getElementById('' + i) as HTMLDivElement;
      div.innerHTML = ''
      div.style.color = ''
      div.style.backgroundColor = '';
      div.style.borderStyle = '';
      this.start = 0
      this.end = 5
      this.tileCount = 0
    }
  }
  resetKeyPadColor() {
    const alphabet: string = "abcdefghijklmnopqrstuvwxyz";
    const lettersArray: string[] = alphabet.split("");
    for (let i = 0; i < lettersArray.length; i++) {
      let div = document.getElementById(lettersArray[i]) as HTMLDivElement;
      div.style.color = ''
      div.style.backgroundColor = '';
      this.start = 0
      this.end = 5
      this.tileCount = 0
    }
  }

  resetInvalidWordRowColor(reset: boolean){
    if(reset){
      for(let i = this.start;i<this.end;i++){
        const div = document.getElementById('' + i) as HTMLDivElement;
        div.style.borderColor = ''
      }
    }
  }

  focusOnTile(key: string) {
    if (this.currentWord.length < 5 && this.tileCount < 30) {
      if (key === 'backspace' && this.currentWord.length < 5) {
        const cur = document.getElementById('' + (this.tileCount + 1)) as HTMLDivElement;
        const prev = document.getElementById('' + (this.tileCount)) as HTMLDivElement;
        if(cur)cur.style.borderStyle = 'solid'
        prev.style.borderStyle = 'dashed'
        let color = prev.style.borderColor === 'red';
        this.resetInvalidWordRowColor(color)
      } else {
        const cur = document.getElementById('' + (this.tileCount)) as HTMLDivElement;
        const prev = document.getElementById('' + (this.tileCount - 1)) as HTMLDivElement;
        cur.style.borderStyle = key === 'backspace' ? 'solid' : 'dashed'
        prev.style.borderStyle = key === 'backspace' ? 'dashed' : 'solid'
        let color = prev.style.borderColor === 'red';
        this.resetInvalidWordRowColor(color)
      }
    }
  }

  onDelete(key: string) {
    let ele = document.getElementById("" + (--this.tileCount)) as HTMLDivElement
    if (ele) ele.innerHTML = ''
    this.currentWord = this.currentWord.slice(0, -1)
    this.focusOnTile(key)
  }

  playing(key: string, event: MouseEvent | KeyboardEvent) {
    if (this.currentWord.length == 5 && !this.isGameOver) {
      if (key === 'backspace') {
        this.onDelete(key)
      } else if (key === 'enter') {
        if (this.isInWords(this.currentWord)) {
          let res: string[] = this.charMatches(this.currentWord, this.secretWord);
          this.changeColor(res)
          let answer: boolean = this.currentWord === this.secretWord;
          this.isGameOver = answer;
          if(answer){
            this.increaseScore();
          }
          this.guessCount++
          if (this.guessCount == 6 && !answer) {
            this.isGameOver = true;
            this.resetScore();
            alert("6 Guess is Over and SecretWord is: " + this.secretWord)
          }else if(this.guessCount == 6 && answer){
            this.isGameOver = true;
          }
          this.currentWord = ''
          this.start = this.end;
          this.end = this.start + 5
          this.focusOnTile(key)
        } else {
          const res: string[] = new Array(10).fill('red');
          this.changeColor(res)
        }
      }
    } else if(!this.isGameOver) {
      if (key === 'backspace' && this.currentWord.length != 0) {
        this.onDelete(key)
      } else if (key === 'backspace' || key === 'enter') {
        event.preventDefault(); // do Nothing
      } else {
        let ele = document.getElementById("" + (this.tileCount++))
        this.updateCurrentWord(key)
        if (ele) ele.innerHTML = key
        this.focusOnTile(key)
      }
    }
  }
}
