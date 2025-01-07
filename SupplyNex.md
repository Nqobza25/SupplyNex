# SupplyNex

A modern e-commerce platform for building materials, office stationery, and quantity surveying services.

## Project Overview

SupplyNex is a React-based web application built with modern technologies to provide a seamless shopping experience for construction and office supplies. The application uses Tailwind CSS for styling and is deployed on GitHub Pages.

## Tech Stack

- React
- Tailwind CSS
- Vite
- React Router
- Headless UI Components

## Project Structure

```
SupplyNex/
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React Context providers
│   │   ├── pages/         # Application pages
│   │   ├── App.jsx        # Main application component
│   │   ├── main.jsx       # Application entry point
│   │   └── index.css      # Global styles and Tailwind imports
│   ├── index.html         # HTML entry point
│   ├── vite.config.js     # Vite configuration
│   └── package.json       # Project dependencies
└── .github/
    └── workflows/         # GitHub Actions deployment configuration
```

## Development

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment process is handled by GitHub Actions and configured in `.github/workflows/deploy.yml`.

## Features

- Modern, responsive UI using Tailwind CSS
- Client-side routing with React Router
- Component-based architecture
- Automated deployment to GitHub Pages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
