import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipes-example',
  templateUrl: './pipes-example.component.html',
  styleUrls: ['./pipes-example.component.scss']
})
export class PipesExampleComponent implements OnInit {

  book: any = {
    title: 'Title of a book',
    rating: 4.56521358,
    price: 10.45,
    releaseDate: new Date(2016, 5, 20)
  };

  books: string[] = ['Java', 'JavaScript']

  filter: string = 'cri';

  addCourse(value: string) {
    this.books.push(value)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
