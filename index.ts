import { createApp } from './src/app';
import { serverConfig } from './src/config/database';
import { checkDbConnection } from './src/db/connection';
// import { runETL } from './src/etl';

async function startServer() {
  try {
    await checkDbConnection();
    const app = createApp();
    
    app.listen(serverConfig.port, () => {
      console.log(`🚀 Server running on port ${serverConfig.port}`);
      console.log(`📱 Environment: ${serverConfig.env}`);
      console.log(`🔗 API URL: http://localhost:${serverConfig.port}/api`);
      console.log(`📊 Health check: http://localhost:${serverConfig.port}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();