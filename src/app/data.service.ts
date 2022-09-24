import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  moviesDataResults: BehaviorSubject<MovieDataResults[]> = new BehaviorSubject([{}]);
  baseUrl: string = 'https://api.themoviedb.org/3/movie/popular';
  apiKey: string = 'f82ecbb7a5110caecaee2bee5e4c79d6';

  searchResults: BehaviorSubject<MovieDataResults[] | null> = new BehaviorSubject<MovieDataResults[] | null>([]);


  constructor(
    public http: HttpClient
  ) { }

  /**
   * Fetch the movies data from the API
   * @param {number} pageNum The number of the page that weill be fetched
   */
  getMovies(pageNum: number): Observable<MoviesData> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('page', pageNum);
    return this.http.get<MoviesData>(this.baseUrl, { params });
  }
}
