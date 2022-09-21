import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, MoviesData } from '../data.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  imgPrefex: string = 'https://image.tmdb.org/t/p/w500/'
  apiKey: string = '?api_key=f82ecbb7a5110caecaee2bee5e4c79d6'

  constructor(
    public dataServace: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataServace.getMovies().subscribe((data: MoviesData) => {
      this.dataServace.moviesDataResults.next(data.results);
    })
  }

  movieDetails(i: number) {
    this.router.navigate(['/movie', i, { api_key: this.apiKey }])
  }
}
