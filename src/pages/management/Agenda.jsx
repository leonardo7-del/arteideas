import React, { useState } from 'react';
import { Calendar, Clock, Plus, Users, MapPin, Filter } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

const Agenda = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filter, setFilter] = useState('todos');

  const events = [
    {
      id: 1,
      title: 'Sesión Fotográfica Escolar',
      client: 'I.E. San Martín de Porres',
      date: '2025-06-09',
      time: '09:00',
      duration: '3 horas',
      location: 'Colegio San Martín',
      type: 'sesion',
      status: 'confirmado',
      participants: 150,
      notes: 'Fotografía individual y grupal para promoción 2025'
    },
    {
      id: 2,
      title: 'Entrega de Marcos',
      client: 'María López García',
      date: '2025-06-09',
      time: '14:30',
      duration: '30 min',
      location: 'Estudio - Arte Ideas',
      type: 'entrega',
      status: 'pendiente',
      participants: 1,
      notes: 'Marcos 20x30 y 30x40 listos para entrega'
    },
    {
      id: 3,
      title: 'Reunión Contrato Anual',
      client: 'Colegio Particular Santa Rosa',
      date: '2025-06-10',
      time: '16:00',
      duration: '1 hora',
      location: 'Oficina del Director',
      type: 'reunion',
      status: 'confirmado',
      participants: 3,
      notes: 'Negociación contrato promoción 2026'
    },
    {
      id: 4,
      title: 'Sesión Familiar',
      client: 'Familia Rodríguez',
      date: '2025-06-10',
      time: '18:00',
      duration: '2 horas',
      location: 'Parque Central',
      type: 'sesion',
      status: 'confirmado',
      participants: 5,
      notes: 'Sesión exterior para álbum familiar'
    }
  ];

  const eventTypes = {
    sesion: { color: 'bg-blue-500', label: 'Sesión' },
    entrega: { color: 'bg-green-500', label: 'Entrega' },
    reunion: { color: 'bg-orange-500', label: 'Reunión' }
  };

  const statusColors = {
    confirmado: 'bg-green-100 text-green-800',
    pendiente: 'bg-yellow-100 text-yellow-800',
    cancelado: 'bg-red-100 text-red-800'
  };

  const filteredEvents = events.filter(event => {
    if (filter === 'todos') return true;
    return event.type === filter;
  });

  const EventCard = ({ event }) => (
    <Card 
      className="hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4"
      style={{ borderLeftColor: eventTypes[event.type]?.color.replace('bg-', '#') || '#1DD1E3' }}
      onClick={() => {
        setSelectedEvent(event);
        setShowEventModal(true);
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${eventTypes[event.type]?.color}`} />
          <h3 className="font-semibold text-gray-900">{event.title}</h3>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[event.status]}`}>
          {event.status}
        </span>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4" />
          <span>{event.client}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>{event.time} - {event.duration}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4" />
          <span>{event.location}</span>
        </div>
      </div>
      
      {event.notes && (
        <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-500">
          {event.notes}
        </div>
      )}
    </Card>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <Calendar className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Agenda</h1>
            <p className="text-gray-600">Gestiona tus citas y eventos</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button variant="outline" icon={<Filter className="w-4 h-4" />}>
            Filtros
          </Button>
          <Button 
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setShowEventModal(true)}
          >
            Nueva Cita
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          { key: 'todos', label: 'Todos los eventos' },
          { key: 'sesion', label: 'Sesiones' },
          { key: 'entrega', label: 'Entregas' },
          { key: 'reunion', label: 'Reuniones' }
        ].map((filterOption) => (
          <button
            key={filterOption.key}
            onClick={() => setFilter(filterOption.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === filterOption.key
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {filterOption.label}
          </button>
        ))}
      </div>

      {/* Date Selector */}
      <Card className="mb-6">
        <div className="flex items-center space-x-4">
          <Calendar className="w-5 h-5 text-gray-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          />
          <div className="text-sm text-gray-500">
            {filteredEvents.length} evento{filteredEvents.length !== 1 ? 's' : ''} encontrado{filteredEvents.length !== 1 ? 's' : ''}
          </div>
        </div>
      </Card>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay eventos programados</h3>
          <p className="text-gray-500 mb-4">Crea tu primera cita para comenzar</p>
          <Button 
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setShowEventModal(true)}
          >
            Nueva Cita
          </Button>
        </div>
      )}

      {/* Event Detail Modal */}
      <Modal
        isOpen={showEventModal}
        onClose={() => {
          setShowEventModal(false);
          setSelectedEvent(null);
        }}
        title={selectedEvent ? 'Detalles del Evento' : 'Nueva Cita'}
        size="lg"
      >
        {selectedEvent ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full ${eventTypes[selectedEvent.type]?.color}`} />
              <h3 className="text-xl font-semibold">{selectedEvent.title}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedEvent.status]}`}>
                {selectedEvent.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label className="font-medium text-gray-700">Cliente:</label>
                <p className="text-gray-600">{selectedEvent.client}</p>
              </div>
              <div>
                <label className="font-medium text-gray-700">Fecha:</label>
                <p className="text-gray-600">{selectedEvent.date}</p>
              </div>
              <div>
                <label className="font-medium text-gray-700">Hora:</label>
                <p className="text-gray-600">{selectedEvent.time}</p>
              </div>
              <div>
                <label className="font-medium text-gray-700">Duración:</label>
                <p className="text-gray-600">{selectedEvent.duration}</p>
              </div>
              <div className="col-span-2">
                <label className="font-medium text-gray-700">Ubicación:</label>
                <p className="text-gray-600">{selectedEvent.location}</p>
              </div>
              <div>
                <label className="font-medium text-gray-700">Participantes:</label>
                <p className="text-gray-600">{selectedEvent.participants} persona{selectedEvent.participants !== 1 ? 's' : ''}</p>
              </div>
            </div>
            
            {selectedEvent.notes && (
              <div>
                <label className="font-medium text-gray-700">Notas:</label>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-lg mt-1">{selectedEvent.notes}</p>
              </div>
            )}
            
            <Modal.Footer>
              <Button variant="outline" onClick={() => setShowEventModal(false)}>
                Cerrar
              </Button>
              <Button variant="secondary">
                Editar
              </Button>
              <Button>
                Confirmar
              </Button>
            </Modal.Footer>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Formulario para crear nueva cita próximamente...</p>
            <Modal.Footer>
              <Button variant="outline" onClick={() => setShowEventModal(false)}>
                Cancelar
              </Button>
            </Modal.Footer>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Agenda;