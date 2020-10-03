import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accordian',
  templateUrl: './accordian.component.html',
  styleUrls: ['./accordian.component.css']
})
export class AccordianComponent implements OnInit {
  @Input() public hasJustViewed: boolean;
  @Input() public title: string;
  @Input() isHidden = false;
  constructor() { }

  ngOnInit() {
  }

}
