export default {
  mongoUrl: global.__MONGO_URI__ ?? 'mongodb://localhost:27017/theft',
  port: process.env.PORT ?? 5050,
  jwtSecret: process.env.JWT_SECRET ?? 'phs670==ab'
}
