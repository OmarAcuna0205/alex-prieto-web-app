import { supabase } from '@/lib/supabase';
import ProjectCard from '@/components/ProjectCard';

// Tipado estricto de la respuesta de la BD
interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  cover_image_url: string;
}

export const revalidate = 0; // Esto fuerza a que la página NO se guarde en caché estático (para desarrollo)

export default async function Home() {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header Minimalista */}
      <header className="border-b py-6 px-6 md:px-12 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <h1 className="text-xl font-bold tracking-tighter uppercase">
          ARQ. AMIGO
        </h1>
        <nav className="space-x-6 text-sm font-medium">
          <a href="#" className="hover:text-gray-600">Proyectos</a>
          <a href="#" className="hover:text-gray-600">Sobre mí</a>
          <a href="#" className="hover:text-gray-600">Contacto</a>
        </nav>
      </header>

      {/* Grid de Proyectos */}
      <section className="p-6 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(projects ?? []).map((project: Project) => (
            <ProjectCard
              key={project.id}
              slug={project.slug}
              title={project.title}
              category={project.category || 'Residencial'} // Fallback por si es null
              imageUrl={project.cover_image_url || 'https://images.unsplash.com/photo-1487958449943-2429e8be8625'} // Fallback
            />
          ))}
        </div>
      </section>
    </main>
  );
}