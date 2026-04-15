import { createClient } from '@supabase/supabase-js'

// Colocamos os valores direto aqui para não ter erro de variável vazia
const supabaseUrl = 'https://sphqviimkctcwmbrdkaf.supabase.co'
const supabaseAnonKey = 'sb_publishable_wsL5pdmhZow-M7plGL16rQ_QLLhSC8e'

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
