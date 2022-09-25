import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, MovieDataResults } from '../data.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  id?: number;
  imgPrefex: string = 'https://image.tmdb.org/t/p/w500/';
  theMovieData: MovieDataResults = {};

  constructor(
    public dataService: DataService,
    private activRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = Number(this.activRoute.snapshot.paramMap.get('id'));
    this.theMovieData = this.dataService.moviesDataResults.value.filter(element => element.id === this.id)[0];
  }
}
