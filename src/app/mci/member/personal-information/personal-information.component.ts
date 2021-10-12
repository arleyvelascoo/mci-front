import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {count, debounceTime, distinctUntilChanged, map, startWith, switchMap, take} from "rxjs/operators";
import {CityDto} from "../../../models/city-dto";
import {CityService} from "../../../services/city/city.service";
import {DocumentType} from "../../../models/document-type";
import {DocumentTypeService} from "../../../services/document-type/document-type.service";

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  form!: FormGroup;
  documentTypes: DocumentType[] = [];

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private cityService: CityService, private dTypeService: DocumentTypeService) {
  }

  options: CityDto[] = [];
  filteredOptions: CityDto[] = [];

  ngOnInit(): void {

    let mode = this.activatedRoute.snapshot.params.editar;
    this.form = this.formBuilder.group({
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
    })

    this.form.controls.idCity.valueChanges.subscribe((value) => {
      this._filter(value);
    })

    if (mode === 'ver') {
      this.form.disable();
    }

    this.activatedRoute.params.subscribe((par) => {
      if (par.editar === 'ver') {
        this.form.disable();
      } else {
        this.form.enable();
      }
    });

    this.getDocumentTypes();
  }

  displayFn(city: CityDto): string {
    return city && city.cityStateCounty ? city.cityStateCounty : '';
  }

  showForm() {
    console.log(this.form.value);
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
}
