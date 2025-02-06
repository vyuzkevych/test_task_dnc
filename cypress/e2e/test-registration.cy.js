import { registrationForm } from "../page-objects/registration-form";

describe("verify registration functionality", () => {
    beforeEach(() => {
        cy.visit(Cypress.env("baseUrl"));
    });

    it("Complete registration with valid data", () => {
        // fill registration form
        cy.fixture("registration-data").then((data) => {
            registrationForm.action.fillForm(data.firstName, data.lastName, data.email,
            data.gender, data.mobile, data.dateOfBirth, data.subjects, data.hobbies, 
            "cypress/test-data/cat.jpg", data.currentAddress, data.state, data.city);
        });
        // click on submit button
        registrationForm.action.clickOnSubmitBtn();
        // check registration data
        cy.get("table").should("be.visible");
        cy.fixture("registration-data").then((data) => {
            cy.get("td").contains("Student Name").next().should("have.text", `${data.firstName} ${data.lastName}`);
            cy.get("td").contains("Student Email").next().should("have.text", `${data.email}`);
            cy.get("td").contains("Gender").next().should("have.text", `${data.gender}`);
            cy.get("td").contains("Mobile").next().should("have.text", `${data.mobile}`);
            cy.get("td").contains("Date of Birth").next().should("have.text", `${data.dateOfBirth}`);
            cy.get("td").contains("Subjects").next().should("have.text", `${data.subjects}`);
            cy.get("td").contains("Hobbies").next().should("have.text", `${data.hobbies}`);
            cy.get("td").contains("Picture").next().should("have.text", "cat.jpg");
            cy.get("td").contains("Address").next().should("have.text", `${data.currentAddress}`);
            cy.get("td").contains("State and City").next().should("have.text", `${data.state} ${data.city}`);
        });
    });

    it("Complete registration with empty fields", () => {
        registrationForm.action.clickOnSubmitBtn();
        cy.get("table").should("not.exist");
    });

    it("Complete registration with unproprier picture file type", () => {
        registrationForm.get.firstName().type("test1");
        registrationForm.get.lastName().type("test!");
        registrationForm.get.genderFemale().click({ force: true });
        registrationForm.get.mobileNumber().type("1234567890");
        registrationForm.action.uploadPicture("cypress/test-data/test.csv");
        registrationForm.action.clickOnSubmitBtn();

        cy.get("table").should("not.exist");
    });
});