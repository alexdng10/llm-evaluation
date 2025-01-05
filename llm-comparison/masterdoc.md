# LLM Comparison Project - Master Documentation
Last Updated: 2024-05-15

## Quick Reference
- Project: Next.js application for comparing LLM responses
- Focus: Educational use cases and student learning
- Status: Core components in development
- Database: Neon PostgreSQL (Serverless)
- Framework: Next.js 14 with App Router
- Key APIs: Groq API (Integration pending)

## Project Structure
```bash
llm-comparison/
├── app/
│   ├── api/
│   │   └── compare/
│   │       └── route.ts
│   ├── components/
│   │   ├── ComparisonLayout.tsx
│   │   ├── input-section/
│   │   ├── response-section/
│   │   └── metrics-section/
│   ├── lib/
│   └── types/
│       ├── response.ts
│       └── metrics.ts
├── prisma/
│   └── schema.prisma
└── [Next.js config files]
```

## Implementation Status

### ✅ Completed
1. Database Setup
   - Neon PostgreSQL configured
   - Schema designed and implemented
   - Environment variables configured
   - Prisma client generated (v6.1.0)

2. Core Structure
   - Next.js project initialized
   - TypeScript and Tailwind configured
   - Basic directory structure established
   - shadcn/ui components integrated

### 🔄 In Progress
1. Core Components
   - Three-column layout implemented
   - Input component basic setup done
   - Response display pending
   - Metrics visualization pending

2. API Integration
   - Groq API setup pending
   - Response processing pending
   - Error handling pending
   - Metrics calculation pending

## Technical Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide icons

### Backend
- Prisma 6.1.0 (ORM)
- PostgreSQL (Neon)
- Node.js

### APIs & Models
- Groq API (Pending)
- Available Models:
  * llama-3.3-70b-versatile
  * mixtral-8x7b-32768
  * gemma2-9b-it
  * distil-whisper-large-v3-en

## Database Schema

### Core Models
1. Prompt (Central)
   - UUID primary key
   - One-to-many with Responses

2. Response
   - Related to prompts
   - One-to-one with Metrics

3. Metrics
   - Educational focus metrics:
     * Clarity (0-100)
     * Accuracy (0-100)
     * Depth (0-100)
     * Engagement (0-100)
     * Helpfulness (0-100)
     * Response Time (ms)

4. ComparisonSession
   - Tracks comparison features

## Environment Setup
1. Required Variables:
   ```
   DATABASE_URL="postgresql://[user]:[password]@[host]/[db]?sslmode=require"
   ```

2. Required Dependencies:
   ```json
   {
     "dependencies": {
       "@prisma/client": "6.1.0",
       "@tanstack/react-query": "latest",
       "@radix-ui/react-icons": "^1.3.0",
       "class-variance-authority": "^0.7.0",
       "clsx": "^2.0.0",
       "lucide-react": "^0.315.0",
       "tailwind-merge": "^2.2.0",
       "axios": "latest",
       "next": "14.x",
       "react": "18.x",
       "react-dom": "18.x",
       "typescript": "5.x",
       "tailwindcss": "3.x"
     }
   }
   ```

## Development Guidelines

### Component Development
1. Use shadcn/ui components for consistency
2. Follow mobile-first responsive design
3. Implement proper TypeScript interfaces
4. Use Lucide icons for visual elements

### Documentation Rules
1. Update this master doc for major changes
2. Keep implementation status current
3. Document all environment variables
4. Track dependency changes
5. Note technical decisions

## Current Priorities
1. Complete core components
   - Finish response display
   - Implement metrics visualization
   - Add proper state management

2. API Integration
   - Set up Groq API client
   - Implement comparison endpoint
   - Add error handling
   - Set up metrics calculation

## Known Issues & Solutions
1. Database Connection
   - Issue: DATABASE_URL not found
   - Solution: Add .env file with connection string

2. SSL Connection
   - Issue: Database unreachable
   - Solution: Add sslmode=require to connection string

## Notes for LLM Agents
- Always check this master doc first
- Document all changes in skibidi.md depend on user preferences
- Update implementation status after changes
- Track new dependencies
- Note any environment changes
- Document technical decisions
- Keep file structure current