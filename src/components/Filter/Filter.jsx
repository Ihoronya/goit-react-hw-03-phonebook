import s from './Filter.module.css'

const Filter = ({ filter, onChange }) => {
  return (
    <input className={s.filter}
      type="text"
      name="filter"
      value={filter}
      onChange={({ target }) => onChange(target.value)}
      placeholder="Search by Name"
    />
  );
};

export default Filter;