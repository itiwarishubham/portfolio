import { Component, OnInit, HostListener } from '@angular/core';
import words from '../../assets/json/words.json';

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

  constructor() {
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
  }

  numbers: number[] = Array.from({ length: 30 }, (_, i) => i);
  generateSecretWord(): string {
    const index = Math.floor(Math.random() * words.length);
    return words[index];
  }
  // Define the target word as a string
  secretWord: string = this.generateSecretWord();

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    const keyCode = event.keyCode || event.which;
    // Allow only alphabet characters, backspace and enter key
    if ((keyCode >= 65 && keyCode <= 90) || (key === 'backspace') || (keyCode === 13)) {
      if (this.currentWord.length == 5) {
        if (key === 'backspace') {
          let ele = document.getElementById("" + (--this.tileCount))
          if (ele) ele.innerHTML = ''
          this.currentWord = this.currentWord.slice(0, -1)
          //console.log("backspace: " + this.currentWord + ", " + key)
        } else if (key === 'enter') {
          if (this.isInWords(this.currentWord)) {
            let res: string[] = this.charMatches(this.currentWord, this.secretWord);
            this.changeColor(res)
            this.isGameOver = this.currentWord === this.secretWord;
            this.currentWord = ''
            this.start = this.end;
            this.end = this.start + 5
            //console.log("enter: " + this.currentWord + ", " + key)
            console.log("res: " + res + ", " + this.secretWord)
          }else{
            const res: string[] = new Array(10).fill('red');
            this.changeColor(res)
            //console.log("res: " + this.isInWords(this.currentWord))
          }
        }
      } else {
        if (key === 'backspace' && this.currentWord.length != 0) {
          let ele = document.getElementById("" + (--this.tileCount))
          if (ele) ele.innerHTML = ''
          this.currentWord = this.currentWord.slice(0, -1)
        } else if (key === 'backspace' || key === 'enter') {
          event.preventDefault()
        } else {
          let ele = document.getElementById("" + (this.tileCount++))
          this.updateCurrentWord(key)
          if (ele) ele.innerHTML = key
          //console.log("alpha: " + this.currentWord + ", " + key)
        }
      }
    }
  }

  updateCurrentWord(char: string) {
    this.currentWord += char
  }

  charMatches(guessWord: string, secretWord: string): string[] {
    const matches: string[] = [];
  
    for (let i = 0; i < guessWord.length; i++) {
      if (guessWord[i] === secretWord[i]) {
        matches.push('white');
      } else if (secretWord.includes(guessWord[i])) {
        matches.push('black');
      } else {
        matches.push('gray');
      }
    }
  
    return matches;
  }
  

  isInWords(str: string): boolean {
    return words.includes(str);
  }

  changeColor(colorArr: string[]){
    for(let i = this.start, j=0;i < this.end;i++,j++){
      const div = document.getElementById(''+i) as HTMLDivElement;
      const keypadDiv = document.getElementById(''+this.currentWord.charAt(j)) as HTMLDivElement;
      if(colorArr[j] === 'black'){
        div.style.color = 'white'
        keypadDiv.style.color = 'white'
      }else{
        div.style.color = 'black'
        keypadDiv.style.color = 'black'
      }
      div.style.backgroundColor = colorArr[j];
      keypadDiv.style.backgroundColor = colorArr[j];
    }
  }
  playAgain(){
    this.resetTileColor();
    this.resetKeyPadColor()
    const alphabet: string = "abcdefghijklmnopqrstuvwxyz";
    const lettersArray: string[] = alphabet.split("");
    this.secretWord = this.generateSecretWord()
    this.isGameOver = false;
  }
  resetTileColor(){
    for(let i=0;i<30;i++){
      let div = document.getElementById(''+i) as HTMLDivElement;
      div.innerHTML = ''
      div.style.color = ''
      div.style.backgroundColor = '';
      this.start = 0
      this.end = 5
      this.tileCount = 0
    }
  }
  resetKeyPadColor(){
    const alphabet: string = "abcdefghijklmnopqrstuvwxyz";
    const lettersArray: string[] = alphabet.split("");
    for(let i=0;i<lettersArray.length;i++){
      let div = document.getElementById(lettersArray[i]) as HTMLDivElement;
      div.style.color = ''
      div.style.backgroundColor = '';
      this.start = 0
      this.end = 5
      this.tileCount = 0
    }
  }
}
