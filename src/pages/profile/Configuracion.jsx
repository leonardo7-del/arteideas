import React, { useState } from 'react';
import { Settings, Bell, Shield, Palette, Database, Download, Upload, Globe, Moon, Sun } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const Configuracion = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      pedidos: true,
      clientes: true,
      inventario: true
    },
    appearance: {
      theme: 'light',
      language: 'es',
      timezone: 'America/Lima',
      dateFormat: 'DD/MM/YYYY'
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
      passwordExpiry: false
    },
    business: {
      companyName: 'Arte Ideas Diseño Gráfico',
      address: 'Av. Lima 123, San Juan de Lurigancho',
      phone: '987654321',
      email: 'info@arteideas.com',
      tax: '20123456789',
      currency: 'PEN'
    }
  });

  const handleSettingChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    // Simular guardado
    alert('Configuración guardada correctamente');
  };

  const SettingSwitch = ({ checked, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <p className="font-medium text-gray-900">{label}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          checked ? 'bg-primary' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <Settings className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
            <p className="text-gray-600">Personaliza tu experiencia en la plataforma</p>
          </div>
        </div>
        
        <Button onClick={handleSave}>
          Guardar Cambios
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Notifications */}
        <Card>
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-gray-900">Notificaciones</h2>
          </div>
          
          <div className="space-y-1">
            <SettingSwitch
              checked={settings.notifications.email}
              onChange={(value) => handleSettingChange('notifications', 'email', value)}
              label="Notificaciones por Email"
              description="Recibe notificaciones importantes en tu email"
            />
            <SettingSwitch
              checked={settings.notifications.push}
              onChange={(value) => handleSettingChange('notifications', 'push', value)}
              label="Notificaciones Push"
              description="Notificaciones instantáneas en el navegador"
            />
            <SettingSwitch
              checked={settings.notifications.sms}
              onChange={(value) => handleSettingChange('notifications', 'sms', value)}
              label="Notificaciones SMS"
              description="Recibe alertas críticas por mensaje de texto"
            />
            
            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">Tipos de Notificaciones</h3>
              <SettingSwitch
                checked={settings.notifications.pedidos}
                onChange={(value) => handleSettingChange('notifications', 'pedidos', value)}
                label="Nuevos Pedidos"
              />
              <SettingSwitch
                checked={settings.notifications.clientes}
                onChange={(value) => handleSettingChange('notifications', 'clientes', value)}
                label="Actividad de Clientes"
              />
              <SettingSwitch
                checked={settings.notifications.inventario}
                onChange={(value) => handleSettingChange('notifications', 'inventario', value)}
                label="Alertas de Inventario"
              />
            </div>
          </div>
        </Card>

        {/* Appearance */}
        <Card>
          <div className="flex items-center space-x-3 mb-6">
            <Palette className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-gray-900">Apariencia</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Tema</label>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleSettingChange('appearance', 'theme', 'light')}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                    settings.appearance.theme === 'light' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Sun className="w-5 h-5" />
                  <span>Claro</span>
                </button>
                <button
                  onClick={() => handleSettingChange('appearance', 'theme', 'dark')}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                    settings.appearance.theme === 'dark' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Moon className="w-5 h-5" />
                  <span>Oscuro</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Idioma</label>
              <select
                value={settings.appearance.language}
                onChange={(e) => handleSettingChange('appearance', 'language', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Zona Horaria</label>
              <select
                value={settings.appearance.timezone}
                onChange={(e) => handleSettingChange('appearance', 'timezone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              >
                <option value="America/Lima">Lima, Perú (UTC-5)</option>
                <option value="America/New_York">New York (UTC-4)</option>
                <option value="Europe/Madrid">Madrid (UTC+1)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Formato de Fecha</label>
              <select
                value={settings.appearance.dateFormat}
                onChange={(e) => handleSettingChange('appearance', 'dateFormat', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card>
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-gray-900">Seguridad</h2>
          </div>
          
          <div className="space-y-4">
            <SettingSwitch
              checked={settings.security.twoFactor}
              onChange={(value) => handleSettingChange('security', 'twoFactor', value)}
              label="Autenticación de Dos Factores"
              description="Añade una capa extra de seguridad a tu cuenta"
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiempo de Sesión (minutos)
              </label>
              <input
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                min="5"
                max="480"
              />
              <p className="text-sm text-gray-500 mt-1">
                Tiempo antes de cerrar sesión automáticamente por inactividad
              </p>
            </div>

            <SettingSwitch
              checked={settings.security.passwordExpiry}
              onChange={(value) => handleSettingChange('security', 'passwordExpiry', value)}
              label="Expiración de Contraseña"
              description="Requerir cambio de contraseña cada 90 días"
            />
          </div>
        </Card>

        {/* Business Settings */}
        <Card>
          <div className="flex items-center space-x-3 mb-6">
            <Globe className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-gray-900">Configuración del Negocio</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Empresa</label>
              <input
                type="text"
                value={settings.business.companyName}
                onChange={(e) => handleSettingChange('business', 'companyName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
              <input
                type="text"
                value={settings.business.address}
                onChange={(e) => handleSettingChange('business', 'address', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                <input
                  type="tel"
                  value={settings.business.phone}
                  onChange={(e) => handleSettingChange('business', 'phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={settings.business.email}
                  onChange={(e) => handleSettingChange('business', 'email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">RUC</label>
                <input
                  type="text"
                  value={settings.business.tax}
                  onChange={(e) => handleSettingChange('business', 'tax', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Moneda</label>
                <select
                  value={settings.business.currency}
                  onChange={(e) => handleSettingChange('business', 'currency', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                >
                  <option value="PEN">Soles (S/)</option>
                  <option value="USD">Dólares ($)</option>
                  <option value="EUR">Euros (€)</option>
                </select>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Data Management */}
      <Card className="mt-8">
        <div className="flex items-center space-x-3 mb-6">
          <Database className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold text-gray-900">Gestión de Datos</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center p-6 border border-gray-200 rounded-lg">
            <Download className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Exportar Datos</h3>
            <p className="text-sm text-gray-600 mb-4">
              Descarga una copia de todos tus datos en formato JSON
            </p>
            <Button variant="outline" size="sm">
              Exportar Datos
            </Button>
          </div>
          
          <div className="text-center p-6 border border-gray-200 rounded-lg">
            <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Importar Datos</h3>
            <p className="text-sm text-gray-600 mb-4">
              Sube un archivo de respaldo para restaurar tus datos
            </p>
            <Button variant="outline" size="sm">
              Importar Datos
            </Button>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="font-semibold text-red-800 mb-2">Zona de Peligro</h3>
          <p className="text-sm text-red-600 mb-4">
            Estas acciones son irreversibles. Procede con precaución.
          </p>
          <div className="flex space-x-4">
            <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
              Resetear Configuración
            </Button>
            <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
              Eliminar Cuenta
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Configuracion;