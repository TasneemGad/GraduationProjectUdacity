import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'src/app/Services/account.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { StudentStoriesService } from 'src/app/Services/student-stories.service';
import { IStudentStory } from 'src/app/SharedModels/Interface/IStudentStory';


@Component({
  selector: 'app-student-sucess',
  templateUrl: './student-sucess.component.html',
  styleUrls: ['./student-sucess.component.scss'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers

})
export class StudentSucessComponent implements OnInit {
  studentStoryListTopFive:IStudentStory[];
  studentStoryList:IStudentStory[];
  names:string[]=[]
  colors:string[]=["#f0ad4e","#0275d8","#d9534f","#5bc0de","#5cb85c","#292b2c"]

  constructor(config: NgbCarouselConfig,private stdStories:StudentStoriesService,private account:AccountService) {
    // 
    config.interval = 3000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {
    this.stdStories.getStudentStory().subscribe(
      dataStdStories=>{
        this.studentStoryListTopFive=dataStdStories.slice(5);
        for (const story of dataStdStories) {
          this.account.getStudentName(story.studentId).subscribe(
            userInfo=>{
                this.names.push(userInfo.userName);
            }
          )
        }
        
    
      }
    )
  }
}
