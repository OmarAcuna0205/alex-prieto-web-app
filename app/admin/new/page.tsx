import { createProject } from './actions';
import Link from 'next/link';

export default function NewProjectPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-6">Nuevo Proyecto</h1>
        
        {/* action={createProject} conecta directo con el servidor */}
        <form action={createProject} className="space-y-4">
          
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input 
              name="title" 
              type="text" 
              required 
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <select 
              name="category" 
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="Residencial">Residencial</option>
              <option value="Comercial">Comercial</option>
              <option value="Interiorismo">Interiorismo</option>
              <option value="Urbano">Urbano</option>
            </select>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea 
              name="description" 
              rows={4} 
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Ubicación */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Ubicación (Opcional)</label>
            <input 
              name="location" 
              type="text" 
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* FOTO (El input clave) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Foto de Portada</label>
            <input 
              name="image" 
              type="file" 
              accept="image/*"
              required 
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
            />
          </div>

          <div className="pt-4 flex gap-4">
            <Link href="/admin" className="w-1/2 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Cancelar
            </Link>
            <button type="submit" className="w-1/2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800">
              Guardar Proyecto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}