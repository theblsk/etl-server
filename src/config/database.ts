export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'kudwatest',
  user: process.env.DB_USER || 'username',
  password: process.env.DB_PASSWORD || 'password',
  url: process.env.DATABASE_URL || 'postgresql://username:password@localhost:5432/kudwatest'
};

export const serverConfig = {
  port: Number(process.env.PORT || '3000'),
  env: process.env.NODE_ENV || 'development'
}; 