import { useState } from "react";
import NoProjectSelect from "./components/NoProjectSelect";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState(() => {
    const existingProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || {};
    return {
      selectedProjectId: undefined,
      projects: existingProjects,
      tasks: existingTasks,
    };
  });

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        id: taskId,
      };

      // 선택된 프로젝트의 태스크 목록에 새 태스크 추가
      const updatedTasks = {
        ...prevState.tasks,
      };
      if (!updatedTasks[prevState.selectedProjectId]) {
        updatedTasks[prevState.selectedProjectId] = [];
      }
      updatedTasks[prevState.selectedProjectId].push(newTask);

      // 로컬 스토리지에 업데이트된 태스크 저장
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return {
        ...prevState,
        tasks: updatedTasks,
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      const updatedTasks = {
        ...prevState.tasks,
      };
      const projectTasks = updatedTasks[prevState.selectedProjectId] || [];

      // 태스크 삭제
      updatedTasks[prevState.selectedProjectId] = projectTasks.filter(
        (task) => task.id !== id
      );

      // 로컬 스토리지에 업데이트된 태스크 저장
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return {
        ...prevState,
        tasks: updatedTasks,
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };

      // 로컬 스토리지에 프로젝트 목록 저장
      const updatedProjects = [...prevState.projects, newProject];
      localStorage.setItem("projects", JSON.stringify(updatedProjects));

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: updatedProjects,
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      const updatedProjects = prevState.projects.filter(
        (project) => project.id !== prevState.selectedProjectId
      );

      // 로컬 스토리지에서 프로젝트 삭제
      localStorage.setItem("projects", JSON.stringify(updatedProjects));

      // 해당 프로젝트의 태스크도 삭제
      const updatedTasks = { ...prevState.tasks };
      delete updatedTasks[prevState.selectedProjectId];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: updatedProjects,
        tasks: updatedTasks,
      };
    });
  }

  const selectedProject =
    projectsState.projects.find(
      (project) => project.id === projectsState.selectedProjectId
    ) || null;

  // 선택된 프로젝트의 태스크를 가져옴
  const projectTasks =
    projectsState.tasks[projectsState.selectedProjectId] || [];

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectTasks}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelect onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
