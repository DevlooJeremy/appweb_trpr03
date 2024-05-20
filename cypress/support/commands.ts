/// <reference types="cypress" />

import cypress from "cypress";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
    namespace Cypress {
        interface Chainable {
            login(email: string, password: string): void;
            addQuestion(subject: string, question: string, category: string ): void;
            addCategory(nom: string): void;
            disconnect(): void;
            addStudent(): void;
        }
    }
}

// Cette commande est utilisé dans les tests du fichier cypress/e2e/userStories.cy.js
//
// nom de la commande___          ___ paramètres de la commande
//                      V        V
Cypress.Commands.add('login', (email, password) => {
    // On retrouve ici le même code que le test "je peux me connecter - version 1".
    cy.visit('/login')
    cy.get('input[name=email-input]').type(email)
    cy.get('input[name=password-input]').type(password)
    cy.get('button[type=submit]').click()

    cy.contains(/déconnecter/i)
})

Cypress.Commands.add('addQuestion', (subject, question, category) => {
    
    //cy.addCategory(category)

    cy.get('input[name=subject]').type(subject)
    cy.get('textarea[name=question]').type(question)
    cy.get('select[name=category]').select(category)

    cy.get('button[name=submit]').click()
})

Cypress.Commands.add('addCategory', (name) => {
    cy.login("hugo@courriel.com", "teacher")

    cy.get('div[name=addCategory]').click()
    cy.get('input[name=add]').type(name)
    cy.contains('Ajouter').click()

    cy.disconnect()
   
})

Cypress.Commands.add('disconnect', () => {
    cy.contains(/déconnecter/i).click()
})

Cypress.Commands.add('addStudent', () => {
    cy.contains(/Ajouter +/i).click()
  
      cy.get('input[name=name]').type("userTest")
      cy.get('input[name=password]').type("passwordTest")
      cy.get('input[name=email]').type("email@test.com")
  
      cy.get('div[name=submit]').click()
})

export {}
