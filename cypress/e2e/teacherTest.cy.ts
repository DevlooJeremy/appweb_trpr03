describe('Test du professeur', () => {
    // On définit un utilisateur pour les tests. Cet utilisateur sera créé dans la base de données avant chaque test.
    const student = {
      email: 'jeremy@courriel.com',
      password: 'student',
      name: 'jeremy devloo',
      role: 'student'
    }
  
    const teacher = {
      email: 'hugo@courriel.com',
      password: 'teacher',
      name: 'devloo',
      role: 'teacher'
    }
  
    // Exécuté avant chaque test
    beforeEach(() => {
      // On réinitialise la base de données en appelant le script backend:cypress:seed qui se trouve dans le package.json. Ce script copie le fichier db-cypress-default.json dans db-cypress.json qui est utilisé par le serveur backend. Ainsi, on a une base de données propre pour chaque test.
      cy.exec('npm run backend:cypress:seed')
  
      // On ajoute l'utilisateur à la BD en utilisant la commande POST /register de notre API REST (serveur backend).
      // TODO : utiliser une variable d'environnement pour l'URL du serveur backend.
  
      cy.request('POST', 'http://127.0.0.1:3000/register', {
        email: teacher.email,
        password: teacher.password,
        name: teacher.name,
        role: teacher.role
      })
  
  
    })
    //test des professeur
  
    it("Le professeur peut se connecter", () => {
      cy.visit('/login')
  
      cy.get('input[name=email-input]').type(teacher.email)
      cy.get('input[name=password-input]').type(teacher.password)
  
      cy.get('button[type=submit]').click()
  
      cy.contains(/déconnecter/i)
    })
  
    it("Le professeur peut ajouter un étudiant", () => {
      cy.login(teacher.email,teacher.password)
      cy.visit("/class")

      cy.contains(/Ajouter +/i).click()
  
      cy.get('input[name=name]').type("userTest")
      cy.get('input[name=password]').type("passwordTest")
      cy.get('input[name=email]').type("email@test.com")
  
      cy.get('div[name=addButton]').click()
  
      cy.contains(/userTest/)
      
    })
  
    it("Le professeur peut supprimer un de ses étudiants", () => {
      cy.login(teacher.email,teacher.password)
      cy.visit("/class")
      cy.addStudent()
  
      cy.get('div[name=deleteStudent]').click()
      cy.contains(/Confirmer/i).click()

      cy.contains(/userTest/).should('not.exist')
    })
  
    it("Le professeur peut changer son mot de passe", () => {
      cy.login(teacher.email,teacher.password)
      cy.visit("/profile")
  
      cy.get('input[name=newPassword]').type("newPassword")
      cy.get('input[name=passwordConfirmation]').type("newPassword")
  
      cy.get('button[name=submit]').click()
      cy.contains(/déconnecter/i).click()
  
      cy.login(teacher.email,"newPassword")
      cy.contains(/déconnecter/i)
    })
  
    it("Le professeur peux se déconnecter", () => {
      cy.login(teacher.email, teacher.password)
  
      cy.contains(/déconnecter/i).click()
  
      cy.contains(/connexion/i)
    })
  })
  