# Vercel Deployment Troubleshooting

## Common Error: MIDDLEWARE_INVOCATION_FAILED

### Symptoms
```
500: INTERNAL_SERVER_ERROR
Code: MIDDLEWARE_INVOCATION_FAILED
```

### Causes & Solutions

#### 1. Missing Environment Variables ✅ FIXED
**Cause**: Environment variables not set in Vercel dashboard

**Solution**:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add these **exact** variables:

```
NEXT_PUBLIC_SUPABASE_URL
Value: https://hejnedfijvtdhgvuafwh.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhlam5lZGZpanZ0ZGhndnVhZndoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3ODgzMzUsImV4cCI6MjA3OTM2NDMzNX0.Ic7Ih7waYXGsdVf8DydF3sTIz4q0sOUWYSiBNM8yMfI

SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhlam5lZGZpanZ0ZGhndnVhZndoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mzc4ODMzNSwiZXhwIjoyMDc5MzY0MzM1fQ.abGCmlGO8h9oyYig0kGxgrzP96clP108w7W8pPup65g
```

3. **IMPORTANT**: After adding variables, click "Redeploy" (don't just save)

#### 2. Middleware Error Handling ✅ FIXED
The middleware now has proper error handling and will gracefully fail if environment variables are missing.

#### 3. Vercel Deployment Steps

**After fixing environment variables:**

1. **Redeploy from Vercel Dashboard**:
   - Go to Deployments tab
   - Click the three dots (...) on latest deployment
   - Click "Redeploy"
   - Wait for build to complete

2. **Or push a new commit**:
   ```bash
   git add .
   git commit -m "Fix middleware error handling"
   git push
   ```

## Verification Checklist

After redeploying, verify:

- [ ] Homepage loads without 500 error
- [ ] Can navigate to /login
- [ ] Can navigate to /signup
- [ ] Environment variables show in Vercel dashboard
- [ ] Build logs show no errors

## Checking Vercel Logs

1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on the latest deployment
3. Click "View Function Logs" or "Runtime Logs"
4. Look for:
   - "Missing Supabase environment variables" (if vars not set)
   - "Middleware error:" (if other issues)

## Still Having Issues?

### Check Environment Variables Format
- Variable names must be **exact** (case-sensitive)
- No quotes around values in Vercel dashboard
- No extra spaces before/after values

### Check Supabase Project
1. Go to Supabase Dashboard
2. Settings → API
3. Verify the URL and keys match what you entered in Vercel

### Force Fresh Deploy
```bash
# Clear Vercel cache
vercel --force

# Or from dashboard:
# Settings → General → Clear Build Cache
```

## Success Indicators

✅ **Working deployment shows**:
- Homepage loads
- No 500 errors
- Login page accessible
- Vercel logs show no middleware errors

## Quick Fix Commands

```bash
# 1. Ensure latest code is pushed
git add .
git commit -m "Fix Vercel deployment"
git push

# 2. Check Vercel environment variables
vercel env ls

# 3. Force redeploy
vercel --prod --force
```

## Contact Support

If issues persist:
1. Check Vercel Status: https://www.vercel-status.com/
2. Check Supabase Status: https://status.supabase.com/
3. Review Vercel deployment logs for specific errors
