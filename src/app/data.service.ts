import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface MovieData {
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
  moviesData: BehaviorSubject<MovieData[]> = new BehaviorSubject([{}]);

  constructor(
    public http: HttpClient
  ) { }

  getMovies(): Observable<MovieData[]> {
    return this.http.get<MovieData[]>(this.moviesUrl)
  }
}
