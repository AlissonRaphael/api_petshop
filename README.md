# Petshop Store
[![GitHub](https://img.shields.io/github/license/AlissonRaphael/api_petshop)](https://github.com/AlissonRaphael/api_petshop/blob/main/LICENSE)

This repository contains all the files of an API aimed at the service and contracting of services of a petshop. Includes customer registration with the ability to register credit card, pet, addresses and store products. It has modules with CQRS for scheduling control, as well as chat with socket.io and GraphQL.

## Techs
<p align="center">
  <img src="https://github.com/AlissonRaphael/api_petshop/blob/main/.github/readme_typescript.jpg">
  <img src="https://github.com/AlissonRaphael/api_petshop/blob/main/.github/readme_nodejs.jpg">
  <img src="https://github.com/AlissonRaphael/api_petshop/blob/main/.github/readme_nestjs.jpg">
  <img src="https://github.com/AlissonRaphael/api_petshop/blob/main/.github/readme_typeorm.jpg">
  <img src="https://github.com/AlissonRaphael/api_petshop/blob/main/.github/readme_postgres.jpg">
  <img src="https://github.com/AlissonRaphael/api_petshop/blob/main/.github/readme_mongodb.jpg">
  <img src="https://github.com/AlissonRaphael/api_petshop/blob/main/.github/readme_swagger.jpg">
</p>

<!-- ## Api
<p align="center">
  <img src="https://github.com/AlissonRaphael/api_petshop/blob/main/.github/readme_api.png">
</p> -->

## Database Relationship
<p align="center">
  <img width="70%" src="https://github.com/AlissonRaphael/api_petshop/blob/main/.github/readme_relationship.png">
</p>

## Database Schemas
```sh
// User Schema
{
  username: { type: String, required: true, trim: true, index: { unique: true, } },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true, },
  roles: [{ type: String, required: true, enum: ['user', 'admin'], default: 'user' }],
  active: { type: Boolean, required: true, default: true, },  
}

//Customer Schema
{
  username: { type: String, required: true, },
  document: { type: String, required: true, trim: true, index: { unique: true, }, },
  pets: [
    {
      name: { type: String },
      gender: { type: String, enum: ['male', 'female', 'none'] },
      kind: { type: String },
      brand: { type: String },
    }
  ],
  billingAddress: [
    {
      zipCode: { type: String },
      street: { type: String },
      number: { type: String },
      complement: { type: String },
      neighborhood: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
    },
  ],
  shippingAddress: [
    {
      zipCode: { type: String },
      street: { type: String },
      number: { type: String },
      complement: { type: String },
      neighborhood: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
    },
  ],
  creditCard: [{ holder: { type: String }, number: { type: String }, expiration: { type: String } }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, }
}

// Room Schema
{
  customer_id: { type: String, required: true, trim: true },
  date: { type: Date, required: true, default: true },
}
```

## Contents
- [Installation](#installation)
- [Contact](#contact)
- [License](#license)

## Installation
Requires at least Node.js version 12 or later.

### Windows:

Download the Windows Installer directly from the website [nodejs.org](https://nodejs.org/en/download/).

or via package manager:

__Using chocolatay__
```sh
choco install nodejs.install
```

### Linux:

Download the linux binaries directly from the website [nodejs.org](https://nodejs.org/en/download/)

__Install a binary package via pkg__:
```sh
pkg install node
```

### macOS X:

Download the macOS Installer directly from the website [nodejs.org](https://nodejs.org/en/download/).

Via package manager:

__Using brew__
```sh
brew install node
```


### Clone

Clone this repo to your local machine using `https://github.com/AlissonRaphael/api_petshop.git`

## Contact
- Github: [alissonraphael](https://gist.github.com/AlissonRaphael)
- Twitter: [@AlissonRaphaeI](@AlissonRaphaeI)

## License

[![GitHub](https://img.shields.io/github/license/AlissonRaphael/api_petshop)](https://github.com/AlissonRaphael/api_petshop/blob/main/LICENSE)
