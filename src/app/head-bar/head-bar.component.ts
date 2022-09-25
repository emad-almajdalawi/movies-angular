import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, MovieDataResults } from '../data.service';

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
    this.router.navigate(['/movies', 1]);
  }

  /**
   * Search for a movie by its title
   * @param {any} e the event
   */
  search(e: any): void {
    const search: string = e.target.value.toLowerCase();

    let results = this.dataServace.moviesDataResults.value.filter((element: MovieDataResults) => (
      element.title?.toLowerCase().includes(search)
    ));

    if (search) {
      this.dataServace.isEmpty = false;
      this.dataServace.searchResults.next(results);
    } else {
      this.dataServace.isEmpty = true;
      this.dataServace.searchResults.next([]);
    }
  }
}
