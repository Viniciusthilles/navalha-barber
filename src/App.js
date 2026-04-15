import React, { useState } from 'react';
import { supabaseClient } from './supabaseClient';
import './index.css'; // Garantindo que ele puxe o seu CSS novo

function App() {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleProximo = async () => {
    if (!nome || !whatsapp) {
      alert("Por favor, preencha seu nome e whatsapp");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabaseClient
        .from('Clientes')
        .insert([{ nome, whatsapp }]);

      if (error) throw error;

      alert("Identificado com sucesso! Bem-vindo à Navalha.");
      setNome('');
      setWhatsapp('');
    } catch (error) {
      alert("Erro ao salvar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="container">
        <h1>NAVALHA</h1>
        <p className="progresso">IDENTIFICAÇÃO</p>

        <input 
          type="text" 
          placeholder="SEU NOME" 
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        
        <input 
          type="text" 
          placeholder="SEU WHATSAPP" 
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
        />

        <button onClick={handleProximo} disabled={loading}>
          {loading ? 'PROCESSANDO...' : 'PRÓXIMO'}
        </button>
      </div>
    </div>
  );
}

export default App;
