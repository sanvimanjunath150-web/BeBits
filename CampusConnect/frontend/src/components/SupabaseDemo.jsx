import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

// Simple demo component that fetches rows from the "todos" table
const SupabaseDemo = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase.from('todos').select();
      if (error) {
        console.error('Supabase fetch error:', error);
        setError(error.message);
      } else {
        setTodos(data);
      }
      setLoading(false);
    };
    fetchTodos();
  }, []);

  if (loading) return <p className="text-gray-500">Loading todos...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Supabase Todos Demo</h2>
      {todos.length === 0 ? (
        <p className="text-gray-500">No todos found.</p>
      ) : (
        <ul className="list-disc pl-5 space-y-1">
          {todos.map((todo) => (
            <li key={todo.id}>{todo.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SupabaseDemo;
