# Vercel Deployment Guide for Secret Vote Parliament

## 📋 Prerequisites

Before deploying to Vercel, ensure you have:

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be pushed to GitHub
3. **Environment Variables**: Prepare all required environment variables
4. **Domain (Optional)**: Custom domain if desired

## 🚀 Step-by-Step Deployment

### Step 1: Connect to Vercel

1. **Login to Vercel**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Sign in with your GitHub account

2. **Create New Project**
   - Click the "New Project" button
   - Select "Import Git Repository"
   - Choose `cloudNetOps7/secret-vote-parliament`

### Step 2: Configure Project Settings

1. **Project Name**
   - Set project name: `secret-vote-parliament`
   - Framework Preset: `Vite`
   - Root Directory: `./` (default)

2. **Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Step 3: Environment Variables Configuration

Add the following environment variables in Vercel dashboard:

```env
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# Infura Configuration
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_API_KEY
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia

# Contract Configuration (Update with deployed contract address)
NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
```

**To add environment variables:**
1. Go to Project Settings → Environment Variables
2. Add each variable with its value
3. Set environment to "Production", "Preview", and "Development"

### Step 4: Deploy

1. **Initial Deployment**
   - Click "Deploy" button
   - Wait for build process to complete (2-5 minutes)
   - Your app will be available at `https://secret-vote-parliament.vercel.app`

2. **Verify Deployment**
   - Open the deployed URL
   - Test wallet connection
   - Verify all features work correctly

### Step 5: Custom Domain (Optional)

1. **Add Custom Domain**
   - Go to Project Settings → Domains
   - Click "Add Domain"
   - Enter your domain name (e.g., `secretvoteparliament.com`)

2. **Configure DNS**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or add A record pointing to Vercel's IP addresses

3. **SSL Certificate**
   - Vercel automatically provides SSL certificates
   - HTTPS will be enabled automatically

## 🔧 Advanced Configuration

### Build Optimization

1. **Enable Edge Functions** (if needed)
   - Go to Project Settings → Functions
   - Configure edge runtime if required

2. **Performance Monitoring**
   - Enable Vercel Analytics
   - Monitor Core Web Vitals
   - Track user interactions

### Environment-Specific Deployments

1. **Preview Deployments**
   - Every push to non-main branches creates preview deployments
   - Perfect for testing before production

2. **Production Deployments**
   - Only main branch deploys to production
   - Automatic deployments on push to main

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**
   ```
   Error: Build failed
   Solution: Check build logs, ensure all dependencies are in package.json
   ```

2. **Environment Variables Not Loading**
   ```
   Error: Undefined environment variable
   Solution: Ensure variables are prefixed with NEXT_PUBLIC_ and added to Vercel
   ```

3. **Wallet Connection Issues**
   ```
   Error: Wallet not connecting
   Solution: Verify WalletConnect Project ID and RPC URLs are correct
   ```

### Debug Steps

1. **Check Build Logs**
   - Go to Deployments tab
   - Click on failed deployment
   - Review build logs for errors

2. **Verify Environment Variables**
   - Check Project Settings → Environment Variables
   - Ensure all required variables are set

3. **Test Locally**
   - Run `npm run build` locally
   - Fix any build errors before deploying

## 📊 Monitoring and Analytics

### Vercel Analytics

1. **Enable Analytics**
   - Go to Project Settings → Analytics
   - Enable Vercel Analytics
   - Track performance metrics

2. **Monitor Performance**
   - View Core Web Vitals
   - Track user engagement
   - Monitor error rates

### Error Tracking

1. **Vercel Functions Logs**
   - Monitor serverless function logs
   - Track API errors
   - Debug performance issues

## 🔄 Continuous Deployment

### Automatic Deployments

1. **GitHub Integration**
   - Every push to main branch triggers deployment
   - Pull requests create preview deployments
   - Automatic rollback on deployment failures

2. **Manual Deployments**
   - Use Vercel CLI: `vercel --prod`
   - Deploy specific commits
   - Rollback to previous versions

### Deployment Workflow

```bash
# Development workflow
git add .
git commit -m "Update feature"
git push origin main

# Automatic deployment to production
# Preview deployment for pull requests
```

## 📈 Performance Optimization

### Build Optimization

1. **Code Splitting**
   - Vite automatically splits code
   - Lazy load components
   - Optimize bundle size

2. **Asset Optimization**
   - Images automatically optimized
   - CSS and JS minified
   - Gzip compression enabled

### Runtime Optimization

1. **Edge Caching**
   - Static assets cached globally
   - API responses cached
   - CDN distribution

2. **Serverless Functions**
   - Automatic scaling
   - Pay-per-use pricing
   - Global edge locations

## 🔐 Security Considerations

### Environment Variables

1. **Sensitive Data**
   - Never commit API keys to repository
   - Use Vercel environment variables
   - Rotate keys regularly

2. **Access Control**
   - Limit team access to production
   - Use branch protection rules
   - Enable two-factor authentication

### HTTPS and Security Headers

1. **Automatic HTTPS**
   - SSL certificates provided automatically
   - HTTP to HTTPS redirects
   - HSTS headers enabled

2. **Security Headers**
   - Configure security headers in `vercel.json`
   - Enable CSP (Content Security Policy)
   - Set up CORS policies

## 📞 Support and Resources

### Vercel Documentation
- [Vercel Docs](https://vercel.com/docs)
- [Vite Deployment Guide](https://vercel.com/guides/deploying-vitejs-to-vercel)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

### Community Support
- [Vercel Discord](https://vercel.com/discord)
- [GitHub Issues](https://github.com/cloudNetOps7/secret-vote-parliament/issues)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/vercel)

---

**Your Secret Vote Parliament app is now live and ready for users! 🎉**
