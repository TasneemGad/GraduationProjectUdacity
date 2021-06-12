import { Component, OnInit } from '@angular/core';
import { EnrollService } from 'src/app/Services/EnrollCourse.service';
import { IEnrollCourse } from 'src/app/SharedModels/Interface/IEnrollCourse';

@Component({
  selector: 'app-class-room',
  templateUrl: './class-room.component.html',
  styleUrls: ['./class-room.component.scss']
})
export class ClassRoomComponent implements OnInit {

  constructor(private Enrollservices:EnrollService) { }
  currentEnrollement:IEnrollCourse[]
  ngOnInit(): void {
  }
getCurrent()
{
this.Enrollservices.getStsEnrollCourse()
}

}
