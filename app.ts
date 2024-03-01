import express, { Request, Response } from 'express';
import { postRouter, CategoryRouter, ImageRouter, UserRouter } from './routes';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import path from 'path';

// Load environment variables from .env
dotenv.config();

const app = express();

// Use TypeScript types for better type safety
type Environment = 'development' | 'test' | 'production';

// Use the correct type for the configuration
interface DatabaseConfig {
  username: string;
  password: string | null;
  database: string;
  host: string;
  dialect: string;
}

// Set a default environment if not provided
const env: Environment = (process.env.NODE_ENV as Environment) || 'development';

// Load database configuration
const config: DatabaseConfig = require(path.join(__dirname, '/config/config.json'))[env];

// Create a Sequelize instance
const sequelize = new Sequelize(config as any);

// Body parser middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// Test route
app.use('/test', (req, res) => {
  res.send('hello');
});

// Your routers
app.use('/posts', postRouter);
app.use('/categories', CategoryRouter);
app.use('/upload', ImageRouter);
app.use('/auth', UserRouter);

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

    // Additional setup and start your app here  
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
   