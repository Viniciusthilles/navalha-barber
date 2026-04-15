import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// Substitua com seus dados do Supabase
const supabase = createClient('SUA_URL_AQUI', 'SUA_KEY_AQUI')

function App() {
  const [clientes, setClientes] = useState([])

  useEffect(() => {
    async function buscar() {
      const { data } = await supabase.from('Clientes').select('*')
      setClientes(data || [])
    }
    buscar()
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Lista de Clientes (Barbearia)</h1>
      <ul>
        {clientes.map(c => (
          <li key={c.id}>{c.nome} - {c.whatsapp}</li>
        ))}
      </ul>
    </div>
  )
}

export default App