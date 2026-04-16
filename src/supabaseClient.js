import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sphqviimkctcwmbrdkaf.supabase.co'
// Verifique se a chave abaixo está EXATAMENTE igual à do seu painel do Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwaHF2aWlta2N0Y3dtYnJka2FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MjExNDksImV4cCI6MjA5MTI5NzE0OX0.7tKf_MW52yNBv_1Qq1tAqi8JZO9pgIkCj2x65YAHXuc' 

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
