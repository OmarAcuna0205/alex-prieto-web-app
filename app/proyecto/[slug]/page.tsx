import { createClient } from '@/utils/supabase/server'; // USAMOS EL DE SERVIDOR
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// 1. CORRECCIÓN DE TIPO: params ahora es una Promise
interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 0; 

export default async function ProjectDetail({ params }: ProjectPageProps) {
  // 2. CORRECCIÓN DE LÓGICA: Desempaquetamos la promesa con await
  const { slug } = await params; 

  // A partir de aquí, todo sigue igual...
  const supabase = await createClient();
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Botón flotante */}
      <nav className="p-6 fixed top-0 left-0 z-20">
        <Link 
          href="/" 
          className="bg-white/90 backdrop-blur px-4 py-2 rounded-full border shadow-sm text-sm hover:bg-gray-100 transition-colors"
        >
          ← Volver al inicio
        </Link>
      </nav>

      {/* Hero Image */}
      <div className="relative w-full h-[60vh] md:h-[70vh]">
        <Image
          src={project.cover_image_url}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 p-8 md:p-16 text-white max-w-4xl">
            <span className="uppercase tracking-widest text-sm font-medium bg-blue-600 px-2 py-1 mb-4 inline-block">
                {project.category || 'Arquitectura'}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.title}</h1>
            {project.location && (
                <p className="text-xl opacity-90">📍 {project.location}</p>
            )}
        </div>
      </div>

      {/* Descripción */}
      <section className="max-w-3xl mx-auto py-16 px-6">
        <div className="prose prose-lg prose-slate">
            <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
                {project.description || 'Sin descripción disponible.'}
            </p>
        </div>
      </section>
    </main>
  );
}