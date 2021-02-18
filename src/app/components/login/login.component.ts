import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;
  error:any;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private message: NzMessageService) {}

    ngOnInit(): void {
      this.validateForm = this.fb.group({
        username: [null, [Validators.required]],
        password: [null, [Validators.required]],
        remember: [true]
      });
    }
    get f() { return this.validateForm.controls; }

  login(){
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.auth.login(this.f.username.value, this.f.password.value).subscribe(data => {
      this.router.navigate(['signup']);
    },
    error => {
        this.error = error;
        this.createMessage('error', error.error.message)
        console.log('sdfdf', error);

    });
  }

  createMessage(type: string, message): void {
    this.message.create(type, message);
  }

}
