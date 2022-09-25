import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, MoviesData } from '../data.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  imgPrefex: string = 'https://image.tmdb.org/t/p/w500/';
  apiKey: string = '?api_key=f82ecbb7a5110caecaee2bee5e4c79d6';
  page: any = 1;

  constructor(
    public dataServace: DataService,
    private router: Router,
    private activRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.page = this.activRoute.snapshot.paramMap.get('page');
    console.log(this.page, 'first value')

    this.dataServace.getMovies(Number(this.page)).subscribe((data: MoviesData) => {
      this.dataServace.moviesDataResults.next(data.results);
    })

    this.router.navigate(['/movies', this.page]);
  }

  /**
   * Fetch new data from another link (with the param page=PageNum) then update the dataServace
   * @param {number} pageNum The new page number
   */
  changePage(pageNum: number): void {
    this.page = pageNum

    this.dataServace.getMovies(this.page).subscribe((data: MoviesData) => {
      this.dataServace.moviesDataResults.next(data.results);
    })

    this.router.navigate(['/movies', this.page]);
  }

  /**
   * Navigate to the details of the clicked movie
   * @param {number} id The id of the movie
   */
  movieDetails(id: number): void {
    this.router.navigate(['/movie', id]);
  }

  /**
   * Creats an array of a spicefic number of emty elements
   * @param {number} n The aray's length
   */
  numSequence(n: number): number[] {
    return Array(n);
  }
}
