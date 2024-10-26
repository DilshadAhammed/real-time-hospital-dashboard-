# Unified Grievance Redressal Portal for Kerala Government

## Overview
The Unified Grievance Redressal Portal for Kerala Government is a web-based platform designed to facilitate efficient handling of citizen grievances. It integrates all government departments under a single interface, ensuring streamlined grievance management, enhanced transparency, and improved accountability. The portal allows citizens to lodge grievances, track their progress in real-time, and receive updates as grievances are processed and resolved. It aims to foster a responsive governance environment where citizen satisfaction is prioritized.

## Features
- **Grievance Submission**: Citizens can submit grievances along with necessary documents and information.
- **Real-Time Tracking**: A unique ID allows citizens to track the status of their grievances.
- **Automated Escalation**: Grievances are automatically escalated if not resolved within the stipulated 30-day period.
- **Feedback System**: Post-resolution, citizens can provide feedback on the handling of their grievance.
- **Multilingual Support**: Ensures accessibility by supporting both Malayalam and English.

## Technology Stack
- **Frontend**: React.js, HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Security**: JWT for authentication, HTTPS for secure communication
- **Hosting**: Deployed on AWS Cloud

## Installation Instructions
1. **Clone the repository**
git clone https://github.com/Anandhakryshnan/Grievance_Redressal.git
2. **Navigate to the project directory**
3. **Install dependencies**
4. **Set up environment variables**
- Create a `.env` file in the root directory.
- Add the following variables:
  ```
  DB_HOST=localhost
  DB_USER=yourUsername
  DB_PASS=yourPassword
  DB_NAME=grievance_portal
  JWT_SECRET=yourJWTSecret
  ```

5. **Run the application**
6. **Access the portal**
- Open your web browser and visit `http://localhost:3000`

## Usage
- **Register/Login**: Users must register and log in to submit and track grievances.
- **Submit a Grievance**: Input details of the grievance, specify the concerned department, and submit.
- **Track Grievance**: Use the provided ID to check the status and updates related to your grievance.
- **Feedback**: After the grievance is addressed, rate the resolution process and provide feedback.
  


