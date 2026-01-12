# Deployment Guide

## Prerequisites

### 1. Supabase Setup
1. Create a Supabase project at https://supabase.com
2. Get your project URL and anon key from Settings > API

### 2. Database Setup

#### Create Tables
Run these SQL commands in your Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create accounts table
CREATE TABLE accounts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('crypto', 'stocks', 'bank')),
    name VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    amount DECIMAL(20, 8) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('crypto', 'stocks', 'bank')),
    description VARCHAR(500),
    currency VARCHAR(10) NOT NULL,
    category VARCHAR(100),
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_accounts_user_id ON accounts(user_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_account_id ON transactions(account_id);
CREATE INDEX idx_transactions_date ON transactions(date);
```

#### Enable Row Level Security (CRITICAL)

```sql
-- Enable RLS on accounts table
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;

-- Accounts policies
CREATE POLICY "Users can view their own accounts"
    ON accounts FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own accounts"
    ON accounts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own accounts"
    ON accounts FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own accounts"
    ON accounts FOR DELETE
    USING (auth.uid() = user_id);

-- Enable RLS on transactions table
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Transactions policies
CREATE POLICY "Users can view their own transactions"
    ON transactions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions"
    ON transactions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own transactions"
    ON transactions FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own transactions"
    ON transactions FOR DELETE
    USING (auth.uid() = user_id);
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy from .env.example
cp .env.example .env.local
```

Fill in your values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_anon_key_here

# Application URL
NEXT_PUBLIC_DEFAULT_URL=http://localhost:3000  # Change to production URL for deployment

# Alpha Vantage API Key (Optional - for stock prices)
NEXT_PUBLIC_ALPHAVANTAGE_API_KEY=your_api_key_here
```

### 4. Dependencies Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Visit http://localhost:3000

## Building for Production

```bash
npm run build
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

Vercel will automatically:
- Detect Next.js
- Run build
- Deploy to edge network
- Provide HTTPS

### Option 2: Docker

Create `Dockerfile`:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/out ./out
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t finance-tracker .
docker run -p 3000:3000 --env-file .env.local finance-tracker
```

### Option 3: VPS (Ubuntu/Debian)

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone and setup
git clone <your-repo>
cd finance-tracker
npm install
npm run build

# Run with PM2
pm2 start npm --name "finance-tracker" -- start
pm2 save
pm2 startup

# Setup Nginx reverse proxy
sudo apt install nginx
```

Nginx configuration (`/etc/nginx/sites-available/finance-tracker`):
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Post-Deployment Checklist

### Security
- [ ] All environment variables set correctly
- [ ] HTTPS enabled
- [ ] RLS policies verified in Supabase
- [ ] Test user isolation (create 2 accounts, verify data separation)
- [ ] Remove console.log statements from production code

### Functionality
- [ ] User registration works
- [ ] User login works
- [ ] Password reset works
- [ ] Creating accounts works
- [ ] Creating transactions works
- [ ] Editing transactions works
- [ ] Deleting transactions works
- [ ] Price fetching works (crypto, stocks, forex)

### Performance
- [ ] Build completes without errors
- [ ] Pages load in < 3 seconds
- [ ] No console errors in browser
- [ ] External API calls are cached

### Monitoring
- [ ] Setup error tracking (Sentry, LogRocket)
- [ ] Setup uptime monitoring
- [ ] Configure Supabase alerts
- [ ] Review and monitor logs

## Supabase Dashboard Settings

### Authentication
1. Go to Authentication > Settings
2. Configure email templates
3. Set site URL to your production domain
4. Configure redirect URLs
5. Enable email confirmations (recommended)

### Database
1. Enable automatic backups
2. Set up connection pooling if needed
3. Monitor query performance

### Security
1. Review RLS policies regularly
2. Monitor auth logs for suspicious activity
3. Keep Supabase dashboard access restricted

## Troubleshooting

### Build Errors
- Check Node.js version (should be 18+)
- Delete `node_modules` and `.next`, reinstall
- Check for TypeScript errors

### Authentication Issues
- Verify Supabase URL and key
- Check redirect URLs in Supabase dashboard
- Verify email templates are configured

### RLS Issues
- Test RLS policies in Supabase SQL editor
- Verify user_id is set on insert
- Check auth.uid() returns correct user

### Performance Issues
- Enable caching
- Optimize database queries
- Consider CDN for static assets

## Monitoring & Maintenance

### Weekly
- Check error logs
- Review authentication logs
- Monitor API usage (Alpha Vantage limits)

### Monthly
- Update dependencies: `npm update`
- Run security audit: `npm audit`
- Review and rotate API keys if needed

### Quarterly
- Review and update RLS policies
- Performance optimization
- Security audit

## Support

For issues:
1. Check Supabase logs
2. Check application logs
3. Review SECURITY_ASSESSMENT.md
4. Consult Next.js documentation
5. Check Supabase documentation

---

**Last Updated**: 2026-01-11
**Version**: 0.1.0
