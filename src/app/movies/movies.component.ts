import { Component, OnInit } from '@angular/core';
import { MovieTitle } from '../entity/movie-title';
import moviesJson from '../../assets/json/movies.json';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movieTitles: MovieTitle[] = moviesJson.movies;
  src!: string;
  name!: string;

  constructor() { }

  ngOnInit(): void {
  }

  toggleVideoModal(movieTitle: MovieTitle){
    let modal = document.getElementById("videoModal") as HTMLElement;
    if (modal.style.display === "block") {
      modal.style.display = "none";
    } else {
        modal.style.display = "block";
    }
    let video = document.getElementById("videoPlayer") as HTMLVideoElement;
    if (video.requestFullscreen) {
        video.requestFullscreen();
    }
    video.src = 'https://www.youtube.com/embed/'+movieTitle.uid+'?autoplay=1&fs=1';
    this.name = movieTitle.name
    console.log(movieTitle.uid)
  }

  closeVideoModal(){
    let video = document.getElementById("videoPlayer") as HTMLVideoElement;
    video.src = '';
    let modal = document.getElementById("videoModal") as HTMLElement;
    if (modal.style.display === "block") {
      modal.style.display = "none";
    } else {
        modal.style.display = "block";
    }
    console.log(modal.style.display)
  }

}
