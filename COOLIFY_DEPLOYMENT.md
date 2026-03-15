# 🚀 Coolify Deployment Guide

This guide will help you deploy the Pastor Counselling application on a Coolify VPS server.

## 📋 Prerequisites

- Coolify VPS server with Docker support
- Domain name (optional, but recommended)
- Basic knowledge of Docker and VPS management

## 🔧 Deployment Steps

### 1. Repository Setup

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Ensure your repository contains:
   - `Dockerfile`
   - `docker-compose.yml`
   - All source code and configuration files

### 2. Coolify Configuration

1. Log into your Coolify dashboard
2. Create a new project
3. Add a new resource:
   - **Type**: Docker Compose
   - **Repository**: Your Git repository URL
   - **Branch**: Your main branch (usually `main` or `master`)

### 3. Environment Variables

Set the following environment variables in Coolify:

```env
NODE_ENV=production
PORT=3001
HOSTNAME=0.0.0.0
DATABASE_URL=file:/data/db/custom.db
```

### 4. Volume Configuration

The application uses a persistent volume for the SQLite database:
- **Volume Name**: `app_data`
- **Mount Path**: `/data`
- **Purpose**: Stores SQLite database file (`custom.db`)

### 5. Port Configuration

- **Internal Port**: `3000` (Caddy reverse proxy)
- **External Port**: Configure as needed (Coolify will handle this)
- **Health Check**: Port `3001` (Next.js application)

### 6. Build Configuration

- **Build Context**: `.` (root directory)
- **Dockerfile**: `Dockerfile`
- **Build Args**: None required

### 7. Deployment

1. Click "Deploy" in Coolify
2. Monitor the build logs for any errors
3. Wait for the health checks to pass
4. Access your application via the provided URL

## 🔍 Monitoring & Troubleshooting

### Health Checks
The application includes built-in health checks that monitor:
- Next.js server availability
- Caddy reverse proxy status
- Database connectivity

### Logs
Access logs through Coolify dashboard:
- Application logs: Next.js output
- Database logs: SQLite operations
- Proxy logs: Caddy access/error logs

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs for specific errors

2. **Database Issues**
   - Ensure volume permissions are correct
   - Check database file location
   - Verify Prisma migrations

3. **Port Conflicts**
   - Ensure ports 3000 and 3001 are available
   - Check for conflicting services

## 🔄 Updates

To update your application:
1. Push new code to your repository
2. Coolify will automatically detect changes
3. Trigger a new deployment
4. Monitor the deployment process

## 📊 Performance Optimization

### Resource Requirements
- **CPU**: 1-2 cores minimum
- **RAM**: 1-2 GB minimum
- **Storage**: 10 GB minimum (for database growth)

### Scaling
- Consider using external database for production
- Implement CDN for static assets
- Monitor resource usage and scale accordingly

## 🔐 Security Considerations

1. **Database Security**
   - SQLite file is stored in persistent volume
   - Ensure proper file permissions
   - Consider database encryption for sensitive data

2. **Network Security**
   - Use HTTPS with proper SSL certificates
   - Configure firewall rules
   - Implement rate limiting if needed

3. **Application Security**
   - Keep dependencies updated
   - Review security headers
   - Implement proper authentication

## 📞 Support

For issues related to:
- **Coolify**: Check Coolify documentation or community
- **Application**: Review application logs and configuration
- **Docker**: Verify Docker and Docker Compose setup

## 🎯 Next Steps

After successful deployment:
1. Configure custom domain
2. Set up SSL certificates
3. Configure backup strategy
4. Set up monitoring and alerting
5. Review and optimize performance