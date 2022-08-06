import s from './Button.module.css';

const Button = ({ onButtonClick }) => {
  return (
    <button className={s.button} onClick={onButtonClick}>
      Load More
    </button>
  );
};

export default Button;
