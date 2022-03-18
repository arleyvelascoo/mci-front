import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PersonDto} from "../../../models/person-dto";
import {Gender} from "../../../models/gender";
import {CityDto} from "../../../models/city-dto";
import {DocumentType} from "../../../models/document-type";
import {debounceTime, take} from "rxjs/operators";
import {MemberService} from "../../../services/member/member.service";
import {CityService} from "../../../services/city/city.service";
import {GenderService} from "../../../services/gender/gender.service";
import {DocumentTypeService} from "../../../services/document-type/document-type.service";
import {SnackbarService} from "../../../services/snackbar/snackbar.service";
import {LeaderService} from "../../../services/leader/leader.service";

interface DataDialog {
  viewMode: boolean;
  insertMode: boolean;
  title: string;
  person: PersonDto;
}

@Component({
  selector: 'app-confir-dialog-form',
  templateUrl: './confir-dialog-form.component.html',
  styleUrls: ['./confir-dialog-form.component.scss']
})
export class ConfirDialogFormComponent implements OnInit {
  form!: FormGroup;
  personalInformation!: PersonDto;
  documentTypes: DocumentType[] = [];
  genders: Gender[] = [];
  filteredOptions: CityDto[] = [];
  viewMode!: boolean;
  insertMode!: boolean;

  constructor(
    public dialogRef: MatDialogRef<ConfirDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog, private formBuilder: FormBuilder,
    private cityService: CityService,
    private genderService: GenderService, private dTypeService: DocumentTypeService,
    private snackbar: SnackbarService, private leaderService: LeaderService) {
  }

  ngOnInit(): void {
    this.getDocumentTypes();
    this.getGenders();
    this.viewMode = this.data.viewMode;
    this.insertMode = this.data.insertMode;

    this.form = this.formBuilder.group({
      id: ['', Validators.compose([])],
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      idDocumentType: ['', Validators.compose([Validators.required])],
      documentNumber: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      neighborhood: ['', Validators.compose([Validators.required])],
      phoneNumber: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      cityName: ['', []],
      idCity: ['', Validators.compose([Validators.required])],
      birthDate: ['', Validators.compose([Validators.required])],
      hasEncounter: [false, Validators.compose([Validators.required])],
      wasBaptized: [false, Validators.compose([Validators.required])],
      isLeader: [false, Validators.compose([Validators.required])],
      idMinistry: ['', Validators.compose([])],
      idGender: ['', Validators.compose([Validators.required])],
    })


    this.form.controls.idCity.valueChanges.pipe(debounceTime(300))
      .subscribe((value) => {
        if (typeof (value) == "string") {
          this._filter(value);
        }
      })


    if (!this.insertMode) {
      this.getPersonalInformation();
    }
    if (this.viewMode) {
      this.form.disable();
    }
  }

  displayFn(city: CityDto): string {
    return city && city.cityStateCountry ? city.cityStateCountry : '';
  }

  private _filter(name: string) {
    this.cityService.citiesSuggestion(name).pipe(take(1)).subscribe((resp) => {
      this.filteredOptions = resp;
    });
  }

  private getDocumentTypes() {
    this.dTypeService.getAllDocumentTypes().pipe(take(1))
      .subscribe({
        next: (res) => {
          if (res) {
            this.documentTypes = res;
          }
        }
      })
  }

  private getGenders() {
    this.genderService.getAllGender().pipe(take(1))
      .subscribe(
        {
          next: (res) => {
            if (res) {
              this.genders = res;
            }
          }
        }
      )
  }

  private getPersonalInformation() {
    if (!this.insertMode && this.data.person) {
      this.personalInformation = this.data.person;
      this.form.patchValue(this.personalInformation);
      this.form.controls.idCity.setValue({
        id: this.personalInformation.idCity,
        cityStateCountry: this.personalInformation.cityName
      });
    }
  }

  onClickNO(): void {
    this.dialogRef.close();
  }

  onClickYes(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      if (this.insertMode) {
        let toSend: PersonDto = this.form.value as PersonDto;
        toSend.idCity = this.form.controls.idCity.value.id;
        console.log(toSend);
        this.leaderService.saveNewMember(toSend).pipe(take(1))
          .subscribe({
            next: (res) => {
              if (res) {
                this.snackbar.show({
                  mensaje: "Persona agregada correctamente",
                  tipo: "success"
                });
                this.dialogRef.close(res);
              }
            }
          })
      } else {
        let toSend: PersonDto = this.form.value as PersonDto;
        toSend.idCity = this.form.controls.idCity.value.id;
        console.log(toSend);
        this.leaderService.editMember(toSend).pipe(take(1))
          .subscribe({
            next: (res) => {
              if (res) {
                this.snackbar.show({
                  mensaje: "Persona editada correctamente",
                  tipo: "success"
                });
                this.dialogRef.close(res);
              }
            }
          })
      }
    }
  }
}
