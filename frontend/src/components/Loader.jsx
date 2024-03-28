import PropTypes from 'prop-types';

import { Backdrop, CircularProgress } from '@mui/material';

const Loader = ({ open }) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress />
    </Backdrop>
  );
};

Loader.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default Loader;
