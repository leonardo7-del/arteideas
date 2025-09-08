import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Edit, Save, X, Key, Shield } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

const MiPerfil = () => {
  const [userProfile, setUserProfile] = useState({
    nombre: 'Elberc149',
    email: 'elberc149@arteideas.com',
    telefono: '987654321',
    direccion: 'Av. Lima 123, San Juan de Lurigancho',
    rol: 'Administrador',
    fechaRegistro: '2024-01-15',
    ultimaConexion: '2025-06-09 14:30',
    biografia: 'Fotógrafo profesional especializado en fotografía escolar y eventos. Con más de 10 años de experiencia en el sector.',
    avatar: null
  });

  const [editMode, setEditMode] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...userProfile });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleEditToggle = () => {
    if (editMode) {
      setTempProfile({ ...userProfile });
    }
    setEditMode(!editMode);
    setErrors({});
  };

  const handleInputChange = (field, value) => {
    setTempProfile(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateProfile = () => {
    const newErrors = {};
    
    if (!tempProfile.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    
    if (!tempProfile.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(tempProfile.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!tempProfile.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateProfile()) {
      setUserProfile({ ...tempProfile });
      setEditMode(false);
    }
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validatePassword = () => {
    const newErrors = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Contraseña actual requerida';
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'Nueva contraseña requerida';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Mínimo 6 caracteres';
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = () => {
    if (validatePassword()) {
      // Aquí iría la lógica para cambiar la contraseña
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordModal(false);
      setErrors({});
      alert('Contraseña actualizada correctamente');
    }
  };

  const activityStats = [
    { label: 'Pedidos Procesados', value: '234', period: 'Este mes' },
    { label: 'Clientes Atendidos', value: '89', period: 'Este mes' },
    { label: 'Sesiones Realizadas', value: '45', period: 'Este mes' },
    { label: 'Horas Trabajadas', value: '180', period: 'Este mes' }
  ];

  const recentActivity = [
    { action: 'Creó pedido #234', time: 'Hace 2 horas', icon: 'pedido' },
    { action: 'Actualizó cliente María López', time: 'Hace 4 horas', icon: 'cliente' },
    { action: 'Completó sesión I.E. San Martín', time: 'Ayer', icon: 'sesion' },
    { action: 'Generó reporte mensual', time: '2 días', icon: 'reporte' }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <User className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
            <p className="text-gray-600">Gestiona tu información personal</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button 
            variant="outline"
            icon={<Key className="w-4 h-4" />}
            onClick={() => setShowPasswordModal(true)}
          >
            Cambiar Contraseña
          </Button>
          {!editMode ? (
            <Button 
              icon={<Edit className="w-4 h-4" />}
              onClick={handleEditToggle}
            >
              Editar Perfil
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button 
                variant="outline"
                icon={<X className="w-4 h-4" />}
                onClick={handleEditToggle}
              >
                Cancelar
              </Button>
              <Button 
                icon={<Save className="w-4 h-4" />}
                onClick={handleSave}
              >
                Guardar
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center space-x-6 mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                  {userProfile.avatar ? (
                    <img 
                      src={userProfile.avatar} 
                      alt="Avatar" 
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-primary" />
                  )}
                </div>
                {editMode && (
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{userProfile.nombre}</h2>
                <p className="text-gray-600">{userProfile.rol}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">Cuenta Verificada</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo
                </label>
                {editMode ? (
                  <div>
                    <input
                      type="text"
                      value={tempProfile.nombre}
                      onChange={(e) => handleInputChange('nombre', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                        errors.nombre ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {errors.nombre && (
                      <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-900 py-3">{userProfile.nombre}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                {editMode ? (
                  <div>
                    <input
                      type="email"
                      value={tempProfile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 py-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{userProfile.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                {editMode ? (
                  <div>
                    <input
                      type="tel"
                      value={tempProfile.telefono}
                      onChange={(e) => handleInputChange('telefono', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                        errors.telefono ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {errors.telefono && (
                      <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 py-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{userProfile.telefono}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rol
                </label>
                <div className="flex items-center space-x-2 py-3">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{userProfile.rol}</span>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección
                </label>
                {editMode ? (
                  <input
                    type="text"
                    value={tempProfile.direccion}
                    onChange={(e) => handleInputChange('direccion', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                ) : (
                  <div className="flex items-center space-x-2 py-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{userProfile.direccion}</span>
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Biografía
                </label>
                {editMode ? (
                  <textarea
                    value={tempProfile.biografia}
                    onChange={(e) => handleInputChange('biografia', e.target.value)}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                    placeholder="Cuéntanos sobre ti y tu experiencia profesional..."
                  />
                ) : (
                  <p className="text-gray-900 py-3">{userProfile.biografia}</p>
                )}
              </div>
            </div>

            {!editMode && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de Cuenta</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Fecha de Registro:</span>
                    <p className="font-medium">{userProfile.fechaRegistro}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Última Conexión:</span>
                    <p className="font-medium">{userProfile.ultimaConexion}</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Activity Stats */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas</h3>
            <div className="space-y-4">
              {activityStats.map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-xs text-gray-400">{stat.period}</p>
                  </div>
                  <span className="text-2xl font-bold text-primary">{stat.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Password Change Modal */}
      <Modal
        isOpen={showPasswordModal}
        onClose={() => {
          setShowPasswordModal(false);
          setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
          setErrors({});
        }}
        title="Cambiar Contraseña"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña Actual
            </label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                errors.currentPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Ingresa tu contraseña actual"
            />
            {errors.currentPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nueva Contraseña
            </label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                errors.newPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Ingresa tu nueva contraseña"
            />
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar Nueva Contraseña
            </label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Confirma tu nueva contraseña"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        <Modal.Footer>
          <Button 
            variant="outline" 
            onClick={() => {
              setShowPasswordModal(false);
              setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
              setErrors({});
            }}
          >
            Cancelar
          </Button>
          <Button onClick={handlePasswordSubmit}>
            Actualizar Contraseña
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MiPerfil;