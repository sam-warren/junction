![JunctionTech Banner](./src/assets/linkedin-banner.svg)


# JunctionTech Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. This application showcases professional experience, technical expertise, and provides a contact interface for potential clients.

## Features

- 🌓 Dark/Light mode support
- 📱 Fully responsive design
- 📧 Contact form with email integration
- ⚡ Built with performance in mind
- 🔒 Honeypot spam protection
- 📊 Vercel Analytics integration

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Vercel
- **Email Service**: Resend
- **Analytics**: Vercel Analytics & Speed Insights

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Resend API key for email functionality

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/junction.git
cd junction
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory:

```env
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=your_from_email@domain.com
CONTACT_EMAIL=your_contact_email@domain.com
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Visit `http://localhost:5173` in your browser

### Building for Production

```bash
npm run build
# or
yarn build
```

## Project Structure

```
├── api/                    # Serverless API functions
├── src/
│   ├── api/               # API client functions
│   ├── assets/            # Static assets
│   ├── components/        # React components
│   │   ├── about/        # About page components
│   │   ├── contact/      # Contact form components
│   │   ├── home/         # Home page components
│   │   ├── layout/       # Layout components
│   │   └── ui/           # Reusable UI components
│   ├── config/           # Configuration files
│   ├── hooks/            # Custom React hooks
│   ├── styles/           # Global styles
│   └── types/            # TypeScript type definitions
```

## Key Components

- `GridBackground`: Floating logo background
- `ContactForm`: Form component with validation and email integration
- `AboutSection`: Professional experience and skills showcase
- `HeroSection`: Landing page main section
- `Layout`: Main layout wrapper with header and footer

## Development

### Type Checking

```bash
npm run typecheck
# or
yarn typecheck
```

### Linting

```bash
npm run lint
# or
yarn lint
```

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` file includes the necessary rewrites for the API routes and SPA routing.

### Environment Variables

Required environment variables for deployment:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CONTACT_EMAIL`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from modern portfolio websites
- Tailwind CSS for the utility-first CSS framework
- Vercel for hosting and serverless functions
- Resend for email functionality
