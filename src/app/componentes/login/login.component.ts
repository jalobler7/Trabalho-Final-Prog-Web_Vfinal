import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService, Usuario } from '../../app-core/servicos/usuario-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      idade: ['', Validators.required],
      profissao: ['', Validators.required],
      sexo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      const usuario: Usuario = this.form.value;
      const id = await this.userService.setUsuario(usuario);
      this.router.navigate(['/perfil', id]);
    }
  }
}
