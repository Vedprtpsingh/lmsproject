import { useEffect, useState } from 'react';
import { useLms } from '../context/LmsContext.jsx';
export default function Toast() {
  const { toast } = useLms(); const [visible, setVisible] = useState(false);
  useEffect(() => { if (toast) { setVisible(true); const t = setTimeout(() => setVisible(false), 3500); return () => clearTimeout(t); } }, [toast]);
  if (!toast || !visible) return null;
  return <div className="toast show position-fixed bottom-0 end-0 m-4"><div className={`toast-header text-bg-${toast.type}`}><strong className="me-auto">C-DAC Bangalore LMS</strong><button className="btn-close" onClick={() => setVisible(false)} /></div><div className="toast-body">{toast.message}</div></div>;
}
