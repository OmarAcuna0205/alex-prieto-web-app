'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteProject(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  // Validamos que haya usuario (Doble seguridad)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('No autorizado')
  }

  // Borramos de Supabase
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error borrando:', error)
    return
  }

  // Actualizamos la vista del admin y del home público
  revalidatePath('/admin')
  revalidatePath('/')
}