import React, { useState } from 'react';
import { Package, Plus, Search, Filter, AlertTriangle, Edit, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

const Inventario = () => {
  const [inventory, setInventory] = useState([
    {
      id: 'INV001',
      nombre: 'Moldura Clásica Negra',
      categoria: 'Molduras',
      ancho: '2.5',
      alto: '2.5',
      material: 'Madera',
      estado: 'Clásico',
      stock: 8,
      stockMinimo: 10,
      precio: 15.50,
      proveedor: 'Marco Arte SAC',
      fechaIngreso: '2025-05-15',
      ultimaVenta: '2025-06-05'
    },
    {
      id: 'INV002',
      nombre: 'Moldura Moderna Plateada',
      categoria: 'Molduras',
      ancho: '3.0',
      alto: '2.0',
      material: 'Aluminio',
      estado: 'Moderno',
      stock: 15,
      stockMinimo: 12,
      precio: 22.00,
      proveedor: 'Marcos del Perú',
      fechaIngreso: '2025-05-20',
      ultimaVenta: '2025-06-07'
    },
    {
      id: 'INV003',
      nombre: 'Papel Fotográfico Mate 10x15',
      categoria: 'Papel',
      ancho: '10',
      alto: '15',
      material: 'Papel Fotográfico',
      estado: 'Mate',
      stock: 200,
      stockMinimo: 100,
      precio: 0.45,
      proveedor: 'Kodak Perú',
      fechaIngreso: '2025-06-01',
      ultimaVenta: '2025-06-08'
    },
    {
      id: 'INV004',
      nombre: 'Papel Fotográfico Brillante 20x30',
      categoria: 'Papel',
      ancho: '20',
      alto: '30',
      material: 'Papel Fotográfico',
      estado: 'Brillante',
      stock: 50,
      stockMinimo: 80,
      precio: 2.80,
      proveedor: 'Canon Perú',
      fechaIngreso: '2025-05-25',
      ultimaVenta: '2025-06-06'
    },
    {
      id: 'INV005',
      nombre: 'Vidrio Antireflejo 30x40',
      categoria: 'Accesorios',
      ancho: '30',
      alto: '40',
      material: 'Vidrio',
      estado: 'Antireflejo',
      stock: 5,
      stockMinimo: 15,
      precio: 35.00,
      proveedor: 'Cristalería Lima',
      fechaIngreso: '2025-05-10',
      ultimaVenta: '2025-06-03'
    },
    {
      id: 'INV006',
      nombre: 'Cartón Passe-partout Blanco',
      categoria: 'Accesorios',
      ancho: '50',
      alto: '70',
      material: 'Cartón',
      estado: 'Conservación',
      stock: 25,
      stockMinimo: 20,
      precio: 8.50,
      proveedor: 'Papelería Central',
      fechaIngreso: '2025-05-18',
      ultimaVenta: '2025-06-04'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('todos');
  const [stockFilter, setStockFilter] = useState('todos');
  const [showItemModal, setShowItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = ['Molduras', 'Papel', 'Accesorios'];
  
  const getStockStatus = (stock, stockMinimo) => {
    if (stock === 0) return { status: 'agotado', color: 'bg-red-500', textColor: 'text-red-600' };
    if (stock <= stockMinimo) return { status: 'bajo', color: 'bg-yellow-500', textColor: 'text-yellow-600' };
    return { status: 'normal', color: 'bg-green-500', textColor: 'text-green-600' };
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.material.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'todos' || item.categoria === categoryFilter;
    const matchesStock = stockFilter === 'todos' || 
                        (stockFilter === 'bajo' && item.stock <= item.stockMinimo) ||
                        (stockFilter === 'agotado' && item.stock === 0) ||
                        (stockFilter === 'normal' && item.stock > item.stockMinimo);
    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleDeleteItem = (itemId) => {
    if (window.confirm('¿Estás seguro de eliminar este artículo del inventario?')) {
      setInventory(inventory.filter(item => item.id !== itemId));
    }
  };

  const lowStockItems = inventory.filter(item => item.stock <= item.stockMinimo);
  const outOfStockItems = inventory.filter(item => item.stock === 0);
  const totalValue = inventory.reduce((sum, item) => sum + (item.stock * item.precio), 0);

  const InventoryCard = ({ item }) => {
    const stockStatus = getStockStatus(item.stock, item.stockMinimo);
    
    return (
      <Card className="hover:shadow-lg transition-all duration-200">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{item.nombre}</h3>
              <p className="text-sm text-gray-500">{item.categoria}</p>
            </div>
          </div>
          <div className={`w-3 h-3 rounded-full ${stockStatus.color}`} title={`Stock: ${stockStatus.status}`} />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div>
            <span className="text-gray-500">Dimensiones:</span>
            <p className="font-medium">{item.ancho} x {item.alto} cm</p>
          </div>
          <div>
            <span className="text-gray-500">Material:</span>
            <p className="font-medium">{item.material}</p>
          </div>
          <div>
            <span className="text-gray-500">Stock Actual:</span>
            <p className={`font-bold ${stockStatus.textColor}`}>{item.stock} unidades</p>
          </div>
          <div>
            <span className="text-gray-500">Precio Unitario:</span>
            <p className="font-medium">S/ {item.precio.toFixed(2)}</p>
          </div>
        </div>

        {item.stock <= item.stockMinimo && (
          <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            <span className="text-xs text-yellow-800">
              Stock bajo - Mínimo: {item.stockMinimo}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            Valor: S/ {(item.stock * item.precio).toFixed(2)}
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              icon={<Edit className="w-4 h-4" />}
              onClick={() => {
                setSelectedItem(item);
                setShowItemModal(true);
              }}
            />
            <Button
              variant="ghost"
              size="sm"
              icon={<Trash2 className="w-4 h-4" />}
              onClick={() => handleDeleteItem(item.id)}
              className="text-red-600 hover:bg-red-50"
            />
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <Package className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inventario</h1>
            <p className="text-gray-600">Gestiona tus molduras y materiales</p>
          </div>
        </div>
        
        <Button 
          icon={<Plus className="w-4 h-4" />}
          onClick={() => {
            setSelectedItem(null);
            setShowItemModal(true);
          }}
        >
          Agregar Artículo
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="text-center">
          <Package className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900">{inventory.length}</h3>
          <p className="text-sm text-gray-500">Total Artículos</p>
        </Card>
        
        <Card className="text-center">
          <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-yellow-600">{lowStockItems.length}</h3>
          <p className="text-sm text-gray-500">Stock Bajo</p>
        </Card>
        
        <Card className="text-center">
          <TrendingDown className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-red-600">{outOfStockItems.length}</h3>
          <p className="text-sm text-gray-500">Agotados</p>
        </Card>
        
        <Card className="text-center">
          <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-green-600">S/ {totalValue.toFixed(2)}</h3>
          <p className="text-sm text-gray-500">Valor Total</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nombre, categoría o material..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            >
              <option value="todos">Todas las categorías</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            >
              <option value="todos">Todo el stock</option>
              <option value="normal">Stock normal</option>
              <option value="bajo">Stock bajo</option>
              <option value="agotado">Agotado</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredInventory.map((item) => (
          <InventoryCard key={item.id} item={item} />
        ))}
      </div>

      {filteredInventory.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron artículos</h3>
          <p className="text-gray-500 mb-4">Ajusta los filtros o agrega nuevos artículos</p>
          <Button 
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setShowItemModal(true)}
          >
            Agregar Artículo
          </Button>
        </div>
      )}

      {/* Item Detail/Form Modal */}
      <Modal
        isOpen={showItemModal}
        onClose={() => {
          setShowItemModal(false);
          setSelectedItem(null);
        }}
        title={selectedItem ? 'Editar Artículo' : 'Nuevo Artículo'}
        size="lg"
      >
        {selectedItem ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <p className="text-gray-900">{selectedItem.nombre}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <p className="text-gray-900">{selectedItem.categoria}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dimensiones</label>
                <p className="text-gray-900">{selectedItem.ancho} x {selectedItem.alto} cm</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                <p className="text-gray-900">{selectedItem.material}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Actual</label>
                <p className="text-gray-900 font-semibold">{selectedItem.stock} unidades</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Mínimo</label>
                <p className="text-gray-900">{selectedItem.stockMinimo} unidades</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio Unitario</label>
                <p className="text-gray-900">S/ {selectedItem.precio.toFixed(2)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valor Total</label>
                <p className="text-gray-900 font-semibold">S/ {(selectedItem.stock * selectedItem.precio).toFixed(2)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Proveedor</label>
                <p className="text-gray-900">{selectedItem.proveedor}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Ingreso</label>
                <p className="text-gray-900">{selectedItem.fechaIngreso}</p>
              </div>
            </div>
            
            <Modal.Footer>
              <Button 
                variant="outline" 
                onClick={() => setShowItemModal(false)}
              >
                Cerrar
              </Button>
              <Button variant="secondary">
                Editar
              </Button>
            </Modal.Footer>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Formulario para agregar nuevo artículo próximamente...</p>
            <Modal.Footer>
              <Button variant="outline" onClick={() => setShowItemModal(false)}>
                Cancelar
              </Button>
            </Modal.Footer>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Inventario;