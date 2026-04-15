import React, { useState, useEffect } from 'react';
import { supabaseClient } from './supabaseClient'; // Usando o arquivo que criamos!

function App() {
  const [step, setStep] = useState(1);
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [ocupados, setOcupados] = useState([]);

  const horariosLista = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

  const buscarOcupados = async (dataSelecionada) => {
    const { data: agenda } = await supabaseClient
      .from('Clientes')
      .select('horario')
      .eq('data', dataSelecionada)
      .eq('barbeiro', 'Alyson');
    
    setOcupados(agenda ? agenda.map(o => o.horario) : []);
  };

  const finalizarTudo = async () => {
    const dados = { nome, whatsapp, data, barbeiro: "Alyson", horario };
    const { error } = await supabaseClient.from('Clientes').insert([dados]);

    if (error) {
      alert("Erro ao salvar.");
    } else {
      alert("Agendamento efetuado!");
      const msg = `✅ *AGENDAMENTO CONFIRMADO*%0A👤 *Cliente:* ${nome}%0A📅 *Data:* ${data}%0A⏰ *Hora:* ${horario}%0A✂️ *Barbeiro:* Alyson`;
      window.open(`https://api.whatsapp.com/send?phone=5547988277580&text=${msg}`, '_blank');
      window.location.reload();
    }
  };

  return (
    <div className="main-content">
      <nav className="sidebar">
        <i className="fas fa-cut active"></i>
        <i className="fab fa-whatsapp" onClick={() => window.open('https://api.whatsapp.com/send?phone=5547988277580')} style={{ color: '#25d366' }}></i>
      </nav>

      <div className="container">
        <h1>Navalha</h1>
        <p className="progresso">
          {step === 1 ? "Identificação" : step === 2 ? "Data do Atendimento" : "Escolha o Horário"}
        </p>

        {step === 1 && (
          <div id="step1">
            <input type="text" placeholder="SEU NOME" value={nome} onChange={(e) => setNome(e.target.value)} />
            <input type="tel" placeholder="SEU WHATSAPP" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
            <button onClick={() => nome ? setStep(2) : alert("Informe seu nome")}>Próximo</button>
          </div>
        )}

        {step === 2 && (
          <div id="step2">
            <input type="date" className="date-input" onChange={(e) => {
              const d = e.target.value.split('-').reverse().join('/');
              setData(d);
            }} />
            <div className="barbeiros-container">
              <div className="barbeiro-card">
                <div className="foto-circulo">
                  <img src="https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?q=80&w=200&h=200&auto=format&fit=crop" alt="Alyson" />
                </div>
                <p>ALYSON</p>
              </div>
            </div>
            <button onClick={() => data ? (buscarOcupados(data), setStep(3)) : alert("Escolha uma data")}>Ver Horários</button>
          </div>
        )}

        {step === 3 && (
          <div id="step3">
            <div className="agenda-grid">
              {horariosLista.map(hora => (
                <div 
                  key={hora}
                  className={`hora-slot ${ocupados.includes(hora) ? 'ocupado' : ''} ${horario === hora ? 'selecionado' : ''}`}
                  onClick={() => !ocupados.includes(hora) && setHorario(hora)}
                >
                  {hora}
                </div>
              ))}
            </div>
            {horario && <button onClick={finalizarTudo}>Confirmar Reserva</button>}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
