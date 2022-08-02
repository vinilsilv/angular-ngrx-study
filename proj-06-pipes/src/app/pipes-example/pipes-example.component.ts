import { Component, OnInit } from '@angular/core';
import { Observable, interval, map } from 'rxjs';

@Component({
  selector: 'app-pipes-example',
  templateUrl: './pipes-example.component.html',
  styleUrls: ['./pipes-example.component.scss'],
})
export class PipesExampleComponent implements OnInit {
  book: any = {
    title: 'Title of a book',
    rating: 4.56521358,
    price: 10.45,
    releaseDate: new Date(2016, 5, 20),
  };

  books: string[] = ['Java', 'JavaScript'];

  filter: string = 'cri';

  addCourse(value: string) {
    this.books.push(value);
  }

  getCourses() {
    if (
      this.books.length === 0 ||
      this.filter === undefined ||
      this.filter.trim() === ''
    ) {
      return this.books;
    }

    return this.books.filter((v: any) => {
      if (v.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0) {
        return true;
      }
      return false;
    });
  }

  asyncValue = new Promise((res, err) => {
    setTimeout(()=> res('Async value'), 2000)
  })

  asyncValue2 = interval(2000).pipe(map((value: any) => value = 'Async value 2'))

  constructor() {}

  ngOnInit(): void {}
}
