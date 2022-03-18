import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirDialogFormComponent} from "../confir-dialog-form/confir-dialog-form.component";
import {LeaderService} from "../../../services/leader/leader.service";
import {take} from "rxjs/operators";
import {PersonDto} from "../../../models/person-dto";
import {SnackbarService} from "../../../services/snackbar/snackbar.service";
import {FillDataComponent} from "../fill-data/fill-data.component";

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

  fillData() {
    this.dialog.open(FillDataComponent, {
      width: '90%',
      data: {
        viewMOde: false,
        editMode: true,
        title: 'Registro información célula'
      }
    }).afterClosed().subscribe(res => {

    });
  }

  addMode() {
    this.dialog.open(
      ConfirDialogFormComponent,
      {
        width: '80%',
        data: {
          viewMode: false,
          insertMode: true,
          title: 'Agregar nueva persona'
        }
      }).afterClosed().subscribe(res => {
      if (res) {
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
        if (res) {
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

  getDiscipleMembers() {
    this.leaderService.getDisciplesPersons().pipe(take(1))
      .subscribe({
        next: (res) => {
          if (res) {
            if (res.length > 0) {
              this.discipleMembers = res;
              this.dataSource = this.discipleMembers;
              console.log(this.discipleMembers);
            } else {
              this.snackbar.show({mensaje: "No hay personas asociados a su ministerio", tipo: "warning"});
            }
          }
        }
      })
  }
}
