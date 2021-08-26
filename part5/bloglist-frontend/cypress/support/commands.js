// ***********************************************
// This example commands.js shows you how to
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
Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3000/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem(
      "loggedBlogappUser",
      JSON.stringify({ token: body.token })
    );
    cy.visit("http://localhost:3000");
  });
});
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

Cypress.Commands.add("createBlog", (blog) => {
  cy.request({
    url: "http://localhost:3000/api/blogs",
    method: "POST",
    body: blog,
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem("loggedBlogappUser")).token
      }`,
    },
  });

  cy.visit("http://localhost:3000");
});