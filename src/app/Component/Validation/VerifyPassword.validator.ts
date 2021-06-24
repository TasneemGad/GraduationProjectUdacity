import { AbstractControl } from "@angular/forms";

export function ConfirmPasswordValidator(control:AbstractControl)
{
  const password=  control.get('newPassword');
  const verifyPassword=control.get('verifyPassword');
   
  if(password?.pristine || verifyPassword?.pristine)
  {
      return null;
  }
  return password && verifyPassword && password.value!==verifyPassword.value 
  ? {'misMatch':true}
  :null;
}