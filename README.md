# Pokédex

A browser-based Pokémon trainer registry built with HTML, CSS, and JavaScript, powered by the official [PokéAPI](https://pokeapi.co/). The goal was to make systems and data retrieval compatible with the API. The design was created by me, while certain technical specifications had to be met.

Pokédex is part of the Developer Akademie's training programme for software developers ([www.developerakademie.com](https://www.developerakademie.com)).

[LIVE VIEW](https://pokedex.karina-klages.de)

![Pokédex](./assets/img/pokedex-1.jpg)
![Pokédex](./assets/img/pokedex-2.jpg)
![Pokédex](./assets/img/pokedex-3.jpg)
![Pokédex](./assets/img/pokedex-4.jpg)

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quickstart](#quickstart)
- [Project Structure](#project-structure)

## Prerequisites

No build tool or server required — just a modern browser.

## Quickstart

Clone the repository:

```bash
git clone https://github.com/karinaklages/pokedex.git
cd pokedex
```

Then open `index.html` directly in your browser:

```text
pokedex/index.html
```

## Project Structure

```text
pokedex/
├── assets/
│   ├── fonts/            # Local font files
│   ├── icons/            # App icons
│   └── img/              # Images and screenshots
├── scripts/
│   ├── colors.js         # Pokémon type color mapping
│   ├── dialog.js         # Detail dialog logic
│   └── templates.js      # HTML template functions
├── styles/
│   ├── assets.css        # Asset-specific styles
│   ├── detail-card.css   # Detail card styles
│   ├── fonts.css         # Font definitions
│   ├── main-card.css     # Main card styles
│   ├── mobile.css        # Responsive styles for mobile devices
│   └── standard.css      # Base styles
├── .gitignore
├── index.html            # Application entry point
├── script.js             # Core app logic
└── style.css             # Main stylesheet
```