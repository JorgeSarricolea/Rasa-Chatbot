# Rasa-Chatbot

Chatbot powered by Rasa, minimalista, diseño responsivo

## Table of Contents

- [Rasa-Chatbot](#rasa-chatbot)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Features](#features)
  - [Contribution](#contribution)
  - [Copyright](#copyright)

## Introduction

Este proyecto es un refactor de un chat bot, migrando de tecnologías (Flask a Node.js), con el principal objetivo de replicar las mismas funcionalidades, mejorar el diseño de interfaces y utilizar web compoents como el framework Lit, Building on top of the Web Components standards, Lit adds just what you need to be happy and productive: reactivity, declarative templates and a handful of thoughtful features to reduce boilerplate and make your job easier. Every Lit feature is carefully designed with web platform evolution in mind.

The original project in Flask is included in the flask folder, containing files: app.py and index.html.

## Getting Started

To get started with "Rasa-Chabot", follow these simple steps:

> [!TIP]
> I recommend installing Node Version Manager and using the stable version.

```bash
# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Check the version of nvm installed
nvm --version

# Install the stable version of Node
nvm install stable

# Check the version of Node installed
node -v
```

### Prerequisites

> [!IMPORTANT]
> **Node.js:** Ensure that you have Node.js installed on your system.
> **Docker:** Ensure that you have Docker installed on your system.

### Installation

1. Clone the repository to your local machine:

```
git clone https://github.com/JorgeSarricolea/Rasa-Chatbot
```

2. Navigate to the project directory:

```
cd Rasa-Chatbot
```

3. Install Node dependencies:

```
npm install
```

4. Run Docker Rasa container:
```
docker run -it -v $(pwd):/app rasa/rasa:latest-full init
```

> [!IMPORTANT]
> Make sure to select the current folder, do not create a new one, and train the model for the bot to function correctly.

5. Run Rasa Bot Server:
```
docker run -it -v $(pwd):/app -p 5005:5005 rasa/rasa:latest-full run
```

6. Run the development server:
```
npm run start
```

> [!TIP]
> The project is configured with web-dev-server, a library that simplifies local server deployment.

## Features

**- Responsive Design:** The chatbot is designed to be fully responsive and functional on various device sizes.
**- Web Components:** Utilizes the Lit framework to build modern, reusable web components.
**- Rasa Integration:** Seamless integration with the Rasa framework for natural language understanding and dialogue management.
**- Dockerized Environment:** Easily deploy and run the chatbot using Docker containers.

## Copyright

This project was created by [Jorge Sarricolea](https://jorgesarricolea.com). if you have any specific code questions or would like to chat about programming, feel free to contact me on [WhatsApp](https://wa.me/529381095593).
