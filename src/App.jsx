import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'


function App() {
  const [inventory, setInventory] = useState([]);
  const [message, setMessage] = useState('');
  const [bevIngredQty, setBevIngredQty] = useState({})
  const [beverage, setBeverage] = useState([])


  useEffect(() => {
    getBeverage();
    getInventory();
  }, []);


  const getInventory = async () => {
    await axios.get("http://localhost:5000/api/inventory")
      .then((res) => setInventory(res?.data))
      .catch((err) => console.error("Inventory Error:", err));
  }

  const getBeverage = async () => {
    await axios.get("http://localhost:5000/api/beverage")
      .then((res) => setBeverage(res?.data))
      .catch((err) => console.error("Beverages Error:", err));
  }

  // dispense beverage 
  const dispense = async (id, name) => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/dispense_beverage',
        { beverageId: id }
      );
        setBevIngredQty(data);
        await getInventory();
        setMessage(`✅ Dispensed: ${name}`);
    } catch (err) {
      console.error(err);
      setMessage(`❌ Failed to dispense ${name}`);
    }
  };
  
  //add ingredients
  const topUp = (id, value) => {
    let obj = {
      id: id,
      value: value
    }
    axios.post('http://localhost:5000/api/add_ingredient', obj)
      .then((res) => {
        console.log('Added successfully!');
        getInventory();
      })
      .catch((err) => console.error(err))
  }


  return (
    <div className="p-6 max-w-3xl mx-auto font-sans">
      <div className="bg-[#8B4513] text-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">☕ Beverage Vending Machine</h1>

        {/* Beverage Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {beverage?.map((item, idx) => {
            const isDisabled = !Object.entries(item.ingredients).every(([ingName, requiredQty]) => {
              const invItem = inventory.find(inv => inv.name === ingName);
              return invItem && invItem.value >= requiredQty;
            });

            return (
              <button
                key={idx}
                onClick={() => dispense(item?._id, item?.name)}
                disabled={isDisabled}
                className={`p-4 rounded-lg shadow-md transition-colors ${
                  isDisabled
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {/* Message */}
        {message && (
          <div className="mb-4 text-center text-lg font-medium">
            {message}
          </div>
        )}

        {/* beverage ingredient */}
        {bevIngredQty && (
          <div className="mb-4 text-center text-lg font-medium">
            {Object.entries(bevIngredQty).map(([key, value]) => (
              <div key={key} className="inline-block mx-2">
                <span className="font-semibold">{key}:</span>{" "}
                <span>{value}</span>
              </div>
            ))}
          </div>
        )}


        {/* Inventory Display */}
        <div className="bg-amber-100 p-4 rounded-md mb-6">
          <h2 className="text-xl font-bold mb-2 text-yellow-900"> Inventory </h2>
          <ul className="space-y-1">
            {inventory?.map((item, key) => (
              <li key={item} className="flex justify-between text-yellow-900">
                <span>{item.name}</span>
                <span>{item.value} units</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top-up Section */}
        <div className="bg-blue-50 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2 text-blue-600">🔼 Top Up Ingredients</h2>
          <div className="grid grid-cols-2 gap-4">
            {inventory?.map((item, idx) => (
              <button
                key={idx}
                onClick={() => topUp(item._id, 5)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                +5 units {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
