# Member Task Management System for SSG

## Overview

This web application is designed to assist the Supreme Student Government (SSG) in managing tasks, tracking attendance, and monitoring member participation. It allows for seamless task assignment, proof of duty (via selfies), and task submission tracking, all within an intuitive and mobile-friendly interface. The system also includes offline functionality to ensure accessibility and continuity even without internet access.

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

### 4. Offline Functionality
- The system supports offline access, allowing members to view tasks and upload proofs even without an internet connection. Data syncs when online access is restored.

### 5. Mobile-Friendly Design
- The application is responsive, ensuring a smooth experience on both desktop and mobile devices for members and administrators.

## Tech Stack

### Frontend
- **Next.js:** For server-side rendering and building the React-based frontend.
- **Shadcn UI:** Provides UI components.
- **Tailwind CSS:** Handles styling.
- **Framer Motion:** Adds animations and smooth transitions.
- **TypeScript:** Ensures type safety and a better development experience.

### Backend
- **Appwrite:** Manages the database, authentication, file storage, and notifications.
- **Node.js:** Powers server-side logic for task management, file uploads, and notifications.

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

5. Create a `.env.local` file and add the following environment variables:

   ```bash
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
   NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
   NEXT_PUBLIC_APPWRITE_API_KEY=your_appwrite_api_key
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
3. **Work Offline**: View tasks and submit proofs while offline, with data syncing once back online.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to help improve the system.

## License

This project is licensed under the MIT License.