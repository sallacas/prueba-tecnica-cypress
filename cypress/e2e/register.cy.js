describe("Prueba tecnica", () => {
  context("Registro de Usuario", () => {
    beforeEach(function () {
      cy.visit("https://test-qa.inlaze.com/auth/sign-up");

      cy.fixture("register/data").then(function (data) {
        this.data = data;
      });
    });

    it("Registro exitoso", function () {
      const { fullname, email_correct, password } = this.data;
      cy.fillRegisterForm(fullname, email_correct, password, password);

      cy.get('button[type="submit"]').should("be.enabled").click();

      cy.get("div").contains("Successful registration!").should("be.visible");
    });

    it("Campo fullname acepta minimo 2 palabras", function () {
      const { name, fullname, email_correct, password } = this.data;
      // Ingreso campos requeridos
      cy.get("#email").type(email_correct);
      cy.get("#password").type(password);
      cy.get("#confirm-password").type(password);

      // Caso de prueba: Menos de 2 palabras
      cy.get("#full-name").type(name);
      cy.get('button[type="submit"]').should("be.disabled");

      cy.get("#full-name").clear();

      // Caso de prueba: 2 palabras
      cy.get("#full-name").type(fullname);
      cy.get('button[type="submit"]').should("be.enabled");

      cy.get("#full-name").clear();

      // Caso de prueba: Mas de 2 palabras
      cy.get("#full-name").type(fullname + " " + name);
      cy.get('button[type="submit"]').should("be.enabled");
    });

    it("Email formato invalido", function () {
      const { fullname, password } = this.data;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Ingreso campos requeridos
      cy.get("#full-name").type(fullname);
      cy.get("#password").type(password);
      cy.get("#confirm-password").type(password);

      // Caso de prueba: Email inválido (sin '@')
      cy.get("#email")
        .type("correo_invalido.com")
        .then(($input) => {
          expect($input.val()).not.to.match(emailRegex);
        });
      cy.get('button[type="submit"]').should("be.disabled");
      cy.get("#email").clear();

      // Caso de prueba: Email inválido (sin dominio)
      cy.get("#email")
        .type("correo@invalido")
        .then(($input) => {
          expect($input.val()).not.to.match(emailRegex);
        });
      cy.get('button[type="submit"]').should("be.disabled");
      cy.get("#email").clear();

      // Caso de prueba: Email válido
      cy.get("#email")
        .type("correo@valido.com")
        .then(($input) => {
          expect($input.val()).to.match(emailRegex);
        });
      cy.get('button[type="submit"]').should("be.enabled");
    });

    it("Email existe", function () {
      const { fullname, existing_user, password } = this.data;
      // Ingreso campos requeridos
      cy.fillRegisterForm(fullname, existing_user, password, password);
      // Caso de prueba: Email ya existe
      cy.get('button[type="submit"]').should("be.enabled").click();
      cy.get("div")
        .contains("Successful registration!")
        .should("not.be.visible");
    });

    it("Formulario incompleto", function () {
      const { fullname, email_correct, password } = this.data;
      // Submit form
      cy.submitFormAndCheckErrors();

      // Solo fullname
      cy.clearRegisterForm();
      cy.get("#full-name").type(fullname);
      cy.submitFormAndCheckErrors();

      // Solo email
      cy.clearRegisterForm();
      cy.get("#email").type(email_correct);
      cy.submitFormAndCheckErrors();

      // Solo password
      cy.clearRegisterForm();
      cy.get("#password").type(password);
      cy.submitFormAndCheckErrors();
      // Todos los campos
      cy.clearRegisterForm();
      cy.fillRegisterForm(fullname, email_correct, password, password);

      cy.get('button[type="submit"]').should("be.enabled");
    });

    it("Contraseña corta (menos de 8 caracteres)", function () {
      const { fullname, email_correct, password } = this.data;
      // Ingreso campos requeridos
      cy.get("#full-name").type(fullname);
      cy.get("#email").type(email_correct);

      // Caso de prueba: Contraseña corta (menos de 8 caracteres)
      const short_password = "Cas12.";
      cy.get("input#password")
        .type(short_password)
        .invoke("val")
        .should("have.length.lessThan", 8);

      cy.get("input#confirm-password")
        .type(short_password)
        .invoke("val")
        .should("have.length.lessThan", 8);

      cy.get('button[type="submit"]').should("be.disabled");
    });

    it("Contraseña sin mayúsculas", function () {
      const { fullname, email_correct } = this.data;
      // Ingreso campos requeridos
      cy.get("#full-name").type(fullname);
      cy.get("#email").type(email_correct);
      // Caso de prueba: Contraseña sin mayúsculas
      const no_uppercase = "smallpassword12.";
      cy.get("input#password")
        .type(no_uppercase)
        .invoke("val")
        .should("not.be.match", /(?=.*[A-Z])/); // Regex para contraseñas sin mayusculas
      cy.get("input#confirm-password")
        .type(no_uppercase)
        .invoke("val")
        .should("not.be.match", /(?=.*[A-Z])/); // Regex para contraseñas sin mayusculas

      cy.get('button[type="submit"]').should("not.be.enabled");
    });

    it("Contraseña sin minusculas", function () {
      const { fullname, email_correct } = this.data;
      // Ingreso campos requeridos
      cy.get("#full-name").type(fullname);
      cy.get("#email").type(email_correct);
      // Caso de prueba: Contraseña sin mayúsculas
      const no_lowercase = "SMALLPASSWORD12.";
      cy.get("input#password")
        .type(no_lowercase)
        .invoke("val")
        .should("not.be.match", /(?=.*[a-z])/); // Regex para contraseñas sin minusculas
      cy.get("input#confirm-password")
        .type(no_lowercase)
        .invoke("val")
        .should("not.be.match", /(?=.*[a-z])/); // Regex para contraseñas sin minusculas

      cy.get('button[type="submit"]').should("not.be.enabled");
    });

    it("Contraseña sin al menos un numero", function () {
      const { fullname, email_correct } = this.data;
      // Ingreso campos requeridos
      cy.get("#full-name").type(fullname);
      cy.get("#email").type(email_correct);
      // Caso de prueba: Contraseña sin mayúsculas
      const no_number = "SmallPassword";
      cy.get("input#password")
        .type(no_number)
        .invoke("val")
        .should("not.be.match", /(?=.*\d)/); // Regex para contraseñas con minimo un numero
      cy.get("input#confirm-password")
        .type(no_number)
        .invoke("val")
        .should("not.be.match", /(?=.*\d)/); // Regex para contraseñas con minimo un numero

      cy.get('button[type="submit"]').should("not.be.enabled");
    });

    it("Contraseña sin al menos un caracter especial", function () {
      const { fullname, email_correct } = this.data;
      // Ingreso campos requeridos
      cy.get("#full-name").type(fullname);
      cy.get("#email").type(email_correct);
      // Caso de prueba: Contraseña sin mayúsculas
      const no_number = "SmallPassword";
      cy.get("input#password")
        .type(no_number)
        .invoke("val")
        .should("not.be.match", /(?=.*[!@#$%^&*()_+[\]{}|;:,.<>?])/); // Regex para contraseñas con minimo un caracter especial
      cy.get("input#confirm-password")
        .type(no_number)
        .invoke("val")
        .should("not.be.match", /(?=.*[!@#$%^&*()_+[\]{}|;:,.<>?])/); // Regex para contraseñas con minimo un caracter especial

      cy.get('button[type="submit"]').should("not.be.enabled");
    });

    it("Contraseña con formato correcto", function () {
      const { fullname, email_correct, password } = this.data;
      // Ingreso campos requeridos
      cy.get("#full-name").type(fullname);
      cy.get("#email").type(email_correct);
      // Caso de prueba: Contraseña sin mayúsculas
      cy.get("input#password")
        .type(password)
        .invoke("val")
        .should(
          "be.match",
          /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|;:,.<>?]).{8,}/
        ); // Regex para contraseña con al menos una mayuscula, minuscula, un numero y un caracter especial
      cy.get("input#confirm-password")
        .type(password)
        .invoke("val")
        .should(
          "be.match",
          /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|;:,.<>?]).{8,}/
        ); // Regex para contraseña con al menos una mayuscula, minuscula, un numero y un caracter especial

      cy.get('button[type="submit"]').should("be.enabled");
    });

    it("Contraseñas no coinciden", function () {
      const { fullname, email_correct, password } = this.data;
      // Ingreso campos requeridos
      cy.get("#full-name").type(fullname);
      cy.get("#email").type(email_correct);
      cy.get("#password").type(password);
      cy.get("#confirm-password").type(password + "1");
      cy.get("span.text-error")
        .should("be.visible")
        .and("have.text", " Passwords do not match ");

      cy.get("input#confirm-password").clear();
      cy.get("input#confirm-password").type(password);
      cy.get("span.text-error").should("not.exist");
      cy.get('button[type="submit"]').should("be.enabled");
    });
  });
});
