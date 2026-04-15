import { useEffect, useState } from 'react'
import { supabaseClient } from './supabaseClient'

function App() {
  const [clientes, setclientes] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function buscar() {
      const { data, error } = await supabaseClient.from('Clientes').select('*')
      if (error) {
        console.error('Erro ao buscar:', error)
      } else {
        setclientes(data || [])
      }
      setCarregando(false)
    }
    buscar()
  }, [])

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Navalha & Estilo</h1>
        <p style={styles.subtitle}>Gerenciamento de Clientes</p>
      </header>

      <div style={styles.content}>
        {carregando ? (
          <p style={styles.message}>Carregando lista VIP...</p>
        ) : clientes.length === 0 ? (
          <p style={styles.message}>Nenhum cliente agendado por enquanto.</p>
        ) : (
          <div style={styles.grid}>
            {clientes.map((c) => (
              <div key={c.id} style={styles.card}>
                <div style={styles.cardInfo}>
                  <strong style={styles.nome}>{c.nome || 'Cliente sem nome'}</strong>
                  <span style={styles.detalhe}>Cliente Fiel</span>
                </div>
                <div style={styles.status}></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Estilos direto no JS para facilitar sua vida agora
const styles = {
  container: {
    backgroundColor: '#121212',
    minHeight: '100vh',
    color: '#e0e0e0',
    fontFamily: "'Segoe UI', Roboto, sans-serif",
    padding: '40px 20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    borderBottom: '2px solid #333',
    paddingBottom: '20px',
  },
  title: {
    fontSize: '2.5rem',
    color: '#d4af37', // Dourado Barbearia
    margin: 0,
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
  subtitle: {
    color: '#888',
    marginTop: '5px',
  },
  content: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: '20px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeft: '5px solid #d4af37',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
  },
  nome: {
    fontSize: '1.2rem',
    display: 'block',
    color: '#fff',
  },
  detalhe: {
    fontSize: '0.8rem',
    color: '#d4af37',
  },
  message: {
    textAlign: 'center',
    color: '#666',
  }
}

export default App;
