import PropTypes from 'prop-types';
export const TodoTypes = PropTypes.shape({
    name: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
}).isRequired;
