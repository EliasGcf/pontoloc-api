<h1 align="center">
  <img
    alt="Logo"
    src="https://res.cloudinary.com/eliasgcf/image/upload/v1588529377/pontoloc/logo_hmpbwn.png" width="300px"
  />
</h1>

<h3 align="center">
  Express Application for a PontoLoc Web App
</h3>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/EliasGcf/pontoloc-api?color=%23fbc131">

  <a href="https://www.linkedin.com/in/eliasgcf/" target="_blank" rel="noopener noreferrer">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-elias%20gabriel-%23fbc131">
  </a>

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/EliasGcf/pontoloc-api?color=%23fbc131">

  <a href="https://github.com/EliasGcf/pontoloc-api/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/EliasGcf/pontoloc-api?color=%23fbc131">
  </a>

  <a href="https://github.com/EliasGcf/pontoloc-api/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/EliasGcf/pontoloc-api?color=%23fbc131">
  </a>

  <img alt="GitHub" src="https://img.shields.io/github/license/EliasGcf/pontoloc-api?color=%23fbc131">
</p>

<p align="center">
  <a href="#-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-contribute">How to contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</p>

<p id="insomniaButton" align="center">
  <a href="https://insomnia.rest/run/?label=PontoLoc&uri=https%3A%2F%2Fraw.githubusercontent.com%2FEliasGcf%2Fpontoloc-api%2Fmaster%2FInsomnia.json" target="_blank">
    <img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia">
  </a>
</p>

## 👨🏻‍💻 About the project

PontoLoc is a micro enterprise that rents construction materials. Thinking about helping them, I developed this API so the company can have a simple and easy way to control and visualize the rent of its materials.

The company can create lists and contracts of clients, lists of materials with their respective quantities, delivery and collection fee and calculate the final price when the rental period is end.

To see the **web client**, click here: [PontoLoc Web](https://github.com/EliasGcf/pontoloc-web)<br />
To see the **mobile client**, click here: [PontoLoc Mobile](https://github.com/EliasGcf/pontoloc-mobile)

## 🚀 Technologies

Technologies that I used to develop this api

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/#/)
- [JWT-token](https://jwt.io/)
- [Celebrate](https://github.com/arb/celebrate)
- [PostgreSQL](https://www.postgresql.org/)
- [Date-fns](https://date-fns.org/)
- [Jest](https://jestjs.io/)
- [SuperTest](https://github.com/visionmedia/supertest)
- [Husky](https://github.com/typicode/husky)
- [Commitlint](https://github.com/conventional-changelog/commitlint)
- [Commitizen](https://github.com/commitizen/cz-cli)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)

## 💻 Getting started

Import the `Insomnia.json` on Insomnia App or click on [Run in Insomnia](#insomniaButton) button

### Requirements

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

**Clone the project and access the folder**

```bash
$ git clone https://github.com/EliasGcf/pontoloc-api.git && cd pontoloc-api
```

**Follow the steps below**

```bash
# Install the dependencies
$ yarn

# Make a copy of '.env.example' to '.env'
# and set with YOUR environment variables
$ cp .env.example .env

# Run the services
$ docker-compose up -d

# Once the services are running, run the migrations
$ yarn typeorm migration:run

# For make requests you must use JWT Token
# So, run the seeds to create admin user
$ yarn seed:run

# Credentials:
# email: admin@pontoloc.com.br
# password: 123456

# Well done, project is started!
```

## 🤔 How to contribute

- **Make a fork of this repository**

```bash
# Fork using GitHub official command line
# If you don't have the GitHub CLI, use the web site to do that.

$ gh repo fork EliasGcf/pontoloc-api
```

```bash
# Clone your fork
$ git clone your-fork-url && cd pontoloc-api

# Create a branch with your feature
$ git checkout -b my-feature

# Make the commit with your changes
$ git commit -m 'feat: My new feature'

# Send the code to your remote branch
$ git push origin my-feature
```

After your pull request is merged, you can delete your branch

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with 💜 by Elias Gabriel 👋 [See my linkedin](https://www.linkedin.com/in/eliasgcf/)
