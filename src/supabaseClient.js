import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sphqviimkctcwmbrdkaf.supabase.co'
// Verifique se a chave abaixo está EXATAMENTE igual à do seu painel do Supabase
const supabaseAnonKey = 'sb_publishable_wsL5pdmhZow-M7plGL16rQ_QLLhSC8e' 

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
