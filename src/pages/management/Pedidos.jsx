import React, { useState } from 'react';
import { ShoppingCart, Plus, Search, Filter, Eye, Edit, Trash2, Calendar, DollarSign, Package } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import OrderForm from '../../components/forms/OrderForm';

const Pedidos = () => {
  const [orders, setOrders] = useState([
    {
      id: '001',
      cliente: 'Valentino Olivas',
      servicio: 'Impresión Digital',
      cantidad: 50,
      fechaPedido: '2025-06-08',
      fechaEntrega: '2025-06-15',
      precio: 125.00,
      adelanto: 60.00,
      estado: 'En Proceso',
      especificaciones: 'Fotos 10x15 cm, papel fotográfico mate',
      observaciones: 'Cliente prefiere entrega en horario de tarde'
    },
    {
      id: '002',
      cliente: 'María López García',
      servicio: 'Enmarcado',
      cantidad: 3,
      fechaPedido: '2025-06-07',
      fechaEntrega: '2025-06-10',
      precio: 180.00,
      adelanto: 180.00,
      estado: 'Listo para Entrega',
      especificaciones: 'Marcos 20x30 y 30x40, moldura clásica negra',
      observaciones: 'Pagado completo'
    },
    {
      id: '003',
      cliente: 'I.E. San Martín',
      servicio: 'Fotografía Escolar',
      cantidad: 150,
      fechaPedido: '2025-06-05',
      fechaEntrega: '2025-06-20',
      precio: 2250.00,
      adelanto: 1125.00,
      estado: 'Pendiente',
      especificaciones: 'Fotografía individual y grupal, entrega en CD',
      observaciones: 'Programar sesión fotográfica'
    },
    {
      id: '004',
      cliente: 'Familia Rodríguez',
      servicio: 'Sesión Familiar',
      cantidad: 1,
      fechaPedido: '2025-06-06',
      fechaEntrega: '2025-06-12',
      precio: 300.00,
      adelanto: 150.00,
      estado: 'En Proceso',
      especificaciones: 'Sesión exterior, 2 horas, 20 fotos editadas',
      observaciones: 'Confirmar ubicación con cliente'
    }
  ]);

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');

  const statusColors = {
    'Pendiente': 'bg-red-100 text-red-800',
    'En Proceso': 'bg-yellow-100 text-yellow-800',
    'Listo para Entrega': 'bg-green-100 text-green-800',
    'Entregado': 'bg-blue-100 text-blue-800',
    'Cancelado': 'bg-gray-100 text-gray-800'
  };

  const handleCreateOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: String(orders.length + 1).padStart(3, '0')
    };
    setOrders([...orders, newOrder]);
    setShowOrderForm(false);
  };

  const handleEditOrder = (orderData) => {
    setOrders(orders.map(order => 
      order.id === selectedOrder.id ? { ...order, ...orderData } : order
    ));
    setSelectedOrder(null);
    setShowOrderForm(false);
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('¿Estás seguro de eliminar este pedido?')) {
      setOrders(orders.filter(order => order.id !== orderId));
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.servicio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || order.estado === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const calcularSaldo = (precio, adelanto) => {
    return precio - adelanto;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <ShoppingCart className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pedidos</h1>
            <p className="text-gray-600">Gestiona las órdenes de trabajo</p>
          </div>
        </div>
        
        <Button 
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setShowOrderForm(true)}
        >
          Nuevo Pedido
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por cliente o servicio..."
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
              <option value="En Proceso">En Proceso</option>
              <option value="Listo para Entrega">Listo para Entrega</option>
              <option value="Entregado">Entregado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="hover:shadow-lg transition-all duration-200">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">#{order.id}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{order.cliente}</h3>
                  <p className="text-sm text-gray-500">{order.servicio}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.estado]}`}>
                {order.estado}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4 text-gray-400" />
                  <span>Cantidad:</span>
                </div>
                <span className="font-medium">{order.cantidad}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Entrega:</span>
                </div>
                <span className="font-medium">{order.fechaEntrega}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span>Total:</span>
                </div>
                <span className="font-medium">S/ {order.precio.toFixed(2)}</span>
              </div>
              
              {order.adelanto > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Saldo:</span>
                  <span className="font-medium text-red-600">
                    S/ {calcularSaldo(order.precio, order.adelanto).toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            {order.observaciones && (
              <div className="mb-4 p-2 bg-gray-50 rounded text-xs text-gray-600">
                <span className="font-medium">Obs:</span> {order.observaciones}
              </div>
            )}

            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <Button
                variant="outline"
                size="sm"
                icon={<Eye className="w-4 h-4" />}
                onClick={() => {
                  setSelectedOrder(order);
                  setShowOrderModal(true);
                }}
              >
                Ver
              </Button>
              
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<Edit className="w-4 h-4" />}
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowOrderForm(true);
                  }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<Trash2 className="w-4 h-4" />}
                  onClick={() => handleDeleteOrder(order.id)}
                  className="text-red-600 hover:bg-red-50"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron pedidos</h3>
          <p className="text-gray-500 mb-4">Crea tu primer pedido para comenzar</p>
          <Button 
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setShowOrderForm(true)}
          >
            Nuevo Pedido
          </Button>
        </div>
      )}

      {/* Order Detail Modal */}
      <Modal
        isOpen={showOrderModal}
        onClose={() => {
          setShowOrderModal(false);
          setSelectedOrder(null);
        }}
        title={`Pedido #${selectedOrder?.id}`}
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                <p className="text-gray-900">{selectedOrder.cliente}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Servicio</label>
                <p className="text-gray-900">{selectedOrder.servicio}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                <p className="text-gray-900">{selectedOrder.cantidad}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedOrder.estado]}`}>
                  {selectedOrder.estado}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Pedido</label>
                <p className="text-gray-900">{selectedOrder.fechaPedido}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Entrega</label>
                <p className="text-gray-900">{selectedOrder.fechaEntrega}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio Total</label>
                <p className="text-gray-900 font-semibold">S/ {selectedOrder.precio.toFixed(2)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adelanto</label>
                <p className="text-gray-900">S/ {selectedOrder.adelanto.toFixed(2)}</p>
              </div>
            </div>
            
            {calcularSaldo(selectedOrder.precio, selectedOrder.adelanto) > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-800 mb-1">Saldo Pendiente</h4>
                <p className="text-2xl font-bold text-red-600">
                  S/ {calcularSaldo(selectedOrder.precio, selectedOrder.adelanto).toFixed(2)}
                </p>
              </div>
            )}
            
            {selectedOrder.especificaciones && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Especificaciones Técnicas</label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{selectedOrder.especificaciones}</p>
                </div>
              </div>
            )}
            
            {selectedOrder.observaciones && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Observaciones</label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{selectedOrder.observaciones}</p>
                </div>
              </div>
            )}
            
            <Modal.Footer>
              <Button 
                variant="outline" 
                onClick={() => setShowOrderModal(false)}
              >
                Cerrar
              </Button>
              <Button 
                variant="secondary"
                icon={<Edit className="w-4 h-4" />}
                onClick={() => {
                  setShowOrderModal(false);
                  setShowOrderForm(true);
                }}
              >
                Editar
              </Button>
            </Modal.Footer>
          </div>
        )}
      </Modal>

      {/* Order Form Modal */}
      <Modal
        isOpen={showOrderForm}
        onClose={() => {
          setShowOrderForm(false);
          setSelectedOrder(null);
        }}
        title={selectedOrder ? 'Editar Pedido' : 'Nuevo Pedido'}
        size="xl"
      >
        <OrderForm
          order={selectedOrder}
          onSubmit={selectedOrder ? handleEditOrder : handleCreateOrder}
          onCancel={() => {
            setShowOrderForm(false);
            setSelectedOrder(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default Pedidos;