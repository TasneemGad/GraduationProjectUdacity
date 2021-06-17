import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-student-sucess',
  templateUrl: './student-sucess.component.html',
  styleUrls: ['./student-sucess.component.scss'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers

})
export class StudentSucessComponent implements OnInit {
  images = [700, 800, 807].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(config: NgbCarouselConfig) {
    // 
    config.interval = 5000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {
  }
}
