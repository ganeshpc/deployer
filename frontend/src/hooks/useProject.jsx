import { useContext } from 'react';

import ProjectContext from '../contexts/ProjectContext';

const useProject = () => {
  const projectContext = useContext(ProjectContext);

  if (!projectContext) throw new Error('Context must be inside the provider');

  return projectContext;
};

export default useProject;
