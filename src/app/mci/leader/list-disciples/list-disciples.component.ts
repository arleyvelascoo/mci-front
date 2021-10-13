import {Component, OnInit} from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ConfirDialogFormComponent } from "../confir-dialog-form/confir-dialog-form.component";
import {LeaderService} from "../../../services/leader/leader.service";
import {take} from "rxjs/operators";
import {PersonDto} from "../../../models/person-dto";
import {SnackbarService} from "../../../services/snackbar/snackbar.service";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-list-disciples',
  templateUrl: './list-disciples.component.html',
  styleUrls: ['./list-disciples.component.scss']
})
export class ListDisciplesComponent implements OnInit {
  displayedColumns: string[] = ['lastName', 'firstName', 'birthDate', 'email', 'actions'];
  constructor(public dialog: MatDialog, private leaderService: LeaderService, private snackbar: SnackbarService) {
  }

  discipleMembers: PersonDto[] = [];
  dataSource = this.discipleMembers;
  ngOnInit(): void {
    this.getDiscipleMembers();
  }

  addMode(){
    this.dialog.open(
      ConfirDialogFormComponent,
      {
        width: '80%',
        data: {
          viewMode: false,
          insertMode: true,
          title: 'Agregar nueva persona'
        }
      }).afterClosed().subscribe(res=>{
        if (res){
          this.getDiscipleMembers();
        }
    });
  }


  editMode(element: PersonDto) {
    this.dialog.open(
      ConfirDialogFormComponent,
      {
        width: '80%',
        data: {
          viewMode: false,
          title: 'Editar datos',
          person: element
        }
      }
    ).afterClosed().subscribe({
      next: (res) => {
        if(res){
          this.getDiscipleMembers();
        }
      }
    })
  }

  viewMode(element: PersonDto) {
    this.dialog.open(
      ConfirDialogFormComponent,
      {
        width: '80%',
        data: {
          viewMode: true,
          title: 'Visualizar datos',
          person: element
        }
      }
    )
  }

  getDiscipleMembers(){
    this.leaderService.getDisciplesPersons().pipe(take(1))
      .subscribe({
        next: (res) => {
          if (res){
            if (res.length > 0){
              this.discipleMembers = res;
              this.dataSource = this.discipleMembers;
              console.log(this.discipleMembers);
            }else{
              this.snackbar.show({mensaje: "No hay personas asociados a su ministerio", tipo: "warning"});
            }
          }
        }
      })
  }
}
