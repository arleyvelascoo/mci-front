import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PersonDto} from "../../../models/person-dto";
import {LeaderService} from "../../../services/leader/leader.service";
import {SnackbarService} from "../../../services/snackbar/snackbar.service";
import {take} from "rxjs/operators";
import {SelectionModel} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material/table";
import {jsPDF} from "jspdf";

interface DataDialog {
  viewMode: boolean;
  insertMode: boolean;
  title: string;
  dataComponent: any;
}

@Component({
  selector: 'app-fill-data',
  templateUrl: './fill-data.component.html',
  styleUrls: ['./fill-data.component.scss']
})
export class FillDataComponent implements OnInit {
  form!: FormGroup;
  viewMode!: boolean;
  insertMode!: boolean;


  displayedColumns: string[] = ['select', 'lastName', 'firstName'];

  constructor(
    public dialogRef: MatDialogRef<FillDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog, private formBuilder: FormBuilder,
    private leaderService: LeaderService,
    private snackbar: SnackbarService,
  ) {
  }

  discipleMembers: PersonDto[] = [];
  dataSource = new MatTableDataSource<PersonDto>(this.discipleMembers);
  selection = new SelectionModel<PersonDto>(true, []);


  ngOnInit(): void {
    this.getDiscipleMembers();

    this.form = this.formBuilder.group({
      id: ['', Validators.compose([])],
      minister: ['', Validators.compose([Validators.required])],
      leaderPrincipal: ['', Validators.compose([Validators.required])],
      leaderCell: ['Arley Velasco', Validators.compose([Validators.required])],
      neighbourhood: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      date: ['', Validators.compose([Validators.required])],
      theme: ['', Validators.compose([Validators.required])],
      bibleQuote: ['', Validators.compose([Validators.required])],
      offering: ['', Validators.compose([Validators.required])],
    })
  }


  getDiscipleMembers() {
    this.leaderService.getDisciplesPersons().pipe(take(1))
      .subscribe({
        next: (res) => {
          if (res) {
            if (res.length > 0) {
              this.discipleMembers = res;
              this.dataSource.data = this.discipleMembers;
              console.log(this.discipleMembers);
            } else {
              this.snackbar.show({mensaje: "No hay personas asociados a su ministerio", tipo: "warning"});
            }
          }
        }
      })
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PersonDto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  onClickNO(): void {
    this.dialogRef.close();
  }

  onClickYes(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.generatePdf();
      this.dialogRef.close();
    }
  }


  generatePdf() {
    let pdf = new jsPDF({
      orientation: "p",
      unit: "pt",
      format: 'a4',
    });

    let selected = '';

    this.selection.selected.forEach(x => {
      selected = selected + `
              <tr>
          <td>${x.firstName +  ' ' + x.lastName}</td>
          <td>${x.phoneNumber}</td>
        </tr>
      `;
    });

    let date: Date = new Date(this.form.value.date);

    var htmlText = `
<!DOCTYPE html>
        <html>
          <head>

          </head>

          <body style="width: 35vw; margin: 10px 10px">

      <div class="header-informe">
        <div class="mci">
            <b>Misión Carismática Internacional</b>
          <br>
          Bucaramanga
          <br>
          <b>Informe de célula</b>
        </div>

      <div class="layout-branding">
        <a class="mci-layout-branding" href="/">
          <img
            src="./../../../../assets/images/mci-logo.png"
            class="mci-layout-branding-logo-expanded"
            alt="logo"
          />
          <!--      <span class="uis-layout-branding-name">UIS</span>-->
        </a>
      </div>

      </div>

      <div class="fields">
        <b>Ministerio:</b> ${this.form.value.minister}
      </div>

      <div class="fields">
        <b>Líder de 144:</b> ${this.form.value.leaderPrincipal}
      </div>

      <div class="fields">
        <b>Líder de célula:</b> ${this.form.value.leaderCell}
      </div>

      <div class="fields">
        <b>Barrio:</b> ${this.form.value.neighbourhood}
      </div>

      <div class="fields">
        <b>Fecha:</b> ${date.toLocaleDateString()}
      </div>

      <div class="fields">
        <b>Tema:</b> ${this.form.value.theme}
      </div>

      <div class="fields">
        <b>Cita:</b> ${this.form.value.bibleQuote}
      </div>

      <div class="fields">
        <b>Ofrenda:</b> ${this.form.value.offering}
      </div>

      <br>

      <table class="plantilla-table">
        <tr>
          <th>Nombres</th>
          <th>Teléfono</th>
        </tr>
        `
      +
      selected
      +
      `
      </table>

          </body>
          <style>
.example-form {
  min-width: 150px;
  max-width: 500px;
  width: 100%;
}

.example-full-width {
  width: 100%;
}

.inputs {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(25rem, auto));
}

table {
  width: 100%;
}

.text-align-center {
  text-align: center;
}

.plantilla-table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.plantilla-table td, .plantilla-table th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.plantilla-table tr:nth-child(even) {
  background-color: #dddddd;
}

#pdf-plantilla{
  max-width: 550px;
  padding: 1rem 1rem;
  border: 1px solid black;
}

.testeando{
   transform: scale(0.7);
}


.layout-branding {
  display: flex;
  justify-content: center;
  align-items: center;
}

.mci-layout-branding-logo-expanded {
  max-height: 110px;
}

.header-informe{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

           </style>

        </html>
    `

    pdf.html(this.stringToHtml(htmlText), {
      callback: (pdf) => {
        pdf.save("informe.pdf");
      },
    });
  }

  stringToHtml(str) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(str, 'text/html');
    return doc.body;
  };
}
