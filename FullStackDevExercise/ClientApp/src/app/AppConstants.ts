export type KnownPetType = "dog" | "cat";

export class PetOption {
  constructor(public id: KnownPetType, public displayName: string) { }
}

export class AppConstants {
  static readonly appName = "Dr. Dolittle's Veterinary Clinic";
  static readonly openHour = 930;
  static readonly closeHour = 1830;
  static readonly breaks = [{ begin: 1230, end: 1330 }, { begin: 1630, end: 1500 }];
  static readonly slotDurationInMinutes = 15;
  static readonly searchQueryTimeoutMilliseconds = 600;
  static readonly knownPets: PetOption[] = [
    new PetOption("dog", "Dog"),
    new PetOption("cat", "Cat")
  ];
}
