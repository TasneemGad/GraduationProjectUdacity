import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { StudentStoriesService } from 'src/app/Services/student-stories.service';
import { IStudentStory } from 'src/app/SharedModels/Interface/IStudentStory';
import { Sudentstorydetail } from 'src/app/SharedModels/Interface/sudentstorydetail';


@Component({
  selector: 'app-career-prep',
  templateUrl: './career-prep.component.html',
  styleUrls: ['./career-prep.component.scss']
})
export class CareerPrepComponent implements OnInit {

  studentSroriesList:IStudentStory[]=[];
  StdStoriesList:Sudentstorydetail[]=[];
  StdStoryDetails:Sudentstorydetail={userName:"",specialzation:"",story:""};

  constructor(private stdsStories:StudentStoriesService,private accountDetail:AccountService) { }

  ngOnInit(): void {
  
  this.getAllStudentsStories();
  }



  getAllStudentsStories(){
    this.stdsStories.TopFiveStudentStories().subscribe(
      data=>{
        this.studentSroriesList=data;
        console.log(data)
        for (let stdStory of data) {
          this.accountDetail.getStudentName(stdStory.studentId).subscribe(
            stdName=>{
              console.log("vvv",stdName.userName)
              this.StdStoryDetails.userName=stdName.userName;
              this.StdStoryDetails.story=stdStory.story;
              this.StdStoryDetails.specialzation=stdStory.specialzation;
              this.StdStoriesList.push(this.StdStoryDetails);
            }
          )

        }
        console.log(this.StdStoriesList)
      }
    )
  }

}
