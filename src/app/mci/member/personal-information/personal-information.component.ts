import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {count, debounceTime, distinctUntilChanged, map, startWith, switchMap, take} from "rxjs/operators";
import {CityDto} from "../../../models/city-dto";
import {CityService} from "../../../services/city/city.service";
import {DocumentType} from "../../../models/document-type";
import {DocumentTypeService} from "../../../services/document-type/document-type.service";
import {MemberService} from "../../../services/member/member.service";
import {PersonDto} from "../../../models/person-dto";
import {Gender} from "../../../models/gender";
import {GenderService} from "../../../services/gender/gender.service";
import {SnackbarService} from "../../../services/snackbar/snackbar.service";

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  form!: FormGroup;
  personalInformation!: PersonDto;
  documentTypes: DocumentType[] = [];
  genders: Gender[] = [];
  edit!: boolean;
  filteredOptions: CityDto[] = [];

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
              private cityService: CityService, private dTypeService: DocumentTypeService,
              private memberService: MemberService, private genderService: GenderService,
              private snackbar: SnackbarService) {
  }


  ngOnInit(): void {
    this.getDocumentTypes();
    this.getGenders();
    this.getPersonalInformation();

    this.form = this.formBuilder.group({
      id: ['', Validators.compose([Validators.required])],
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
      birthDate: ['2001-05-23', Validators.compose([Validators.required])],
      hasEncounter: ['', Validators.compose([Validators.required])],
      wasBaptized: ['', Validators.compose([Validators.required])],
      isLeader: ['', Validators.compose([Validators.required])],
      idMinistry: ['', Validators.compose([])],
      idGender: ['', Validators.compose([Validators.required])],
    })


    this.form.controls.idCity.valueChanges.pipe(debounceTime(300))
      .subscribe((value) => {
        if (typeof (value) == "string") {
          this._filter(value);
        }
      })

    this.activatedRoute.params.subscribe((par) => {
      if (par.editar === 'ver') {
        this.getPersonalInformation();
        this.form.disable();
        this.edit = false;
      } else {
        this.getPersonalInformation();
        this.form.enable();
        this.edit = true;
      }
    });

  }

  displayFn(city: CityDto): string {
    return city && city.cityStateCountry ? city.cityStateCountry : '';
  }

  showForm() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      let toEdit: PersonDto = this.form.value as PersonDto;
      toEdit.idCity = this.form.controls.idCity.value.id;
      this.memberService.savePersonalInformation(toEdit).pipe(take(1))
        .subscribe({
          next: (res) => {
            if (res) {
              this.snackbar.show({
                tipo: 'success',
                mensaje: 'Información personal actualizada!',
              });
            }
          }
        });
    }
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
    this.memberService.getPersonalInformation().pipe(take(1)).subscribe(
      {
        next: (res) => {
          if (res) {
            this.personalInformation = res;
            this.form.patchValue(this.personalInformation);
            this.form.controls.idCity.setValue({
              id: this.personalInformation.idCity,
              cityStateCountry: this.personalInformation.cityName
            });
          }
        }
      }
    )
  }
}
