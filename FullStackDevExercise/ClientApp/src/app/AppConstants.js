"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PetOption = /** @class */ (function () {
    function PetOption(id, displayName) {
        this.id = id;
        this.displayName = displayName;
    }
    return PetOption;
}());
exports.PetOption = PetOption;
var AppConstants = /** @class */ (function () {
    function AppConstants() {
    }
    AppConstants.appName = "Dr. Dolittle's Veterinary Clinic";
    AppConstants.openHour = 930;
    AppConstants.closeHour = 1830;
    AppConstants.breaks = [{ begin: 1230, end: 1330 }, { begin: 1630, end: 1500 }];
    AppConstants.slotDurationInMinutes = 15;
    AppConstants.searchQueryTimeoutMilliseconds = 600;
    AppConstants.knownPets = [
        new PetOption("dog", "Dog"),
        new PetOption("cat", "Cat")
    ];
    return AppConstants;
}());
exports.AppConstants = AppConstants;
//# sourceMappingURL=AppConstants.js.map