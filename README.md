# Member Task Management Application: Full Stack Solution for SSG Task Monitoring

### Overview
This web application is designed for the **Supreme Student Government (SSG)** to manage and monitor tasks efficiently. It allows the SSG President to assign tasks, track member progress, receive proof of duty via image uploads, and approve task completion. The app is mobile-friendly, works offline, and ensures SSG operations continue smoothly even without an internet connection.

### Features

- **Task Assignment**: Assign tasks to SSG members with descriptions and deadlines.
- **Task Monitoring**: Track task progress and completion in real time.
- **Proof of Duty Submission**: Members can upload selfies as proof of their presence in the SSG office.
- **Approval System**: The SSG President can approve/reject proofs and mark tasks as completed.
- **Overdue Notifications**: Notifications are sent for tasks that are overdue.
- **Mobile-Friendly and Offline Functionality**: The app works offline and is optimized for mobile devices.

### Tech Stack

- **Frontend**:
  - Next.js (React framework)
  - Shadcn UI (UI components)
  - Tailwind CSS (Styling)
  - Framer Motion (Animations)
  - TypeScript (Type safety)
  
- **Backend**:
  - Appwrite (Database, authentication, file storage, notifications)
  - Node.js (Server-side logic)
  
- **Version Control & Collaboration**:
  - GitHub (Repository)
  - Git (Version control)
  
- **Deployment**:
  - Vercel (Hosting and deployment)

### Features in Detail

#### 1. Task Management
- **Create Task**: Admins can assign tasks to members, including a description and deadline.
- **Update Task**: Tasks can be updated to reflect progress or mark as completed.
- **Delete Task**: Admins can delete tasks when necessary.
- **Fetch Tasks**: View tasks assigned to individual members or all members.

#### 2. File Upload
- **Selfie Upload**: Members can upload selfies as proof of presence in the SSG office.
- **Approval System**: The SSG President can approve or reject proofs.

#### 3. Notifications
- **Overdue Task Alerts**: Members receive notifications when tasks are overdue.
- **Deadline Reminders**: Notifications for upcoming task deadlines.

### Offline Functionality
The app can work offline using **service workers** and **PWA** features in Next.js. This ensures that tasks can still be viewed, and proof of duty can be uploaded even when the internet connection is unavailable. Data will sync once a connection is restored.

### Security
- Appwrite Authentication ensures secure login for the SSG President and members.
- File uploads are validated for format and size to prevent malicious content.

### Installation

To set up the project locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/ssg-task-manager.git
   ```
2. **Navigate to the Project Directory**:
   ```bash
   cd ssg-task-manager-app
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Set Up Environment Variables**:
   Create a `.env.local` file and add the following environment variables:
   ```bash
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your-database-id
   NEXT_PUBLIC_APPWRITE_BUCKET_ID=your-bucket-id
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
   NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```
5. **Run the Application**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

### Contribution Guidelines
- Fork the repository.
- Create a feature branch.
- Commit your changes.
- Open a pull request for review.

### License
This project is licensed under the MIT License.