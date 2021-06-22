import { Component, OnInit } from '@angular/core';
import { MentorOrInstractorService } from 'src/app/Services/mentor-or-instractor.service';
import { IMentorOrInstractor } from 'src/app/SharedModels/Interface/imentororinstractor';

@Component({
  selector: 'app-become-amentor',
  templateUrl: './become-amentor.component.html',
  styleUrls: ['./become-amentor.component.scss']
})
export class BecomeAMentorComponent implements OnInit {
  mentorList:IMentorOrInstractor[]=[]
  

  constructor(private mentorService:MentorOrInstractorService) { }

  ngOnInit(): void {
    this.mentorService.getAllMentor().subscribe(
      mentorListData=>{
        console.log("Mentor",mentorListData)      
          this.mentorList=mentorListData.slice(0,3);
          console.log("Mentor",this.mentorList)
      }
    )
  }

}
