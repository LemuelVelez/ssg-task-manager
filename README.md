# Member Task Management System for SSG

## Overview

This web application is designed to assist the Supreme Student Government (SSG) in managing tasks, tracking attendance, and monitoring member participation. It allows for seamless task assignment, proof of duty (via selfies), and task submission tracking, all within an intuitive and mobile-friendly interface.

The app empowers the SSG President to assign and monitor tasks, approve member submissions, and ensure that members remain actively engaged in their responsibilities.

## Features

### 1. Task Management
- **Task Assignment:** The SSG President can assign tasks to members, setting deadlines and providing task details.
- **Task Progress Tracking:** Real-time tracking of task progress, allowing members to update task statuses.
- **Proof of Task Submission:** Members can upload documents as proof of task completion.

### 2. Proof of Duty (Attendance)
- **Selfie Upload:** Members upload selfies as proof of attendance at SSG events or in the SSG office.
- **Approval System:** The SSG President can approve or reject submitted proofs of duty and task submissions.

### 3. Notification System
- **Overdue Task Alerts:** Notifications are sent to members when their tasks are overdue.
- **Task Deadline Reminders:** Members receive reminders of upcoming task deadlines.

### 4. Mobile-Friendly Design
- The application is responsive, ensuring a smooth experience on both desktop and mobile devices for members and administrators.

## Tech Stack

### Frontend
- **Next.js (v14.2.15):** For server-side rendering and building the React-based frontend.
- **Shadcn UI (v0.9.2):** Provides UI components.
- **MUI (Material-UI) (v6.1.4):** For UI components and styling.
- **Framer Motion (v11.11.8):** Adds animations and smooth transitions.
- **Tailwind CSS (v3.4.14):** Handles styling.
- **TypeScript (v5.6.3):** Ensures type safety and a better development experience.
- **React (v18.3.1):** JavaScript library for building user interfaces.
- **React Router DOM (v6.27.0):** For routing and navigation.
- **React Hook Form (v7.53.1):** For managing form state and validation.
- **React Icons (v5.3.0):** Provides a set of popular icons.
- **React Toastify (v10.0.6):** For notifications and alerts.
- **SweetAlert2 (v11.14.4):** For beautiful alerts and confirmations.

### Backend
- **Appwrite (v16.0.2):** Manages the database, authentication, file storage, and notifications.
- **Node.js:** Powers server-side logic for task management, file uploads, and notifications.

### Build Tools
- **PostCSS (v8.4.47):** For processing CSS.
- **Autoprefixer (v10.4.20):** Adds vendor prefixes to CSS rules.
- **ESLint (v8.57.1):** Linting utility for JavaScript and TypeScript.

## Installation and Setup

### Prerequisites
- Node.js (v14 or later)
- NPM or Yarn
- Appwrite (cloud or self-hosted)

### Steps to Install and Run the Project:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/task-management-ssg.git
   ```

2. Navigate to the project folder:

   ```bash
   cd task-management-ssg
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up Appwrite:
   - Create a project in Appwrite.
   - Set up your database to handle task assignments, file storage, and user authentication.

5. Create a `.env.local` file and add the following environment variables (ensure all sensitive information is correctly set up in your environment variables):

   ```plaintext
   NEXT_PUBLIC_APPWRITE_ENDPOINT=[your_appwrite_endpoint]
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=[your_appwrite_project_id]
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=[your_database_id]
   NEXT_PUBLIC_APPWRITE_BUCKET_ID=[your_bucket_id]
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=[your_google_client_id]
   NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=[your_google_client_secret]
   NEXT_PUBLIC_APPWRITE_API_KEY=[your_appwrite_api_key]
   NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID=[your_users_collection_id]
   NEXT_PUBLIC_APPWRITE_TASK_COLLECTION_ID=[your_task_collection_id]
   NEXT_PUBLIC_APPWRITE_NOTIFICATION_COLLECTION_ID=[your_notification_collection_id]
   NEXT_PUBLIC_APPWRITE_PROOFS_COLLECTION_ID=[your_proofs_collection_id]
   ```

6. Run the application:

   ```bash
   npm run dev
   ```

   The app should now be running on `http://localhost:3000`.

### Deploy to Vercel

1. Push your code to GitHub:

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Connect your GitHub repository to [Vercel](https://vercel.com/).

3. Add the necessary environment variables to your Vercel project settings.

4. Deploy the application from the Vercel dashboard.

## How to Use the Application

### Admin (SSG President)
1. **Log in** using the admin credentials.
2. **Assign Tasks**: Create and assign tasks to members with deadlines.
3. **Approve Submissions**: Review and approve member submissions for both task completion and proof of duty.
4. **Monitor Attendance**: Track attendance through selfies and view task progress in real-time.
5. **Send Notifications**: Notify members of overdue tasks or upcoming deadlines.

### Members
1. **View Assigned Tasks**: Members can view all tasks assigned to them, including deadlines and progress tracking.
2. **Submit Proofs**: Upload selfies as proof of attendance and submit documents to show task completion.
3. **Work Online**: View tasks and submit proofs online.

## Screenshots

### Landing Page
![Landing Page](screenshots/taskmanager.png)
![Landing Page](screenshots/taskmanager1.png)

### Admin Login
![Login](screenshots/#taskmanger2.png)

### Dashboard
![Dashboard](screenshots/#taskmanager5.png)
![Task Management](screenshots/#taskmanager6.png)
![Approval & Notification](screenshots/#taskmanager7.png)

### Task Management
![Tasks](screenshots/#taskmanager4.png)

### Proof of Duty Upload
![Proof of Duty Upload](screenshots/#taskmanager3.png)

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to help improve the system.

## License

This project is licensed under the MIT License.