import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DataService, MoviesData } from '../data.service';


interface ParamsMap extends ParamMap {
  [key: string]: any;
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent implements OnInit {

  imgPrefex: string = 'https://image.tmdb.org/t/p/w500/';
  apiKey: string = '?api_key=f82ecbb7a5110caecaee2bee5e4c79d6';
  page: number = 1;
  paginationArray: null[] = new Array(17);

  constructor(
    public dataServace: DataService,
    private router: Router,
    private activRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activRoute.paramMap.subscribe((paramsMap: ParamsMap) => {
      this.page = Number(paramsMap['params']['page']);

      this.dataServace.getMovies(this.page).subscribe((data: MoviesData) => {
        this.dataServace.moviesDataResults.next(data.results);
      });
    });
  }

  /**
   * Fetch new data from another link (with the param page=PageNum) then update the dataServace
   * @param {number} pageNum The new page number
   */
  changePage(pageNum: number): void {
    this.page = pageNum;
    this.router.navigate(['/movies', this.page]);
  }

  /**
   * Navigate to the details of the clicked movie
   * @param {number} id The id of the movie
   */
  movieDetails(id: number): void {
    this.router.navigate(['/movie', id]);
  }
}
