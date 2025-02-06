class RegistrationForm {

    get = {
        firstName: () => cy.get("#firstName"),
        lastName: () => cy.get("#lastName"),
        email: () => cy.get("#userEmail"),
        genderMale: () => cy.get("#gender-radio-1"),
        genderFemale: () => cy.get("#gender-radio-2"),
        genderOther: () => cy.get("#gender-radio-3"),
        mobileNumber: () => cy.get("#userNumber"),
        dateOfBirth: () => cy.get("#dateOfBirthInput"),
        subjects: () => cy.get("#subjectsContainer"),
        hobiesSport: () => cy.get("#hobbies-checkbox-1"),
        hobiesReading: () => cy.get("#hobbies-checkbox-2"),
        hobiesMusic: () => cy.get("#hobbies-checkbox-3"),
        uploadPictureBtn: () => cy.get("#uploadPicture"),
        currentAddress: () => cy.get("#currentAddress"),
        selectState: () => cy.get("#state"),
        selectCity: () => cy.get("#city"),
        submitBtn: () => cy.get("#submit")
    }

    action = {
        fillForm: (firstName, lastName, email, gender, mobile, dateOfBirth,
            subjects, hobbies, picturePath, currentAddress, selectState, selectCity) => (
                this.get.firstName().type(firstName),
                this.get.lastName().type(lastName),
                this.get.email().type(email),
                this.action.selectGender(gender),
                this.get.mobileNumber().type(mobile),
                this.get.dateOfBirth().type(`{selectAll}${dateOfBirth}{enter}`),
                this.get.subjects().type(`${subjects}{enter}`),
                this.action.selectHobbies(hobbies),
                this.action.uploadPicture(picturePath),
                this.get.currentAddress().type(currentAddress),
                this.get.selectState().type(`${selectState}{enter}`),
                this.get.selectCity().type(`${selectCity}{enter}`)
        ),
        clickOnSubmitBtn: () => this.get.submitBtn().click(),
        selectGender: (gender) => {
            if (gender === "Male") this.get.genderMale().check({ force: true });
            else if (gender === "Female") this.get.genderFemale().check({ force: true });
            else if (gender === "Other") this.get.genderOther().check({ force: true });
        },
        selectHobbies: (hobbie) => {
            if (hobbie === "Sports") this.get.hobiesSport().check({ force: true });
            else if (hobbie === "Reading") this.get.hobiesReading().check({ force: true });
            else if (hobbie === "Music") this.get.hobiesMusic().check({ force: true });
        },
        uploadPicture: (path) => this.get.uploadPictureBtn().selectFile(path)
    }
}

export const registrationForm = new RegistrationForm();