# 📗 Table of Contents <a name="readme-top"></a>

- [📗 Table of Contents ](#-table-of-contents-)
  - [📖 PennyWize Server ](#-pennywize-server-)
  - [🛠 Built With ](#-built-with-)
    - [⚙️ Tech Stack ](#️-tech-stack-)
    - [💡 Key Features ](#-key-features-)
  - [🎞️ UML Diagram ](#️-uml-diagram-)
  - [🚀 Live Endpoint ](#-live-endpoint-)
  - [💻 Getting Started ](#-getting-started-)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
    - [Install](#install)
    - [Usage](#usage)
  - [👥 Authors ](#-authors-)
  - [🔭 Future Features ](#-future-features-)
  - [🤝 Contributing ](#-contributing-)
  - [⭐️ Show your support ](#️-show-your-support-)
  - [❓ FAQ ](#-faq-)
  - [🙏 Acknowledgments ](#-acknowledgments-)

## 📖 PennyWize Server <a name="pennywize"></a>

> `PennyWize Server` is the server (Back-End) of the PennyWize application. `PennyWize` is a mobile web application where you can manage your budget: you have a list of expense associated with a group, so that you can see how much money you spent and on what.

## 🛠 Built With <a name="built-with"></a>

### ⚙️ Tech Stack <a name="tech-stack"></a>

> Here are the tech stacks applied in this project.

<details>
  <summary>Language</summary>
  <ul>
    <li><a href="https://nodejs.org/">Node.JS</a></li>
  </ul>
</details>

<details>
  <summary>Database</summary>
  <ul>
    <li><a href="https://www.postgresql.org">Postgresql</a></li>
  </ul>
</details>

<details>
  <summary>Framewordks</summary>
  <ul>
    <li><a href="https://sequelize.org
">Sequelize</a></li>
<li><a href="https://expressjs.com/
">Express</a></li>
  </ul>
</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### 💡 Key Features <a name="key-features"></a>

> The following are the server endpoints

- **User:** `GET` `POST` `PUT` `DELETE` /users, `GET` /users/:userId
- **User Settings:** `PUT` /settings/:userId/:settingsId
- **Group:** `GET` /groups, `POST` `PUT` `DELETE` `GET` /group/:groupId
- **Expense:** `GET` /expenses, `POST` `PUT` `DELETE` `GET` /expense/:expenseId

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🎞️ UML Diagram <a name="umldiagram"></a>

> Coming soon ...

## 🚀 Live Endpoint <a name="live-endpoint"></a>

> Coming soon ...

<!-- - [Live Demo Link]() -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## 💻 Getting Started <a name="getting-started"></a>

### Prerequisites

> The following applications are required to be installed for the project to run!

- Install [PostgreSQL](https://www.postgresql.org/download/) database
- Install [Node.js](https://nodejs.org/en/download/) LTS version
- Install [Git](https://git-scm.com/downloads)

### Setup

Clone this repository to your desired folder:

```sh
  git clone git@github.com:PraisesPJMT/PennyWise.git
  cd pennywize/server
```

### Install

Install this project with:

```sh
  npm install
```

### Usage

To setup your development environment

- Create a `.env` file in the same directory as the `server`
- Create the following variable in the `.env` file and substitute \<data> with the appropriate values for your machine

```
    DB_PORT=5005
    DB_USERNAME=<your postgres user name>
    DB_NAME=pennywise
    DB_PASSWORD=<your postgres password>
```

To create the database, execute the following command:

```sh
  npx sequelize-cl db:create
```

To run the database migration, execute the following command:

```sh
  npx sequelize-cl db:migate
```

To run the project, execute the following command:

```sh
  npm run dev
```

- After running `npm run dev`, use the endpoint on [http://localhost:5000/](http://localhost:5000/)!
- For more information please visit [How to Test API Endpoint (Complete Guide)](https://apidog.com/blog/test-api-endpoint/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 👥 Authors <a name="authors"></a>

👤 **Praises Tula**

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/PraisesPJMT/)
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/praises-tula/)
[![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?style=for-the-badge&logo=Twitter&logoColor=white)](https://twitter.com/PraisesPJMT/)

[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:praisesmusa@gmail.com)
[![AngelList](https://img.shields.io/badge/AngelList-%23D4D4D4.svg?style=for-the-badge&logo=AngelList&logoColor=black)](https://angel.co/u/praises-tula/)

## 🔭 Future Features <a name="future-features"></a>

> The following are features to be expected in the future

- [ ] **Reorder expenses & groups by dragging**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ⭐️ Show your support <a name="support"></a>

Give a ⭐️ if you like this project!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ❓ FAQ <a name="faq"></a>

- **How I can run this project?**

  - After cloning repository, move to the server directory using the terminal command `cd pennywize/server`, run `npm install` to install all dependencies. Then run `npm run dev` to run the project.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🙏 Acknowledgments <a name="acknowledgements"></a>

> - Tip hart to you for checking this project out

<p align="right">(<a href="#readme-top">back to top</a>)</p>
