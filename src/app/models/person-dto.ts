export interface PersonDto {
    id:               number;
    firstName:        string;
    lastName:         string;
    documentNumber:   string;
    address:          string;
    neighborhood:     string;
    phoneNumber:      string;
    email:            string;
    birthDate:        Date;
    hasEncounter:     boolean;
    isLeader:         boolean;
    wasBaptized:      boolean;
    idDocumentType:   number;
    idMinistry:       number;
    idCity:           number;
    idGender:         number;
    documentTypeName: string;
    cityName:         string;
    genderName:       string;
}
