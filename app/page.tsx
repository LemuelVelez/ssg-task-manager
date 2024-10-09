import TaskManager from "./components/TaskManager";

export default function Home() {
  return (
    <section className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">
        Welcome to the SSG Task Manager!
      </h2>
      <TaskManager />
    </section>
  );
}
