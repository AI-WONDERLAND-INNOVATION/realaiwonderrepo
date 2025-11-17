AI-Bilder

**SaaS AI-powered No-Code Builder for Websites & Mobile Apps**

## Overview

AI-Bilder is a cross-platform no-code builder that lets users create websites and mobile apps using drag-and-drop tools and multiple AI integrations. It provides easy export to mobile, domain management, and API keys, with a focus on accessibility for everyone.

## Features

- Drag-and-drop builder for websites and mobile apps
- **Image to Code**: Upload UI screenshots and convert them to code with AI
- Multiple AI integrations (text, image, code, etc.)
- API key management
- Custom domain provisioning
- User authentication & SaaS billing
- Cross-platform: export for web and mobile (React Native)
- Built with JavaScript, Docker, and Makefile

# Frontend Builder

A powerful React/Next.js SaaS website and app builder with drag-and-drop UI, code export, multi-page support, AI model integration, API generator, domain management, and analytics.

## Features

### ✨ Drag & Drop UI Builder

- Intuitive visual editor for building websites without code
- Component palette with pre-built elements (containers, text, buttons, images, forms, etc.)
- Real-time preview with editable properties
- Nested component support

### 📤 Code Export

- Export clean React/Next.js code
- HTML export support
- Download generated code as files
- Syntax-highlighted code preview

### 📄 Multi-Page Support

- Create and manage multiple pages per project
- Page metadata configuration
- Navigation between pages
- Project organization system

### 🖼️ Image to Code

- Upload screenshots or UI mockups
- AI-powered code generation from images
- Support for OpenAI GPT-4 Vision and Claude Sonnet
- Instant conversion to HTML/CSS/React components
- Direct integration into builder workspace

### 🤖 AI Integration

- AI-powered component generation
- Content creation assistance
- Layout suggestions
- Code improvement recommendations

### 🔌 API Generator

- REST API endpoint generation
- GraphQL schema support
- Next.js API route templates
- CRUD operations scaffolding

### 🌐 Domain Management

- Custom domain connection
- DNS record configuration
- SSL certificate support
- Domain verification

### 📊 Analytics Dashboard

- Page view tracking
- Visitor analytics
- Session duration metrics
- Bounce rate monitoring
- Top pages reporting

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **UI Components**: Custom components with React Icons
- **Drag & Drop**: Custom implementation with native HTML5 API
- **Code Quality**: ESLint

## Architecture

The application follows React best practices and modern patterns:

- **Functional Components**: All components use React hooks
- **Context API**: Global state management for app, builder, and user data
- **Custom Hooks**: Reusable logic for drag-drop, analytics, and code export
- **Service Layer**: Separate services for AI, API generation, domain, and analytics
- **TypeScript**: Strong typing throughout the application
- **ES6+**: Modern JavaScript features including async/await
- **Composition**: Reusable and composable components

## Project Structure

```frontend-builder/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── builder/
│   │   ├── page.tsx
│   │   ├── components.json          # schema for components
│   │   └── actions/
│   │       └── saveProject.ts
│   ├── dashboard/
│   │   └── page.tsx
│   ├── analytics/
│   │   └── page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   └── api/
│       ├── ai/
│       │   └── generate.ts
│       ├── domain/
│       │   ├── verify.ts
│       │   └── configure.ts
│       ├── analytics/
│       │   └── track.ts
│       └── projects/
│           ├── create.ts
│           ├── get.ts
│           ├── update.ts
│           └── delete.ts
│
├── components/
│   ├── builder/
│   │   ├── Canvas.tsx
│   │   ├── ComponentPalette.tsx
│   │   ├── PropertiesPanel.tsx
│   │   ├── CodeExportModal.tsx
│   │   └── ElementWrapper.tsx
│   ├── analytics/
│   │   └── AnalyticsCard.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Header.tsx
│
├── contexts/
│   ├── AppContext.tsx
│   ├── BuilderContext.tsx
│   └── UserContext.tsx
│
├── hooks/
│   ├── useDragDrop.ts
│   ├── useCodeExport.ts
│   ├── useAnalytics.ts
│   └── useProject.ts
│
├── services/
│   ├── aiService.ts
│   ├── domainService.ts
│   ├── apiGenerator.ts
│   ├── analyticsService.ts
│   └── exportService.ts
│
├── types/
│   ├── builder.ts
│   ├── project.ts
│   └── analytics.ts
│
├── public/
│   └── placeholder.png
│
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── next.config.js

```

## Getting Started

### Prerequisites

- Node.js & npm
- Docker (optional, for deployment)
- Git

### Setup

```bash
git clone https://github.com/AI-WONDER-LABs/Ai-bilder.git
cd Ai-bilder
npm install
```

### Running Locally

```bash
npm start
```

### Running with Docker

```bash
docker build -t ai-bilder .
docker run -p 3000:3000 ai-bilder
```

## Documentation

- [Getting Started Guide](docs/getting-started.md)
- [User Guide](docs/user-guide.md)
- [Developer Guide](docs/developer-guide.md)
- [API Reference](docs/api-reference.md)
- [AI Integrations](docs/ai-integrations.md)
- [FAQ](docs/faq.md)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Using GitHub Copilot?** This repository includes comprehensive [Copilot instructions](.github/copilot-instructions.md) to help you get the most out of AI-assisted development.

## License

[MIT](LICENSE)
