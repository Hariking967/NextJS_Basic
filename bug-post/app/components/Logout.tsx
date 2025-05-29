'use client'
import { useRouter} from 'next/navigation';

export default function Logout()
{
  const router = useRouter();
  async function logout() {
    await fetch('/api/set-cookie', {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: -1 }),
    });
    window.location.href = '/';
  }

  return (
    <button
      onClick={logout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition">
      Logout
    </button>
  );
}