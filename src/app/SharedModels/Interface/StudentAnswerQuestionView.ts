export interface StudentAnswerQuestionView{
    id: number
    right: string
    opt1: string
    opt2: string
    opt3: string
    opt4?: string
    title:string    
    type:string
    questionGroupId:number
    lessonContentId:number
    flag:boolean
}