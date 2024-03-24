import { useParams } from 'react-router-dom';

const ProjectDetail = () => {
  const { projectId } = useParams();

  return (
    <div>
      <h1>Project Detail</h1>
      <p>{projectId}</p>
    </div>
  );
};

export default ProjectDetail;
