const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createClient = async (data) => {
    const res = await fetch(`${API_URL}/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  };
  