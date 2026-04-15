import { useEffect, useState } from 'react'
// Importamos o cliente que você criou com tanto esforço!
import { supabaseClient } from './supabaseClient'

function App() {
  const [clientes, setClientes] = useState([])

  useEffect(() => {
    async function buscar() {
      // Usamos o supabaseClient (o arquivo que tem seus links reais)
      const { data, error } = await supabaseClient.from('Clientes').select('*')
      if (error) {
        console.error('Erro ao buscar:', error)
      } else {
        setClientes(data || [])
      }
    }
    buscar()
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', color: '#333' }}>
      <h1>Lista de Clientes (Barbearia)</h1>
      {clientes.length === 0 ? (
        <p>Carregando clientes ou nenhum cliente encontrado...</p>
      ) : (
        <ul>
          {clientes.map(c => (
            <li key={c.id}>
              <strong>{c.nome}</strong> - {c.whatsapp}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
