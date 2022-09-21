import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface MoviesData {
  page?: number,
  results: MovieDataResults[],
  total_pages?: number,
  total_resuls?: number
}

export interface MovieDataResults {
  adult?: boolean,
  backdrop_path?: string
  genre_ids?: number[],
  id?: number,
  original_language?: string,
  original_title?: string,
  overview?: string,
  popularity?: number,
  poster_path?: string,
  release_date?: string,
  title?: string,
  video?: boolean,
  vote_average?: number,
  vote_count?: number
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  moviesUrl: string = 'https://api.themoviedb.org/3/movie/popular?api_key=f82ecbb7a5110caecaee2bee5e4c79d6&page=1'
  moviesDataResults: BehaviorSubject<MovieDataResults[]> = new BehaviorSubject([{}]);

  constructor(
    public http: HttpClient
  ) { }

  /**
   * Fetch the movies data from the API
   */
  getMovies(): Observable<MoviesData> {
    return this.http.get<MoviesData>(this.moviesUrl);
  }
}
