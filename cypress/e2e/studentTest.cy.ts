describe('Test de létudiant', () => {
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
      email: student.email,
      password: student.password,
      name: student.name,
      role: student.role
    })

    cy.request('POST', 'http://127.0.0.1:3000/register', {
      email: teacher.email,
      password: teacher.password,
      name: teacher.name,
      role: teacher.role
    })


  })
  //test des étudiants

  it("L'étudiant peut se connecter", () => {
    cy.visit('/login')

    cy.get('input[name=email-input]').type(student.email)
    cy.get('input[name=password-input]').type(student.password)

    cy.get('button[type=submit]').click()

    cy.contains(/déconnecter/i)
  })

  it("L'étudiant peut créer une question", () => {
    cy.login(student.email,student.password)
    cy.visit("/class")

    cy.get('input[name=subject]').type("sujet-test")
    cy.get('textarea[name=question]').type("ceci est une question.")
    cy.get('select[name=category]').select("Question longue")

    cy.get('button[name=submit]').click()

    cy.contains(/ceci est une question./)
    
  })

  it("L'étudiant peut supprimer une de ses questions", () => {
    cy.login(student.email,student.password)
    cy.visit("/class")
    cy.addQuestion("sujet-test","question-test","Question longue")

    cy.get('div[name=deleteQuestion]').click()

    cy.contains(/ceci est une question./).should('not.exist')
  })

  it("L'étudiant peut changer son mot de passe", () => {
    cy.login(student.email,student.password)
    cy.visit("/profile")

    cy.get('input[name=newPassword]').type("newPassword")
    cy.get('input[name=passwordConfirmation]').type("newPassword")

    cy.get('button[name=submit]').click()
    cy.contains(/déconnecter/i).click()

    cy.login(student.email,"newPassword")
    cy.contains(/déconnecter/i)
  })

  it("L'étudiant peux se déconnecter", () => {
    cy.login(student.email, student.password)

    cy.contains(/déconnecter/i).click()

    cy.contains(/connexion/i)
  })
})
