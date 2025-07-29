
const SelectField = ({ label, id, name, categories, onChange, value }) => {
  return (
    <div>
      <label htmlFor={name} className='block text-sm font-medium text-gray-300'>
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
        required
      >
        <option value='' className="text-gray-500 text-sm">Select a {name}</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
