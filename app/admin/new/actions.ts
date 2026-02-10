'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Función auxiliar para crear slugs (Ej: "Casa de Playa" -> "casa-de-playa")
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Reemplaza espacios con -
    .replace(/[^\w\-]+/g, '') // Elimina caracteres raros
    .replace(/\-\-+/g, '-')   // Reemplaza multiples - con uno solo
}

export async function createProject(formData: FormData) {
  const supabase = await createClient()

  // 1. Validar Usuario
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autorizado')

  // 2. Extraer datos del formulario
  const title = formData.get('title') as string
  const category = formData.get('category') as string
  const description = formData.get('description') as string
  const location = formData.get('location') as string
  const imageFile = formData.get('image') as File // <--- Aquí está la foto

  // 3. Subir Imagen a Supabase Storage
  // Creamos un nombre único para que no se sobrescriban (usando la fecha)
  const fileExt = imageFile.name.split('.').pop()
  const fileName = `${Date.now()}.${fileExt}`
  const filePath = `${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('assets')
    .upload(filePath, imageFile)

  if (uploadError) {
    console.error('Error subiendo imagen:', uploadError)
    throw new Error('Error al subir la imagen')
  }

  // 4. Obtener la URL pública de la imagen
  const { data: { publicUrl } } = supabase.storage
    .from('assets')
    .getPublicUrl(filePath)

  // 5. Guardar en Base de Datos
  const slug = slugify(title) + '-' + Math.floor(Math.random() * 1000) // Slug único

  const { error: dbError } = await supabase
    .from('projects')
    .insert({
      title,
      slug,
      category,
      description,
      location,
      cover_image_url: publicUrl // Guardamos el link que generamos arriba
    })

  if (dbError) {
    console.error('Error guardando en BD:', dbError)
    throw new Error('Error al guardar en base de datos')
  }

  // 6. Limpiar caché y redirigir
  revalidatePath('/')
  revalidatePath('/admin')
  redirect('/admin')
}