import React, { useState } from 'react';


function Display({ expression }) {
  return (
    <div style={{
      backgroundColor: '#d8dadf',
      height: '80px',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      padding: '10px 16px',
      fontSize: '26px',
      fontWeight: 'bold',
      color: '#333',
      fontFamily: 'monospace',
      boxSizing: 'border-box'
    }}>
      {expression || '0'}
    </div>
  );
}


function Button({ label, color = '#43a047', onClick }) {
  return (
    <button
      onClick={() => onClick(label)}
      style={{
        backgroundColor: color,
        color: '#ffffff',
        border: '1px solid #2e7d32',
        fontSize: '18px',
        fontWeight: 'bold',
        height: '46px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none'
      }}
    >
      {label}
    </button>
  );
}


export default function App() {
  const [expression, setExpression] = useState('');
  const btnColor = '#43a047';

  const handleClick = (val) => {
    if (val === 'Clear') {
      setExpression('');
    } else if (val === 'Delete') {
      setExpression((prev) => prev.slice(0, -1));
    } else if (val === '=') {
      if (!expression) return;
      try {
        const result = new Function(`return ${expression}`)();
        setExpression(String(result));
      } catch (err) {
        setExpression('Error');
        setTimeout(() => setExpression(''), 1200);
      }
    } else {
      setExpression((prev) => (prev === 'Error' ? val : prev + val));
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      fontFamily: 'sans-serif'
    }}>
      <h2 style={{ marginBottom: '16px', color: '#333' }}>Virtual Calculator</h2>

      <div style={{
        width: '320px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        borderRadius: '4px',
        overflow: 'hidden',
        backgroundColor: '#fff'
      }}>
        <Display expression={expression} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <Button label="Clear" color={btnColor} onClick={handleClick} />
          <Button label="Delete" color={btnColor} onClick={handleClick} />
          <Button label="." color={btnColor} onClick={handleClick} />
          <Button label="/" color={btnColor} onClick={handleClick} />

          <Button label="7" color={btnColor} onClick={handleClick} />
          <Button label="8" color={btnColor} onClick={handleClick} />
          <Button label="9" color={btnColor} onClick={handleClick} />
          <Button label="*" color={btnColor} onClick={handleClick} />

          <Button label="4" color={btnColor} onClick={handleClick} />
          <Button label="5" color={btnColor} onClick={handleClick} />
          <Button label="6" color={btnColor} onClick={handleClick} />
          <Button label="-" color={btnColor} onClick={handleClick} />

          <Button label="1" color={btnColor} onClick={handleClick} />
          <Button label="2" color={btnColor} onClick={handleClick} />
          <Button label="3" color={btnColor} onClick={handleClick} />
          <Button label="+" color={btnColor} onClick={handleClick} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <div></div>
          <Button label="0" color={btnColor} onClick={handleClick} />
          <Button label="=" color={btnColor} onClick={handleClick} />
          <div></div>
        </div>
      </div>
    </div>
  );
}
