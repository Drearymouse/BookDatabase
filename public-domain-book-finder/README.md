# Public Domain Book Finder for KDP

A web application that helps identify public domain books with high sales potential for Kindle Direct Publishing (KDP).

## Features

- 🔍 Search and browse public domain books from multiple sources
- ⚖️ Copyright status verification with confidence scoring
- 📈 Sales potential analysis using market data
- 📚 User workspace for tracking and managing books
- 🔄 Real-time updates with Supabase
- 🌙 Dark mode support
- 📱 Fully responsive design

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Storage, Edge Functions)
- **Data Sources**: 
  - Project Gutenberg
  - Google Books API
  - Wikipedia API
  - Google Trends API (optional)
  - Internet Archive (optional)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- A Supabase account (free tier available at [supabase.com](https://supabase.com))

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/public-domain-book-finder.git
   cd public-domain-book-finder
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Supabase credentials and any optional API keys

4. Set up your Supabase project
   - Create a new project at [app.supabase.com](https://app.supabase.com)
   - Run the SQL from `supabase/migrations/initial_schema.sql` in the SQL editor
   - Configure authentication providers if needed
   - Enable Row Level Security (RLS) on all tables

5. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

See `.env.local.example` for all available environment variables.

## Project Structure

```
public-domain-book-finder/
├── public/                  # Static files
├── src/
│   ├── app/                 # App router pages and layouts
│   ├── components/           # Reusable React components
│   ├── lib/                  # Utility functions and API clients
│   ├── styles/               # Global styles and Tailwind config
│   └── types/                # TypeScript type definitions
├── supabase/
│   └── migrations/          # Database migrations
├── .env.local.example        # Example environment variables
├── next.config.js            # Next.js configuration
├── package.json
└── README.md
```

## Database Schema

The database schema is defined in `supabase/migrations/initial_schema.sql`. It includes tables for:

- Books and authors
- Copyright status tracking
- Sales potential analysis
- User book lists and notes
- Data source tracking

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fpublic-domain-book-finder&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY&envDescription=Supabase%20credentials%20are%20required%20to%20deploy%20this%20application.&envLink=https%3A%2F%2Fsupabase.com%2Fdocs%2Fguides%2Fgetting-started%2Fquickstarts%2Fnextjs)

1. Click the "Deploy" button above
2. Connect your GitHub account
3. Add your environment variables
4. Click "Deploy"

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Project Gutenberg](https://www.gutenberg.org/) for providing free public domain books
- [Supabase](https://supabase.com/) for the amazing open source backend
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
