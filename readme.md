# Classroom AI - Smart Assignment Assistant

![Classroom AI](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38B2AC)
![Google APIs](https://img.shields.io/badge/Google%20APIs-Integrated-4285F4)

A comprehensive web application that integrates with Google Classroom to provide AI-powered assignment management, deadline notifications, and intelligent study assistance.

## Features

- **Assignment Dashboard**: View all pending, missing, and completed assignments in one centralized location
- **Smart Notifications**: Get timely email reminders before assignment deadlines
- **AI Integration**: Powered by Google Gemini for intelligent assignment assistance and study guidance
- **Secure Authentication**: OAuth 2.0 integration with Google Classroom and Gmail
- **Real-time Sync**: Automatic polling for new assignments and updates from Google Classroom
- **Responsive Design**: Access your assignments from any device with a modern, mobile-friendly interface
- **Assignment Analytics**: Track completion rates and identify patterns in your coursework

## Technology Stack

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Backend**: Next.js API Routes
- **Authentication**: NextAuth.js with Google OAuth 2.0
- **APIs**: Google Classroom API, Gmail API, Google Gemini AI
- **Styling**: Tailwind CSS with Lucide React icons
- **Type Safety**: Full TypeScript implementation

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- A **Google Cloud Console** account
- A **Google Workspace** or **personal Google** account with access to Google Classroom

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/classroom-ai-assistant.git
cd classroom-ai-assistant
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Google Cloud Console Configuration

#### Step 3.1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: `classroom-ai-assistant`
4. Click "Create"

#### Step 3.2: Enable Required APIs

Navigate to "APIs & Services" → "Library" and enable:

1. **Google Classroom API**
   - Search for "Google Classroom API"
   - Click "Enable"

2. **Gmail API** 
   - Search for "Gmail API"
   - Click "Enable"

3. **Google+ API** (for user profile information)
   - Search for "Google+ API"
   - Click "Enable"

#### Step 3.3: Configure OAuth Consent Screen

1. Go to "APIs & Services" → "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required fields:
   - App name: `Classroom AI Assistant`
   - User support email: Your email
   - Developer contact: Your email
4. Add scopes:
   - `../auth/userinfo.email`
   - `../auth/userinfo.profile`
   - `../auth/classroom.courses.readonly`
   - `../auth/classroom.coursework.me`
   - `../auth/gmail.send`
5. Add test users (your Google account email)

#### Step 3.4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client ID"
3. Choose "Web application"
4. Name: `Classroom AI Web Client`
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - (Add production URLs when deploying)
6. Click "Create"
7. **Save the Client ID and Client Secret** - you'll need these for environment variables

### 4. Get Gemini AI API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 5. Environment Variables Setup

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` with your actual values:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_actual_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_actual_google_oauth_client_secret

# NextAuth Configuration
NEXTAUTH_SECRET=your_generated_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Google AI (Gemini) Configuration
GEMINI_API_KEY=your_actual_gemini_api_key
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 6. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage Instructions

### Initial Setup
1. Open the application in your browser
2. Click "Sign in with Google"
3. Grant the required permissions:
   - Access to your Google Classroom courses
   - Permission to send emails on your behalf
   - Basic profile information

### Dashboard Features
- **Assignment Overview**: View counts of pending, missing, and completed assignments
- **Course Integration**: Automatically syncs with all your Google Classroom courses
- **AI Assistance**: Click on any assignment to get AI-powered help and guidance
- **Email Notifications**: Set up automatic reminders for upcoming deadlines

### API Endpoints

The application provides several API endpoints:

- `GET /api/assignments` - Fetch all assignments from Google Classroom
- `POST /api/send-email` - Send assignment reminder emails
- `POST /api/ai-assist` - Get AI assistance for assignments
- `GET/POST /api/auth/[...nextauth]` - Authentication handling

## Required Google Cloud Console APIs & Permissions

### APIs to Enable:
1. **Google Classroom API** - For fetching courses and assignments
2. **Gmail API** - For sending notification emails
3. **Google+ API** - For user authentication and profile information

### OAuth 2.0 Scopes:
```
https://www.googleapis.com/auth/userinfo.email
https://www.googleapis.com/auth/userinfo.profile
https://www.googleapis.com/auth/classroom.courses.readonly
https://www.googleapis.com/auth/classroom.coursework.me
https://www.googleapis.com/auth/gmail.send
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Update Google OAuth redirect URIs to include your production domain
5. Deploy!

### Environment Variables for Production

Make sure to add these environment variables in your production environment:
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (your production URL)
- `GEMINI_API_KEY`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Troubleshooting

### Common Issues:

1. **"Invalid Client" Error**
   - Verify OAuth redirect URIs match exactly
   - Check that client ID and secret are correct

2. **"Insufficient Permissions" Error**
   - Ensure all required APIs are enabled in Google Cloud Console
   - Check OAuth consent screen configuration

3. **"Invalid API Key" Error**
   - Verify Gemini API key is correct
   - Check that the key has proper permissions

4. **No Assignments Loading**
   - Ensure user has assignments in Google Classroom
   - Check browser console for API errors

### Getting Help:

- Check the [Issues](https://github.com/yourusername/classroom-ai-assistant/issues) page
- Review Google Cloud Console API quotas and limits
- Verify all environment variables are set correctly

---