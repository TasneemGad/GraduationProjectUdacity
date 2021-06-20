

import { PipeTransform, Pipe } from '@angular/core';
import { ICourse } from './ICourses';

@Pipe({
    name: 'courseFilter'
})
export class CoursesFilterPipe implements PipeTransform {
    transform(courses: ICourse[], searchItem: string): ICourse[] {
        if (!courses || !searchItem) {
            return courses;
        }

        return courses.filter(course =>
            course.name.toLowerCase().indexOf(searchItem.toLowerCase()) !== -1);
    }
}