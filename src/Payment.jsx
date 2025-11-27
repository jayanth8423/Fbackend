import { useLocation } from 'react-router-dom';

const Payment = () => {
  const location = useLocation();
  const { item } = location.state || {};

  if (!item) return <p>No item selected.</p>;

  return (
    <div>
      <h2>Payment Page</h2>
      <img src={item.img} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.price}</p>
      {/* Add payment form here */}
    </div>
  );
};

export default Payment;
