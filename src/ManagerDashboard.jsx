import { useState, useEffect } from "react";
import axios from "axios";
import config from "./config";
import "./ManagerDashboard.css";

export default function ManagerDashboard() {
  const [form, setForm] = useState({
    pid: "",
    pname: "",
    pprs: "",
    pcategory: "",
    quantity: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [items, setItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios
      .get(`${config.apiUrl}${config.endpoints.items}`)
      .then((res) => setItems(res.data))
      .catch(() => setErrorMsg("Failed to fetch items."));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return setErrorMsg("Please select an image file.");

    const formData = new FormData();
    for (let key in form) formData.append(key, form[key]);
    formData.append("image", imageFile);

    try {
      const res = await axios.post(
        `${config.apiUrl}${config.endpoints.items}`,
        formData
      );
      setItems([...items, res.data]);
      setForm({ pid: "", pname: "", pprs: "", pcategory: "", quantity: "" });
      setImageFile(null);
      setErrorMsg("");
    } catch {
      setErrorMsg("Error adding item.");
    }
  };

  const handleDelete = async (pid) => {
    try {
      await axios.delete(`${config.apiUrl}${config.endpoints.deleteItem(pid)}`);
      setItems(items.filter((item) => item.pid !== pid));
    } catch {
      setErrorMsg("Error deleting item.");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Manager Dashboard</h1>

      <form onSubmit={handleSubmit} className="dashboard-form">
        <input name="pid" placeholder="PID" value={form.pid} onChange={handleChange} required />
        <input name="pname" placeholder="Name" value={form.pname} onChange={handleChange} required />
        <input name="pprs" placeholder="Price" value={form.pprs} onChange={handleChange} required />
        <input name="pcategory" placeholder="Category" value={form.pcategory} onChange={handleChange} required />
        <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
        <input type="file" onChange={handleImageChange} accept="image/*" required />
        <button type="submit">Add Item</button>
      </form>

      {errorMsg && <p className="error-message">{errorMsg}</p>}

      <table className="dashboard-table">
        <thead>
          <tr>
            <th>PID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td>{item.pid}</td>
              <td>{item.pname}</td>
              <td>
                <img
                  src={`${config.apiUrl}${config.endpoints.images(item.pimg)}`}
                  alt={item.pname}
                  onError={(e) => (e.target.src = "/default.png")}
                  style={{ height: "48px", width: "48px", objectFit: "cover" }}
                />
              </td>
              <td>{item.pprs}</td>
              <td>{item.pcategory}</td>
              <td>{item.quantity}</td>
              <td>
                <button
                  onClick={() => handleDelete(item.pid)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
