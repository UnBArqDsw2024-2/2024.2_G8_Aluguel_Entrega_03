export interface FormModel {
    name: string;
    cpf_cnpj: string;
    email: string;
    password: string;
    site: string;
    confirmPassword: string;
  }
  
  export class FormPrototype implements FormModel {
    name: string;
    cpf_cnpj: string;
    email: string;
    password: string;
    site: string;
    confirmPassword: string;
  
    constructor(model: Partial<FormModel>) {
      this.name = model.name || '';
      this.cpf_cnpj = model.cpf_cnpj || '';
      this.email = model.email || '';
      this.password = model.password || '';
      this.site = model.site || '';
      this.confirmPassword = model.confirmPassword || '';
    }
  
    clone(): FormPrototype {
      return new FormPrototype({
        name: this.name,
        cpf_cnpj: this.cpf_cnpj,
        email: this.email,
        password: this.password,
        site: this.site,
        confirmPassword: this.confirmPassword,
      });
    }
  }
  