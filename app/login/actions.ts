'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // Extraemos datos del formulario HTML
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Autenticación con Supabase
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Error de login:', error)
    // Aquí podrías retornar el error para mostrarlo en el front,
    // pero por ahora redirigimos a login error
    redirect('/error') 
  }

  // Si todo sale bien, refrescamos cache y mandamos al dashboard
  revalidatePath('/', 'layout')
  redirect('/admin')
}