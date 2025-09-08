import React, { useState } from 'react';
import { Settings, Plus, Search, Filter, Clock, CheckCircle, AlertCircle, Play, Pause, MoreVertical } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

const Produccion = () => {
  const [productions, setProductions] = useState([
    {
      id: 'PRD001',
      nombre: 'Marco 30x40 - Familia López',
      producto: 'Marco 30x40',
      cliente: 'María López García',
      pedidoId: '002',
      estado: 'En Trámite',
      prioridad: 'Media',
      fechaInicio: '2025-06-07',
      fechaEstimada: '2025-06-10',
      progreso: 65,
      operario: 'Juan Pérez',
      stock: '3 U',
      materiales: [
        { nombre: 'Moldura Clásica Negra', cantidad: 3, medida: '2.5x2.5' },
        { nombre: 'Vidrio Antireflejo', cantidad: 3, medida: '30x40' }
      ],
      observaciones: 'Cliente requiere acabado especial'
    },
    {
      id: 'PRD002',
      nombre: 'Impresión Digital - I.E. San Martín',
      producto: 'Fotografías Escolares',
      cliente: 'I.E. San Martín de Porres',
      pedidoId: '003',
      estado: 'Pendiente',
      prioridad: 'Alta',
      fechaInicio: '2025-06-09',
      fechaEstimada: '2025-06-15',
      progreso: 0,
      operario: 'Carlos Mendoza',
      stock: '150 U',
      materiales: [
        { nombre: 'Papel Fotográfico Mate', cantidad: 150, medida: '10x15' }
      ],
      observaciones: 'Sesión fotográfica programada para el 9 de junio'
    },
    {
      id: 'PRD003',
      nombre: 'Marco 20x30 - Sesión Familiar',
      producto: 'Marco 20x30',
      cliente: 'Familia Rodríguez',
      pedidoId: '004',
      estado: 'En Almacén',
      prioridad: 'Baja',
      fechaInicio: '2025-06-06',
      fechaEstimada: '2025-06-12',
      progreso: 100,
      operario: 'Ana Torres',
      stock: '1 U',
      materiales: [
        { nombre: 'Moldura Moderna Plateada', cantidad: 1, medida: '3.0x2.0' },
        { nombre: 'Vidrio Antireflejo', cantidad: 1, medida: '20x30' }
      ],
      observaciones: 'Listo para entrega'
    },
    {
      id: 'PRD004',
      nombre: 'Enmarcado Especial - Empresa',
      producto: 'Marco Corporativo',
      cliente: 'Empresa TechSolutions SAC',
      pedidoId: '005',
      estado: 'En Proceso',
      prioridad: 'Alta',
      fechaInicio: '2025-06-05',
      fechaEstimada: '2025-06-11',
      progreso: 40,
      operario: 'Luis García',
      stock: '5 U',
      materiales: [
        { nombre: 'Moldura Moderna Plateada', cantidad: 5, medida: '3.0x2.0' },
        { nombre: 'Cartón Passe-partout', cantidad: 5, medida: '50x70' }
      ],
      observaciones: 'Requiere logo corporativo grabado'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [priorityFilter, setPriorityFilter] = useState('todos');
  const [showProductionModal, setShowProductionModal] = useState(false);
  const [selectedProduction, setSelectedProduction] = useState(null);

  const statusConfig = {
    'Pendiente': { 
      color: 'bg-red-100 text-red-800', 
      icon: AlertCircle, 
      iconColor: 'text-red-600' 
    },
    'En Trámite': { 
      color: 'bg-yellow-100 text-yellow-800', 
      icon: Clock, 
      iconColor: 'text-yellow-600' 
    },
    'En Proceso': { 
      color: 'bg-blue-100 text-blue-800', 
      icon: Play, 
      iconColor: 'text-blue-600' 
    },
    'En Almacén': { 
      color: 'bg-green-100 text-green-800', 
      icon: CheckCircle, 
      iconColor: 'text-green-600' 
    }
  };

  const priorityColors = {
    'Alta': 'border-red-500',
    'Media': 'border-yellow-500',
    'Baja': 'border-green-500'
  };

  const handleStatusChange = (productionId, newStatus) => {
    setProductions(productions.map(prod => 
      prod.id === productionId ? { ...prod, estado: newStatus } : prod
    ));
  };

  const filteredProductions = productions.filter(production => {
    const matchesSearch = production.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         production.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         production.operario.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || production.estado === statusFilter;
    const matchesPriority = priorityFilter === 'todos' || production.prioridad === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const ProductionCard = ({ production }) => {
    const statusInfo = statusConfig[production.estado];
    const StatusIcon = statusInfo.icon;

    return (
      <Card className={`hover:shadow-lg transition-all duration-200 border-l-4 ${priorityColors[production.prioridad]}`}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${statusInfo.color.replace('text-', 'bg-').replace('800', '100')}`}>
              <StatusIcon className={`w-5 h-5 ${statusInfo.iconColor}`} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{production.nombre}</h3>
              <p className="text-sm text-gray-500">#{production.id} - {production.cliente}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
              {production.estado}
            </span>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Operario:</span>
            <span className="font-medium">{production.operario}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Fecha Estimada:</span>
            <span className="font-medium">{production.fechaEstimada}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Stock:</span>
            <span className="font-medium">{production.stock}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Prioridad:</span>
            <span className={`font-medium ${
              production.prioridad === 'Alta' ? 'text-red-600' :
              production.prioridad === 'Media' ? 'text-yellow-600' : 'text-green-600'
            }`}>
              {production.prioridad}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-500">Progreso</span>
            <span className="font-medium">{production.progreso}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${production.progreso}%` }}
            />
          </div>
        </div>

        {/* Materials */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Materiales:</h4>
          <div className="space-y-1">
            {production.materiales.slice(0, 2).map((material, index) => (
              <div key={index} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                {material.nombre} - {material.cantidad} U ({material.medida} cm)
              </div>
            ))}
            {production.materiales.length > 2 && (
              <div className="text-xs text-gray-500">
                +{production.materiales.length - 2} materiales más
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedProduction(production);
              setShowProductionModal(true);
            }}
          >
            Ver Detalles
          </Button>
          
          <div className="flex space-x-1">
            {production.estado === 'Pendiente' && (
              <Button
                variant="ghost"
                size="sm"
                icon={<Play className="w-4 h-4" />}
                onClick={() => handleStatusChange(production.id, 'En Proceso')}
                className="text-blue-600 hover:bg-blue-50"
              />
            )}
            {production.estado === 'En Proceso' && (
              <Button
                variant="ghost"
                size="sm"
                icon={<Pause className="w-4 h-4" />}
                onClick={() => handleStatusChange(production.id, 'En Trámite')}
                className="text-yellow-600 hover:bg-yellow-50"
              />
            )}
            {production.estado === 'En Trámite' && (
              <Button
                variant="ghost"
                size="sm"
                icon={<CheckCircle className="w-4 h-4" />}
                onClick={() => handleStatusChange(production.id, 'En Almacén')}
                className="text-green-600 hover:bg-green-50"
              />
            )}
          </div>
        </div>
      </Card>
    );
  };

  const pendingCount = productions.filter(p => p.estado === 'Pendiente').length;
  const inProcessCount = productions.filter(p => p.estado === 'En Proceso').length;
  const completedCount = productions.filter(p => p.estado === 'En Almacén').length;
  const avgProgress = Math.round(productions.reduce((sum, p) => sum + p.progreso, 0) / productions.length);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <Settings className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Producción</h1>
            <p className="text-gray-600">Seguimiento de trabajos en proceso</p>
          </div>
        </div>
        
        <Button 
          icon={<Plus className="w-4 h-4" />}
        >
          Nueva Orden de Trabajo
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-red-600">{pendingCount}</h3>
          <p className="text-sm text-gray-500">Pendientes</p>
        </Card>
        
        <Card className="text-center">
          <Play className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-blue-600">{inProcessCount}</h3>
          <p className="text-sm text-gray-500">En Proceso</p>
        </Card>
        
        <Card className="text-center">
          <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-green-600">{completedCount}</h3>
          <p className="text-sm text-gray-500">Completados</p>
        </Card>
        
        <Card className="text-center">
          <Settings className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-primary">{avgProgress}%</h3>
          <p className="text-sm text-gray-500">Progreso Promedio</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nombre, cliente o operario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            >
              <option value="todos">Todos los estados</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En Trámite">En Trámite</option>
              <option value="En Proceso">En Proceso</option>
              <option value="En Almacén">En Almacén</option>
            </select>
            
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            >
              <option value="todos">Todas las prioridades</option>
              <option value="Alta">Prioridad Alta</option>
              <option value="Media">Prioridad Media</option>
              <option value="Baja">Prioridad Baja</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Productions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {filteredProductions.map((production) => (
          <ProductionCard key={production.id} production={production} />
        ))}
      </div>

      {filteredProductions.length === 0 && (
        <div className="text-center py-12">
          <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron trabajos</h3>
          <p className="text-gray-500 mb-4">Ajusta los filtros o inicia un nuevo trabajo</p>
          <Button 
            icon={<Plus className="w-4 h-4" />}
          >
            Nueva Orden de Trabajo
          </Button>
        </div>
      )}

      {/* Production Detail Modal */}
      <Modal
        isOpen={showProductionModal}
        onClose={() => {
          setShowProductionModal(false);
          setSelectedProduction(null);
        }}
        title={`Orden de Trabajo #${selectedProduction?.id}`}
        size="lg"
      >
        {selectedProduction && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                <Settings className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{selectedProduction.nombre}</h3>
                <p className="text-gray-500">Pedido #{selectedProduction.pedidoId}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                <p className="text-gray-900">{selectedProduction.cliente}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Producto</label>
                <p className="text-gray-900">{selectedProduction.producto}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusConfig[selectedProduction.estado].color}`}>
                  {selectedProduction.estado}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
                <span className={`font-medium ${
                  selectedProduction.prioridad === 'Alta' ? 'text-red-600' :
                  selectedProduction.prioridad === 'Media' ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {selectedProduction.prioridad}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Operario Asignado</label>
                <p className="text-gray-900">{selectedProduction.operario}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <p className="text-gray-900">{selectedProduction.stock}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Inicio</label>
                <p className="text-gray-900">{selectedProduction.fechaInicio}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Estimada</label>
                <p className="text-gray-900">{selectedProduction.fechaEstimada}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Progreso del Trabajo</label>
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-primary h-3 rounded-full transition-all duration-300"
                    style={{ width: `${selectedProduction.progreso}%` }}
                  />
                </div>
                <span className="text-lg font-semibold text-primary">{selectedProduction.progreso}%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Materiales Requeridos</label>
              <div className="space-y-2">
                {selectedProduction.materiales.map((material, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{material.nombre}</p>
                      <p className="text-sm text-gray-500">Medida: {material.medida} cm</p>
                    </div>
                    <span className="font-semibold text-primary">{material.cantidad} U</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedProduction.observaciones && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Observaciones</label>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-gray-700">{selectedProduction.observaciones}</p>
                </div>
              </div>
            )}

            <Modal.Footer>
              <Button 
                variant="outline" 
                onClick={() => setShowProductionModal(false)}
              >
                Cerrar
              </Button>
              <Button variant="secondary">
                Editar
              </Button>
              <Button>
                Actualizar Estado
              </Button>
            </Modal.Footer>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Produccion;