import { useState } from 'react'
import './App.css'

const initialInventory = {
  water: 10,
  coffee: 10,
  milk: 10,
  sugar: 10,
};

const recipes = {
  "Black Coffee": { water: 3, coffee: 1, sugar: 1 },
  "Black Coffee (No Sugar)": { water: 3, coffee: 1 },
  "Coffee with Milk": { water: 1, coffee: 1, milk: 2, sugar: 1 },
  "Coffee with Milk (No Sugar)": { water: 1, coffee: 1, milk: 2 },
};


function App() {

  const [inventory, setInventory] = useState(initialInventory);
  const [message, setMessage] = useState('');

  const canDispense = (recipe) =>
    Object.entries(recipe).every(([ing, amt]) => inventory[ing] >= amt);

  const dispense = (name) => {
    const recipe = recipes[name];
    if (!canDispense(recipe)) {
      setMessage(`❌ Not enough ingredients for ${name}`);
      return;
    }

    const updatedInventory = { ...inventory };
    for (let ing in recipe) {
      updatedInventory[ing] -= recipe[ing];
    }
    setInventory(updatedInventory);
    setMessage(`✅ Dispensed: ${name}`);
  };

  const topUp = (ing, amt) => {
    setInventory(prev => ({
      ...prev,
      [ing]: prev[ing] + amt,
    }));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto font-sans">
       <div className="bg-[#8B4513] text-white rounded-xl shadow-lg p-6">

      <h1 className="text-3xl font-bold mb-6 text-center">☕ Beverage Vending Machine</h1>

      {/* Beverage Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {Object.keys(recipes).map(name => (
          <button
            key={name}
            onClick={() => dispense(name)}
            disabled={!canDispense(recipes[name])}
            className={`p-4 rounded-lg shadow-md transition-colors ${canDispense(recipes[name])
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Message */}
      {message && (
        <div className="mb-4 text-center text-lg font-medium">
          {message}
        </div>
      )}

      {/* Inventory Display */}
      <div className="bg-amber-100 p-4 rounded-md mb-6">
        <h2 className="text-xl font-bold mb-2 text-yellow-900"> Inventory</h2>
        <ul className="space-y-1">
          {Object.entries(inventory).map(([ing, amt]) => (
            <li key={ing} className="flex justify-between text-yellow-900">
              <span>{ing}</span>
              <span>{amt} units</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Top-up Section */}
      <div className="bg-blue-50 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-2 text-blue-600">🔼 Top Up Ingredients</h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(inventory).map(ing => (
            <button
              key={ing}
              onClick={() => topUp(ing, 5)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              +5 units {ing}
            </button>
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}

export default App
