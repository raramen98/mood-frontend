'use client';
import { useEffect, useState } from 'react';

const API = process.env.NEXT_PUBLIC_API || 'http://localhost:4000';
const FACES = ['😢', '😕', '😐', '🙂', '😄'];

export default function Page() {
  const [list, setList] = useState([]);
  const [mood, setMood] = useState(0);
  const [note, setNote] = useState('');

  const load = () => fetch(`${API}/moods`).then((r) => r.json()).then(setList);
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!mood) return;
    await fetch(`${API}/moods`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mood, note }),
    });
    setNote('');
    load();
  };

  return (
    <main>
      <h1>오늘 기분은?</h1>
      <div style={{ display: 'flex', gap: 8, fontSize: 36 }}>
        {FACES.map((f, i) => (
          <button key={i} onClick={() => setMood(i + 1)}
            style={{ fontSize: 36, background: mood === i + 1 ? '#ffe08a' : '#eee', border: 0, borderRadius: 12, padding: 8, cursor: 'pointer' }}>
            {f}
          </button>
        ))}
      </div>
      <input value={note} onChange={(e) => setNote(e.target.value)} maxLength={200}
        placeholder="한 줄 메모 (선택)" style={{ width: '100%', margin: '12px 0', padding: 8, boxSizing: 'border-box' }} />
      <button onClick={save} disabled={!mood} style={{ padding: '8px 16px' }}>기록</button>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: 24 }}>
        {list.map((m) => (
          <li key={m.date} style={{ padding: '6px 0', borderBottom: '1px solid #eee' }}>
            {m.date} {FACES[m.mood - 1]} {m.note}
          </li>
        ))}
      </ul>
    </main>
  );
}
