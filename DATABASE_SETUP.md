# Database Setup Guide for AsianLove Dating App

This guide will help you set up MySQL database for local testing of the AsianLove dating app.

## 🗄️ Prerequisites

1. **MySQL Server** (version 8.0 or higher)
2. **Node.js** (version 18 or higher)
3. **npm** or **yarn**

## 📋 Installation Steps

### 1. Install MySQL

#### On macOS (using Homebrew):
```bash
brew install mysql
brew services start mysql
```

#### On Ubuntu/Debian:
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql
```

#### On Windows:
Download and install MySQL from [mysql.com](https://dev.mysql.com/downloads/mysql/)

### 2. Create Database and User

Connect to MySQL as root:
```bash
mysql -u root -p
```

Create the database and user:
```sql
-- Create database
CREATE DATABASE asianlove_db;

-- Create user (replace 'password' with your desired password)
CREATE USER 'asianlove_user'@'localhost' IDENTIFIED BY 'password';

-- Grant privileges
GRANT ALL PRIVILEGES ON asianlove_db.* TO 'asianlove_user'@'localhost';
FLUSH PRIVILEGES;

-- Exit MySQL
EXIT;
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:
```bash
# Database
DATABASE_URL="mysql://asianlove_user:password@localhost:3306/asianlove_db"

# App
NEXT_PUBLIC_APP_NAME=AsianLove
NEXT_PUBLIC_APP_URL=http://localhost:3000

# JWT Secret (for authentication)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Environment
NODE_ENV=development
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Generate Prisma Client

```bash
npm run db:generate
```

### 6. Push Database Schema

```bash
npm run db:push
```

### 7. Seed Database with Sample Data

```bash
npm run db:seed
```

## 🚀 Available Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Create and run migrations
npm run db:migrate

# Seed database with sample data
npm run db:seed

# Open Prisma Studio (database GUI)
npm run db:studio
```

## 📊 Database Schema Overview

### Core Tables:
- **users** - User profiles and authentication
- **photos** - User profile photos
- **interests** - User interests and hobbies
- **matches** - User matches
- **messages** - Chat messages between matches
- **user_preferences** - User dating preferences
- **notifications** - User notifications
- **ads** - Advertisement content
- **ad_watches** - Ad viewing tracking
- **meeting_services** - Real meeting services

### Sample Data Included:
- 6 sample users (3 men, 3 women)
- 24 different interests
- Sample matches and messages
- Sample ads and meeting services

## 🔐 Sample User Accounts

After seeding, you can login with these accounts:

### Men:
- **Email**: john@example.com
- **Password**: password123
- **Name**: John Doe (USA)

- **Email**: michael@example.com
- **Password**: password123
- **Name**: Michael Smith (Australia)

### Women:
- **Email**: sakura@example.com
- **Password**: password123
- **Name**: Sakura Tanaka (Japan)

- **Email**: mai@example.com
- **Password**: password123
- **Name**: Mai Srisai (Thailand)

- **Email**: linh@example.com
- **Password**: password123
- **Name**: Linh Nguyen (Vietnam)

- **Email**: yuki@example.com
- **Password**: password123
- **Name**: Yuki Yamamoto (Japan)

## 🛠️ Troubleshooting

### Common Issues:

1. **Connection Refused**:
   - Make sure MySQL is running
   - Check if the port 3306 is available
   - Verify database credentials

2. **Access Denied**:
   - Check user permissions
   - Verify username and password
   - Ensure user has access to the database

3. **Schema Push Fails**:
   - Check if database exists
   - Verify user has CREATE privileges
   - Check for syntax errors in schema

4. **Seed Fails**:
   - Ensure database is created and accessible
   - Check if tables exist
   - Verify foreign key relationships

### Reset Database:
```bash
# Drop and recreate database
mysql -u root -p -e "DROP DATABASE asianlove_db; CREATE DATABASE asianlove_db;"

# Re-run setup
npm run db:push
npm run db:seed
```

## 📱 Testing the App

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000)

3. Click "Try Demo" to enter the app

4. Use the sample accounts to test features:
   - Swipe through profiles
   - Send messages
   - View matches
   - Test settings

## 🔍 Database Management

### Using Prisma Studio:
```bash
npm run db:studio
```
This opens a web interface at [http://localhost:5555](http://localhost:5555) where you can:
- View and edit data
- Run queries
- Monitor database changes

### Using MySQL CLI:
```bash
mysql -u asianlove_user -p asianlove_db
```

## 📈 Performance Tips

1. **Indexes**: Prisma automatically creates indexes for foreign keys
2. **Connection Pooling**: Configured in Prisma client
3. **Query Optimization**: Use Prisma's query optimization features
4. **Caching**: Consider implementing Redis for session storage

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **Password Hashing**: All passwords are hashed with bcrypt
3. **JWT Tokens**: Used for authentication
4. **SQL Injection**: Prevented by Prisma ORM
5. **Input Validation**: Implemented in API routes

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

---

**Happy Dating! 💕** 