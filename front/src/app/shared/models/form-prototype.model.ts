export interface FormModel {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  export class FormPrototype implements FormModel {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  
    constructor(model: Partial<FormModel>) {
      this.name = model.name || '';
      this.email = model.email || '';
      this.password = model.password || '';
      this.confirmPassword = model.confirmPassword || '';
    }
  
    clone(): FormPrototype {
      return new FormPrototype({
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      });
    }
  }
  