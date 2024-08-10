describe("Prueba tecnica", () => {
  context("Login de Usuario", () => {
    beforeEach(function () {
      cy.visit("https://test-qa.inlaze.com/auth/sign-in");

      cy.fixture("login/data").then(function (data) {
        this.data = data;
      });
    });

    it("Login exitoso", function () {
      const { correct_user_email, password } = this.data;

      cy.get("input#email").type(correct_user_email);
      cy.get("input#password").type(password);

      cy.get('button[type="submit"]').should("be.enabled").click();
      cy.validateLogin();
    });

    it("Login usuario incorrecto", function () {
      const { incorrect_user_email, password } = this.data;

      cy.get("input#email").type(incorrect_user_email);
      cy.get("input#password").type(password);

      cy.get('button[type="submit"]').should("be.enabled").click();

      cy.get("app-toast > .flex").should("be.visible");
      cy.get("div").contains("User not found").should("be.visible");
    });

    it("Minimo caracteres", function () {
      cy.get("input#email").type("email@example.com");
      // Contraseña corta
      cy.get("input#password")
        .type("short")
        .invoke("val")
        .should("have.length.lessThan", 8);

      cy.get('button[type="submit"]').should("be.disabled");

      // Contraseña larga
      cy.get("input#password").clear();
      cy.get("input#password").type("1234567890As.");
      cy.get('button[type="submit"]').should("be.enabled");
    });

    it("Formulario incompleto", function () {
      const { correct_user_email, password } = this.data;
      // Solo email
      cy.get("input#email").type(correct_user_email);
      cy.get("input#password").clear();
      cy.get('button[type="submit"]').should("be.disabled");

      // Solo password
      cy.get("input#email").clear();
      cy.get("input#password").type(password);
      cy.get('button[type="submit"]').should("be.disabled");
    });

    it("Nombre de usuario correcto", function () {
      const { correct_user_email, password, correct_user_fullname } = this.data;
      cy.get("input#email").type(correct_user_email);
      cy.get("input#password").type(password);

      cy.get('button[type="submit"]').should("be.enabled").click();
      cy.validateLogin();

      cy.get(".flex > .font-bold")
        .should("be.visible")
        .and("have.text", correct_user_fullname);
    });

    it("Cierre de sesion", function () {
      const { correct_user_email, password } = this.data;

      cy.get("input#email").type(correct_user_email);
      cy.get("input#password").type(password);

      cy.get('button[type="submit"]').should("be.enabled").click();
      cy.validateLogin();

      cy.get("img").should("be.visible").click();
      cy.get("a").contains("Logout").should("be.visible").click();

      cy.url().should("eq", "https://test-qa.inlaze.com/auth/sign-in");
    });
  });
});
