import EventsCard from "./components/EventsCard";
import JobsCards from "./components/JobsCard";
import PostsCards from "./components/PostsCard";
import TasksCards from "./components/TasksCard";

export default function DashboardCards() {
    return (
        <div className="flex gap-2 flex-col md:flex-row">
            <JobsCards />
            <EventsCard />
            <TasksCards />
        </div>
    )
}