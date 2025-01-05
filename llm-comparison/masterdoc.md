# LLM Comparison Project - Master Documentation
Last Updated: 2024-05-15

## Quick Reference
- Project: Next.js application for comparing LLM responses
- Focus: Educational use cases and student learning
- Status: Core components in development, using pure Tailwind CSS
- Database: Neon PostgreSQL (Serverless)
- Framework: Next.js 14 with App Router
- Key APIs: Groq API (Integration pending)

## Project Structure
```bash
llm-comparison/
├── app/
│   ├── api/
│   │   └── compare/
│   │       └── route.ts          # Handles model comparison requests
│   ├── components/
│   │   ├── input-section/
│   │   │   └── InputSection.tsx  # Completed with basic Tailwind
│   │   ├── response-section/
│   │   │   └── ResponseSection.tsx  # Updated with text colors
│   │   └── metrics-section/
│   │       └── MetricsSection.tsx   # Pending implementation
│   ├── lib/
│   │   └── metrics.ts            # Metrics calculation utilities
│   └── types/
│       └── responses.ts          # Response type definitions
├── prisma/
│   └── schema.prisma             # Database schema
└── [Next.js config files]
```

## Implementation Status

### ✅ Completed
1. Database Setup
   - Neon PostgreSQL configured and tested
   - Schema designed and implemented with educational metrics focus
   - Environment variables configured in .env
   - Prisma client generated (v6.1.0)

2. Core Components
   - InputSection component completed with:
     * Prompt input textarea with proper styling
     * Model selection buttons with state-based colors
     * Submit button with loading state
     * Basic error handling
     * Proper text contrast and visibility
     ```typescript
     // Button styling example
     className={`px-4 py-2 rounded-md text-sm transition-colors
       ${selectedModels.includes(model)
         ? 'bg-blue-500 text-white'
         : 'bg-gray-100 text-black hover:bg-gray-200'
       }`}
     ```
   
   - ResponseSection component completed with:
     * Grid layout for multiple responses
     * Loading spinner animation
     * Error state display
     * Response display with copy functionality
     * Time taken display
     * Updated text colors for better contrast
     ```typescript
     // Response text styling
     <h3 className="text-lg font-semibold text-black">
     <span className="text-sm text-black">
     <div className="whitespace-pre-wrap text-black">
     ```
   
   - Page Component completed with:
     * 12-column responsive grid layout
     * State management for responses
     * Sequential model processing
     * Error handling per model
     * Loading state management
     * Fixed import paths using relative imports

3. Type System
   - ModelResponse interface
   - ComparisonRequest interface
   - ComparisonResponse interface
   - Proper TypeScript integration

4. UI Standards Implementation
   - Text color system:
     * Primary text: text-black
     * Placeholder text: placeholder-gray-500
     * Button text: text-white (on colored backgrounds)
     * Error text: text-red-500
   - Import path standardization:
     * Using relative paths instead of aliases
     * Consistent directory structure
     * Type imports organization

### 🔄 In Progress
1. API Integration
   - Groq API setup pending
   - Response processing pending
   - Error handling pending
   - Metrics calculation pending

2. Component Development
   - MetricsSection implementation pending
   - Error boundaries needed
   - Loading skeletons pending
   - Response formatting options pending

## Technical Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript 5.x
- Pure Tailwind CSS (decided against shadcn/ui due to installation issues)
- Responsive 12-column grid system

### Backend
- Prisma 6.1.0 (ORM)
- PostgreSQL (Neon Serverless)
- Node.js 18.x+

### APIs & Models
- Groq API (Integration Pending)
- Available Models:
  * llama-3.3-70b-versatile
  * mixtral-8x7b-32768
  * gemma2-9b-it
  * distil-whisper-large-v3-en

## Technical Decisions

1. UI Framework & Styling
   - Using pure Tailwind CSS instead of shadcn/ui due to installation issues
   - Implemented custom 12-column grid system
   - Standardized text colors for better visibility
   - Consistent component styling patterns
   ```typescript
   // Standard input styling
   className="w-full min-h-32 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-500"
   ```

2. Import Strategy
   - Using relative paths instead of alias paths
   - Example: `import { ModelResponse } from './types/responses'`
   - Maintaining consistent app directory structure
   - Keeping types in dedicated directories

