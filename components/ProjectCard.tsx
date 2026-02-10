import Image from 'next/image';
import Link from 'next/link';

// Definimos QUÉ espera recibir este componente.
// Si intentas pasarle algo que no sea esto, TypeScript gritará.
interface ProjectCardProps {
  slug: string;
  title: string;
  category?: string; // El ? significa que es opcional
  imageUrl: string;
}

export default function ProjectCard({ slug, title, category, imageUrl }: ProjectCardProps) {
  return (
    <Link href={`/proyecto/${slug}`} className="group block">
      {/* Contenedor de la imagen con Aspect Ratio */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 rounded-lg">
        {/* El componente Image de Next.js optimiza la carga */}
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Capa oscura al hacer hover (Toque UX profesional) */}
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
      </div>

      {/* Info del proyecto */}
      <div className="mt-3">
        <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        {category && (
          <p className="text-sm text-gray-500">{category}</p>
        )}
      </div>
    </Link>
  );
}