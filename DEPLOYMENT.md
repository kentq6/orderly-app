# Vercel Deployment Guide for Orderly App

This guide will help you deploy your React + Express e-commerce app to Vercel using JSON files for data storage.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **No Database Required**: This app uses JSON files for data storage, making deployment simpler

## Deployment Steps

### 1. Prepare Your Repository
Make sure your code is pushed to GitHub with the new configuration files:
- `vercel.json` (root)
- `client/vercel.json`
- `server/utils/jsonHandler.js` (new JSON file handler)
- Updated routes to use JSON files instead of database

### 2. Deploy to Vercel

#### Method 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from your project root
cd /Users/kentq/Desktop/orderly-app
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: orderly-app (or your preferred name)
# - Directory: ./
# - Override settings? No
```

#### Method 2: Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect the configuration

### 3. Configure Environment Variables

In your Vercel dashboard, go to your project settings and add this environment variable:

#### Required Variable:
```
NODE_ENV=production
```

**Note**: No database connection strings are needed since the app uses JSON files for data storage.

### 4. Deploy and Test

1. After setting environment variables, trigger a new deployment
2. Wait for the build to complete
3. Test your deployed app at the provided Vercel URL

## Local Development

To run locally with JSON file storage:

```bash
# Install dependencies
cd server && npm install
cd ../client && npm install

# Build the frontend
cd client && npm run build

# Start the server
cd ../server && npm start
```

The app will automatically create JSON files in `server/backend/` with default data if they don't exist.

## Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check that all dependencies are in `package.json`
   - Ensure the build command works locally
   - Check Vercel build logs for specific errors

2. **API Routes Not Working**
   - Verify `vercel.json` routing configuration
   - Check that API routes are properly exported
   - Ensure CORS is configured correctly

3. **Static Files Not Loading**
   - Check that images are in the correct directory
   - Verify static file serving configuration in `server.js`

4. **JSON File Issues**
   - Ensure JSON files are in the `server/backend/` directory
   - Check that the JSON files have valid syntax
   - Verify file permissions if running locally

## Production Considerations

1. **Environment Variables**: Never commit sensitive data to your repository
2. **Data Persistence**: Note that JSON files on Vercel are ephemeral - data will reset on each deployment
3. **Monitoring**: Consider adding logging and monitoring for production
4. **Performance**: JSON file operations are fast but consider data size limits
5. **Security**: Ensure proper input validation in your API routes

## Support

If you encounter issues:
1. Check Vercel's documentation: [vercel.com/docs](https://vercel.com/docs)
2. Review the JSON file structure in `server/backend/`
3. Check the Vercel build logs for specific error messages