3. API Implementation
   - Using sequential processing to prevent system overload
   - Implemented mock API with artificial delays for testing
   - Planning real-time state updates for better UX

4. Type System
   - Separated types into dedicated files
   - Using TypeScript for full type safety
   - Implementing proper interfaces for all components

## Database Schema

### Core Models
1. Prompt Model:
   ```prisma
   model Prompt {
     id        String     @id @default(uuid())
     text      String
     createdAt DateTime   @default(now())
     updatedAt DateTime   @updatedAt
     responses Response[]
   }
   ```

2. Response Model:
   ```prisma
   model Response {
     id          String   @id @default(uuid())
     modelName   String
     text        String
     promptId    String
     prompt      Prompt   @relation(fields: [promptId], references: [id])
     metrics     Metrics  @relation(fields: [metricsId], references: [id])
     metricsId   String   @unique
     createdAt   DateTime @default(now())
     updatedAt   DateTime @updatedAt
   }
   ```

3. Metrics Model:
   ```prisma
   model Metrics {
     id              String    @id @default(uuid())
     response        Response?
     clarity         Float
     accuracy        Float
     depth           Float
     engagement      Float
     helpfulness     Float
     responseTimeMs  Int
     createdAt       DateTime  @default(now())
     updatedAt       DateTime  @updatedAt
     @@index([responseTimeMs])
   }
   ```

4. ComparisonSession:
   ```prisma
   model ComparisonSession {
     id         String    @id @default(uuid())
     createdAt  DateTime  @default(now())
     updatedAt  DateTime  @updatedAt
     modelNames String[]
     promptId   String
     userNotes  String?
   }
   ```

## UI Standards & Guidelines

1. Text Colors
   ```typescript
   // Primary text
   className="text-black"
   
   // Placeholder text
   className="placeholder-gray-500"
   
   // Button text (on colored backgrounds)
   className="text-white"
   
   // Error text
   className="text-red-500"
   ```

2. Component Structure
   - Use 'use client' directive where needed
   - Proper import organization
   - Consistent prop typing
   - Error boundary implementation

3. Responsive Design
   - Mobile-first approach
   - 12-column grid system
   - Proper spacing utilities
   - Flexible layouts

## Environment Setup
1. Required Variables:
   ```env
   DATABASE_URL="postgresql://[user]:[password]@[host]/[db]?sslmode=require"
   GROQ_API_KEY="[Your Groq API Key]"  # Will be needed for API implementation
   ```

2. Current Dependencies:
   ```json
   {
     "dependencies": {
       "clsx": "latest",
       "tailwind-merge": "latest"
     },
     "devDependencies": {
       "@types/react": "latest",
       "@types/node": "latest",
       "typescript": "latest"
     }
   }
   ```

## Known Issues
1. UI Framework
   - Issue: shadcn/ui installation failing with command not found
   - Current Solution: Using pure Tailwind CSS
   - Future Plan: Revisit shadcn/ui integration if needed

2. Development Issues
   - Need to properly set up clsx and tailwind-merge
   - TypeScript showing 3 errors in components
   - Response section needs proper error boundary
   - Mock API needs to be replaced with real implementation

## Current Priorities
1. API Integration
   - Implement actual API route for model comparison
   - Replace mock API with real implementation
   - Add proper error handling
   - Set up metrics calculation

2. Component Enhancement
   - Create MetricsSection component
   - Add proper error boundaries
   - Implement loading skeletons
   - Add response formatting options
   - Add dark mode support

3. Documentation
   - Add proper JSDoc comments
   - Document all component props
   - Update API documentation
   - Document error handling

## Testing Requirements
1. Component Testing
   - Verify text visibility and contrast
   - Test loading states
   - Check error handling
   - Validate responsive layout
   - Test placeholder visibility
   - Verify error message contrast
   - Check button text contrast

2. Import Validation
   - Confirm type imports
   - Verify component imports
   - Check for console errors
   - Test build process

3. API Testing
   - Test with mock endpoints
   - Verify error handling
   - Check response processing
   - Monitor performance

## Development Notes
- Monitor text contrast in different states
- Consider implementing dark mode
- Keep mock API for testing until real implementation
- Consider adding loading skeleton for responses
- Plan for proper error retry mechanisms
- Consider adding response formatting options
- Document all component props
- Add proper JSDoc comments
- Consider adding response comparison features
- Think about adding response analytics