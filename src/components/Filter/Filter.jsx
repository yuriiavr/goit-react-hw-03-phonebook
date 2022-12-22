import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ value, changeFilter }) => {
  return (
    <div>
      <label className={css.filter}>
        {'Find contacts by name'}
        <input
          className={css.filter__input}
          type="text"
          name="filter"
          value={value}
          onChange={changeFilter}
        />
      </label>
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
};

export default Filter;