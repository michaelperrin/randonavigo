const List = ({ hikes }) => (
  <div>
    {hikes.map(({slug, title}) => (
      <li key={slug}>
        {title}
      </li>
    ))}
  </div>
);

export default List;
