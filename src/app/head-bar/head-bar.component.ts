import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, MoviesData } from '../data.service';

@Component({
  selector: 'app-head-bar',
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.css']
})
export class HeadBarComponent {

  constructor(
    public dataServace: DataService,
    private router: Router
  ) { }

  /**
   * Redirect to the home page at the first page
   */
  home(): void {
    this.dataServace.searchResults.next([]);
    this.dataServace.getMovies(1).subscribe((data: MoviesData) => {
      this.dataServace.moviesDataResults.next(data.results);
    })
    this.router.navigate(['/movies', 1]);
  }

  /**
   * Search for a movi by its title
   * @param {any} e the event
   */
  search(e: any): void {
    const results = this.dataServace.moviesDataResults.value.filter(element => {
      return element.title?.toLowerCase().includes(e.target.value.toLowerCase());
    })

    this.dataServace.searchResults.next(results);

    if (results.length == 0) {
      alert('No results found!');
    }
  }
}
