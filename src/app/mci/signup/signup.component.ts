import { Component, OnInit } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Miembro'},
    {value: 'pizza-1', viewValue: 'Líder'},
    {value: 'tacos-2', viewValue: 'Administrador'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
