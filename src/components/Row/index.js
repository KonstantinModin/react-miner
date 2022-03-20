import Item from '../Item';
import './index.css';

const Row = ({ row, y, ...rest }) => (
  <div className="Miner-row">
    {row.map((item, x) => (
      <Item key={`${y}-${x}`} item={item} y={y} x={x} {...rest} />
    ))}
  </div>
);

export default Row;
