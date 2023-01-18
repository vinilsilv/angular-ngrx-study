import { AfterViewInit, Component, ContentChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-hide-input',
  templateUrl: './show-hide-input.component.html',
  styleUrls: ['./show-hide-input.component.scss']
})
export class ShowHideInputComponent implements OnInit, AfterViewInit {

  @ContentChild('showHide')
  userInput!: ElementRef;

  hidden: boolean = true;

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.hidden = this.userInput.nativeElement.type == 'password'
  }

  hideShow() {
    this.userInput.nativeElement.type = this.hidden ? 'text' : 'password'
    this.hidden = !this.hidden
  }

}
