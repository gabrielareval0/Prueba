import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, Trash2, UserPlus, AlertCircle } from 'lucide-react';

export default function RegistroUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: '',
    edad: '',
    correo: ''
  });
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [cargando, setCargando] = useState(false);

  const API_URL = 'http://localhost:3000/api/usuarios';

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setCargando(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Error al cargar usuarios');
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      mostrarMensaje('Error al cargar usuarios. Verifica que el servidor esté corriendo.', 'error');
      console.error('Error:', error);
    } finally {
      setCargando(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    if (!formulario.nombre || !formulario.edad || !formulario.correo) {
      mostrarMensaje('Por favor completa todos los campos', 'error');
      return;
    }

    if (formulario.edad < 1 || formulario.edad > 120) {
      mostrarMensaje('Por favor ingresa una edad válida', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formulario.correo)) {
      mostrarMensaje('Por favor ingresa un correo válido', 'error');
      return;
    }

    try {
      setCargando(true);
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formulario)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al registrar usuario');
      }

      mostrarMensaje('¡Usuario registrado exitosamente!', 'exito');
      setFormulario({ nombre: '', edad: '', correo: '' });
      await cargarUsuarios();
    } catch (error) {
      mostrarMensaje(error.message, 'error');
      console.error('Error:', error);
    } finally {
      setCargando(false);
    }
  };

  const eliminarUsuario = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;

    try {
      setCargando(true);
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Error al eliminar usuario');

      mostrarMensaje('Usuario eliminado exitosamente', 'exito');
      await cargarUsuarios();
    } catch (error) {
      mostrarMensaje('Error al eliminar usuario', 'error');
      console.error('Error:', error);
    } finally {
      setCargando(false);
    }
  };

  const mostrarMensaje = (texto, tipo) => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje({ texto: '', tipo: '' }), 4000);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-12 px-4">
      <div className="w-full px-8 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-3">
            Sistema de Registro
          </h1>
        </div>

        {mensaje.texto && (
          <div className={`w-full max-w-2xl mx-auto mb-6 p-4 rounded-lg text-center font-medium ${
            mensaje.tipo === 'exito' 
              ? 'bg-green-100 text-green-800 border border-green-300' 
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}>
            <div className="flex items-center justify-center gap-2">
              {mensaje.tipo === 'error' && <AlertCircle size={20} />}
              <span>{mensaje.texto}</span>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-100 p-3 rounded-full">
                <UserPlus className="text-purple-600" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Nuevo Registro</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={formulario.nombre}
                    onChange={(e) => setFormulario({...formulario, nombre: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    placeholder="Ej: Juan Pérez"
                    disabled={cargando}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Edad
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <input
                    type="number"
                    value={formulario.edad}
                    onChange={(e) => setFormulario({...formulario, edad: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    placeholder="Ej: 25"
                    min="1"
                    max="120"
                    disabled={cargando}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={formulario.correo}
                    onChange={(e) => setFormulario({...formulario, correo: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    placeholder="ejemplo@correo.com"
                    disabled={cargando}
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={cargando}
  className="w-full py-3.5 rounded-lg font-semibold transition transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"              >
                {cargando ? 'Procesando...' : 'Registrar Usuario'}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Usuarios Registrados ({usuarios.length})
            </h2>

            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {cargando && usuarios.length === 0 ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                  <p className="text-gray-500">Cargando usuarios...</p>
                </div>
              ) : usuarios.length === 0 ? (
                <div className="text-center py-12">
                  <User className="mx-auto text-gray-300 mb-4" size={64} />
                  <p className="text-gray-500 text-lg">No hay usuarios registrados</p>
                  <p className="text-gray-400 text-sm mt-2">Comienza agregando tu primer usuario</p>
                </div>
              ) : (
                usuarios.map((usuario) => (
                  <div
                    key={usuario.id}
                    className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-800 mb-2">
                          {usuario.nombre}
                        </h3>
                        <div className="space-y-1">
                          <p className="text-gray-600 text-sm flex items-center gap-2">
                            <Calendar size={16} className="text-purple-600" />
                            <span className="font-medium">{usuario.edad} años</span>
                          </p>
                          <p className="text-gray-600 text-sm flex items-center gap-2">
                            <Mail size={16} className="text-purple-600" />
                            <span>{usuario.correo}</span>
                          </p>
                        </div>
                        {usuario.fecha_registro && (
                          <p className="text-xs text-gray-400 mt-2">
                            Registrado: {new Date(usuario.fecha_registro).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => eliminarUsuario(usuario.id)}
                        disabled={cargando}
                        className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Eliminar usuario"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}