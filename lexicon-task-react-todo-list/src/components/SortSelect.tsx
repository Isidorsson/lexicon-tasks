import { ISortSelectProps } from "./TodoInterface";

export const SortSelect: React.FC<ISortSelectProps> = ({ sortItem, setSortItem }) => {
  return (
    <div>
      <label>Sort by:</label>
      <select value={sortItem} onChange={event => setSortItem(event.target.value as 'asc' | 'desc' | 'completed' | 'uncompleted' | 'timestamp' | 'author')}>
        <option value="timestamp">Timestamp</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
        <option value="author">Author</option>
      </select>
    </div>
  );
};

