# Federal Job Title Plain Language Checker

A Next.js web application that analyzes federal government job titles to determine if they follow plain language principles. The app uses OpenAI's GPT-4.1 to provide intelligent analysis and suggestions for improvement.

## Features

- **AI-Powered Analysis**: Uses OpenAI's GPT-4.1 to evaluate job titles against plain language principles
- **Intelligent Caching**: Caches API responses to avoid redundant calls for the same job titles
- **User-Friendly Interface**: Clean, responsive design with clear visual feedback
- **Detailed Feedback**: Provides specific reasons why a title does or doesn't follow plain language principles
- **Alternative Suggestions**: Offers improved job title suggestions when needed

## Plain Language Criteria

The application evaluates job titles based on these principles:
- Clear and understandable to the general public
- Compelling and engaging to potential employees
- Avoids unnecessary jargon or acronyms (unless for specialized roles)
- Clearly indicates what the person does
- Uses common, everyday words when possible
- Concise but descriptive
- Technical roles should describe the function (e.g., "Software Engineer" instead of generic "IT Specialist")

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key with access to GPT-4.1

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd plain-job-title
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
cp .env.local.example .env.local
```

4. Add your OpenAI API key to `.env.local`:
```
OPENAI_API_KEY=your-openai-api-key-here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment on Vercel

1. Push your code to a GitHub repository

2. Go to [Vercel](https://vercel.com) and sign in

3. Click "New Project" and import your GitHub repository

4. Configure environment variables:
   - Add `OPENAI_API_KEY` with your OpenAI API key value

5. Click "Deploy"

Your application will be live at your Vercel URL!

## Project Structure

```
plain-job-title/
├── app/
│   ├── actions/
│   │   └── analyze-job-title.ts   # Server action with OpenAI integration
│   ├── layout.tsx                 # Root layout with metadata
│   ├── page.tsx                   # Home page
│   └── globals.css                # Global styles
├── components/
│   └── JobTitleAnalyzer.tsx       # Main form component
├── public/                        # Static assets
├── .env.local.example             # Environment variable template
├── package.json                   # Dependencies and scripts
└── README.md                      # This file
```

## How It Works

1. **User Input**: Users enter a federal job title in the form
2. **Server Action**: The client calls a server action that securely accesses the OpenAI API
3. **AI Analysis**: GPT-4.1 analyzes the title against plain language principles
4. **Caching**: Results are cached to prevent duplicate API calls for the same title
5. **Response**: The UI displays whether the title follows plain language principles, along with specific reasons and suggestions

## Example Job Titles

### Good Plain Language Examples:
- "Budget Analyst"
- "Human Resources Specialist"
- "Software Developer"
- "Grants Management Officer"

### Examples That Need Improvement:
- "GS-2210-14 Information Technology Specialist (INFOSEC)"
- "Administrative Officer (OA)"
- "Management and Program Analyst"
- "Miscellaneous Administration and Program Series"

## Technical Details

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Model**: OpenAI GPT-4.1
- **Caching**: Next.js unstable_cache with 1-second revalidation (adjustable)
- **Deployment**: Optimized for Vercel

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key with GPT-4.1 access | Yes |

## Contributing

Feel free to submit issues or pull requests to improve the application.

## License

[Your chosen license]
