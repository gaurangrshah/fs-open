describe("Bloglist app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3000/api/testing/reset");

    cy.visit("http://localhost:3000");
  });
  describe("check initial render", function () {
    it("front page can be opened", function () {
      cy.contains("blogs");
    });
    it("login form can be opened", function () {
      cy.contains("log in").click();
    });

    it("login form is shown", function () {
      cy.contains("log in").click();
      cy.get("input[name='username']").should("be.visible");
    });
  });

  describe("login", function () {
    let user;
    beforeEach(function () {
      cy.request("POST", "http://localhost:3000/api/testing/reset");
      user = {
        name: "Superuser",
        username: "root",
        password: "salainen",
      };
      cy.request("POST", "http://localhost:3000/api/users/", user);
      cy.visit("http://localhost:3000");
    });

    it("user can login", function () {
      cy.contains("log in").click();
      cy.get("#username").type(user.username);
      cy.get("#password").type(user.password);
      cy.get("#login-button").click();

      cy.contains("logged in as: Superuser");
    });

    it("login fails with wrong password", function () {
      cy.contains("log in").click();
      cy.get("#username").type(user.username);
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();
      cy.get(".error")
        .should("contain", "wrong credentials")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid")
        .and("have.css", "border-color", "rgb(255, 0, 0)");

      cy.get("html").should("not.contain", "Superuser logged in");
    });
  });

  describe("bloglist", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3000/api/testing/reset");
      const user = {
        name: "Superuser",
        username: "root",
        password: "salainen",
      };
      cy.request("POST", "http://localhost:3000/api/users/", user);

      cy.visit("http://localhost:3000");
    });

    describe("when logged in", function () {
      beforeEach(function () {
        // custom login via cypress commands --see: cypress/support/commands
        cy.login({ username: "root", password: "salainen" });
      });

      it("a new blog can be created", function () {
        cy.contains("create").click();
        cy.get("#title").type("a blog created by cypress");
        cy.get("#url").type("https://fakeblog.com");
        cy.contains("save").click();
        cy.contains("a blog created by cypress");
      });

      describe("a blog exists", function () {
        beforeEach(function () {
          cy.createBlog({
            title: "a blog created by cypress command",
            url: "https://fakeblog.com",
          });
          cy.contains("a blog created by cypress command");
        });
        it("renders likes when opened", function () {
          cy.contains("view").click();
          cy.contains("likes: 0");
        });
        it("renders url when opened", function () {
          cy.contains("view").click();
          cy.get("#like-button").click();
          cy.contains("https://fakeblog.com");
        });
        it("can be liked", function () {
          cy.contains("view").click();
          cy.contains("likes: 0");
          cy.get("#like-button").click();
          cy.contains("likes: 1");
        });

        it("can be removed by owner", function () {
          cy.contains("view").click();
          cy.get("#remove-button").click();
          cy.should("not.contain", "a blog created by cypress command");
        });
      });

      describe.only("multiple blogs exists", function () {
        beforeEach(function () {
          cy.createBlog({
            title: "a blog created by cypress command",
            url: "https://fakeblog.com",
            likes: 6,
          });
          cy.createBlog({
            title: "second example",
            url: "https://fakeblog.com",
            likes: 12,
          });
          cy.createBlog({
            title: "third example",
            url: "https://fakeblog.com",
            likes: 1,
          });
          cy.contains("a blog created by cypress command");
          cy.contains("second example");
          cy.contains("third example");
        });

        it("sorts blogs by popularity", function () {
          cy.contains("view").click();
          cy.get(".likes").then((blog) => {
            expect(blog[0].textContent).to.equal("12");
            expect(blog[1].textContent).to.equal("6");
            expect(blog[2].textContent).to.equal("1");
          });
        });
      });
    });
  });
});
