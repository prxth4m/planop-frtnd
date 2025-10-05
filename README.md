# Planopticon Frontend

React + TypeScript + Vite application for exoplanet exploration and classification.

## Features
- **Data Explorer**: Browse and filter Kepler, K2, and TESS exoplanet catalogs
- **Lightcurve Classifier**: Upload and classify lightcurve data using CNN model
- **AI Classifier**: Classify exoplanets using tabular data with Random Forest model
- Responsive design with Tailwind CSS
- Interactive tooltips and pagination
- Real-time API integration

## Tech Stack
- React 18.3.1
- TypeScript 5.8.3
- Vite 5.4.19
- Tailwind CSS
- shadcn/ui components
- Lucide React icons

## Setup

### Prerequisites
- Node.js 18+ and npm

### Installation
```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Update .env.local with your backend URL
# VITE_API_BASE=http://localhost:5000

# Run development server
npm run dev
```

Development server runs on http://localhost:5173

### Build for Production
```bash
npm run build
```

Output in `dist/` folder

## Project Structure
```
src/
├── components/        # React components
│   ├── DataExplorer.tsx
│   ├── LightcurveViewer.tsx
│   ├── PredictForm.tsx
│   ├── DashboardFooter.tsx
│   ├── Footer.tsx
│   └── ui/           # shadcn/ui components
├── pages/            # Page components
│   ├── Index.tsx     # Home page
│   ├── Dashboard.tsx # Main dashboard
│   └── NotFound.tsx  # 404 page
├── hooks/            # Custom React hooks
├── lib/              # Utilities
└── main.tsx          # App entry point

public/
└── data/             # CSV datasets
    ├── kepler.csv
    ├── k2.csv
    └── tess.csv
```

## Deployment

### Vercel (Recommended)
1. Import repository
2. Framework: Vite
3. Add environment variable: `VITE_API_BASE`
4. Deploy

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Add environment variable: `VITE_API_BASE`

## API Integration
Update API calls to use environment variable:
```typescript
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
fetch(`${API_BASE}/api/predict`, {...})
```

## License
MIT
