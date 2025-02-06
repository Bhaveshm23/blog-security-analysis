# Blog Security Analysis & Fixes

## Introduction
This project is a **Node.js**, **Express.js**, and **MongoDB**-based blog website designed to analyze and address common security vulnerabilities. The primary goal is to demonstrate how static code analysis tools such as **SonarQube** and **Snyk** can identify security risks in a web application and how to fix them effectively.

## Features
- Blog posting with categories
- Secure session management
- Input sanitization to prevent **Cross-Site Scripting (XSS)** attacks
- Secure random integer generation for enhanced security
- Removal of technology fingerprinting
- Secure storage of sensitive information using environment variables

## Security Vulnerabilities & Fixes
### 1. Insecure Random Number Generation
**Issue:**
- The application used `Math.random()`, which is not cryptographically secure and predictable.

**Fix:**
- Replaced `Math.random()` with `crypto.randomInt()` to generate unpredictable random numbers.

### 2. Technology Fingerprinting
**Issue:**
- The `x-powered-by` header disclosed that the server runs on **Express.js**, making it easier for attackers to target vulnerabilities.

**Fix:**
- Disabled the `x-powered-by` header using `app.disable('x-powered-by')`.

### 3. Hardcoded Secret Keys
**Issue:**
- Sensitive keys were hardcoded in the application, making them vulnerable to exposure.

**Fix:**
- Moved sensitive data to a `.env` file and used `dotenv` to load them securely.

### 4. Cross-Site Scripting (XSS) Prevention
**Issue:**
- Unsanitized user inputs could lead to XSS attacks.

**Fix:**
- Implemented input sanitization using the `sanitize-html` package.

### 5. Sensitive Data Exposure in Error Messages
**Issue:**
- Error messages leaked sensitive information about the application.

**Fix:**
- Replaced direct error messages with a generic response and logged detailed errors only in the server logs.

## Static Code Analysis Tools Used
1. **SonarQube**
   - Detected vulnerabilities in JavaScript and HTML files.
   - Highlighted code smells and security risks.

2. **Snyk**
   - Identified security vulnerabilities in dependencies.
   - Scanned `.ejs` files for security issues.

## Installation & Setup
### Prerequisites
- **Node.js** 
- **MongoDB** (Local)

### Steps to Run
1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/blog-security-analysis.git
   cd blog-security-analysis
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory and add:
     ```env
     BLOG_APP_SECRET_SESSION=your_secret_key
     MONGODB_URI=mongodb://localhost:27017/blog-website
     ```

4. **Start the application**
   ```sh
   npm start
   ```

5. **Access the application**
   - Open `http://localhost:3000` in your browser.
