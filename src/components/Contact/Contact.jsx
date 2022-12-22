import PropTypes from 'prop-types';
import css from './Contact.module.css';

const Contact = ({ id, name, number, deleteContact }) => {
  return (
    <>
      <p className={css.contact__info}>
        {name}: {number}
      </p>
      <button className={css.contact__delete__btn} onClick={deleteContact}>
        Delete
      </button>
    </>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Contact;