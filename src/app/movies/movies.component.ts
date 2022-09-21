import { Component, OnInit } from '@angular/core';
import { DataService, MoviesData } from '../data.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  imgPath: string = 'https://image.tmdb.org/t/p/w500/'

  constructor(
    public dataServace: DataService
  ) { }

  ngOnInit(): void {
    this.dataServace.getMovies().subscribe((data: MoviesData) => {
      console.log(data);
      this.dataServace.moviesDataResults.next(data.results);
      console.log(this.dataServace.moviesDataResults.value);
    })
  }

  movieDetails(i: number) {

  }
}
