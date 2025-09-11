"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Package, Clock, CheckCircle, XCircle, MapPin, Calendar, DollarSign } from "lucide-react";

interface Product {
  img: string;
  name: string;
  prices: [number, number, string][];
}

interface Currency {
  value: number;
}

export default function MisPedidos() {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<{
    [key: number]: Product[];
  }>({});
  const [currency, setCurrency] = useState<string>("CUP");
  const [location, setLocation] = useState<string>("CU");
  const [currencies, setCurrencies] = useState<Currency[]>([
    { value: 1 },
    { value: 1 },
  ]);
  
  // Estados para paginación y carga
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState<{ [key: number]: boolean }>({});
  const [isCancelling, setIsCancelling] = useState<{ [key: number]: boolean }>({});
  const [error, setError] = useState<string | null>(null);
  const [orderToCancel, setOrderToCancel] = useState<number | null>(null);

  useEffect(() => {
    fetchPedidos();
    detectCountry();
  }, []);

  const fetchPedidos = async () => {
    setIsLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pedidos_manager`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_manager: userData.userId,
            managerId: userData.userId,
          }),
        },
      );
      const data: any[] = await response.json();
      setOrders(data);

      console.log(data)
      
      // Cargar detalles de los primeros pedidos
      const firstOrders = data.slice(0, ordersPerPage);
      firstOrders.forEach((order) => fetchOrderDetails(order.id));
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrderDetails = async (orderId: number) => {
    setIsLoadingDetails(prev => ({ ...prev, [orderId]: true }));
    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getOrder`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_user_action: userData.userId,
            id_order: orderId,
          }),
        },
      );
      const data: { products: Product[] } = await response.json();
      setSelectedProducts((prev) => ({
        ...prev,
        [orderId]: data.products || [],
      }));
    } catch (error) {
      console.error("Error al obtener detalles del pedido:", error);
    } finally {
      setIsLoadingDetails(prev => ({ ...prev, [orderId]: false }));
    }
  };

  const detectCountry = async () => {
    try {
      const response = await fetch("https://app.fadiar.com/api/get_location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data: { country: string } = await response.json();
      console.log(data);
      if (data.country !== "Cuba" || true) {
        setLocation(data.country);
        setCurrency("USD");
      }
    } catch (error) {
      console.error("Error detecting country:", error);
      // Si falla, mantenemos CU y CUP
    }
  };

  const getEstadoStyle = (state: number) => {
    switch (state) {
      case -1:
        return "bg-red-100 text-red-800 border-red-200";
      case 0:
        return "bg-blue-100 text-blue-800 border-blue-200";
      case 1:
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getEstadoIcon = (state: number) => {
    switch (state) {
      case -1:
        return <XCircle className="w-4 h-4" />;
      case 0:
        return <Clock className="w-4 h-4" />;
      case 1:
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getEstadoText = (state: number) => {
    switch (state) {
      case -1:
        return "Cancelada";
      case 0:
        return "En espera";
      case 1:
        return "Aceptado";
      default:
        return "Desconocido";
    }
  };

  const getPrecioCorrecto = (product: Product) => {
    const precioCUP = product.prices.find((p) => p[2] === "CUP");
    const precioUSD = product.prices.find((p) => p[2] === "USD");

    if (location === "CU" && precioCUP) {
      return `${precioCUP[1]} CUP`;
    }
    if (location !== "CU" && precioUSD) {
      return `${precioUSD[1]} USD`;
    }
    return "Precio no disponible";
  };

  // Cálculos de paginación
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Cargar detalles de los pedidos de la nueva página
    const startIndex = (pageNumber - 1) * ordersPerPage;
    const endIndex = startIndex + ordersPerPage;
    const ordersToLoad = orders.slice(startIndex, endIndex);
    ordersToLoad.forEach((order) => {
      if (!selectedProducts[order.id]) {
        fetchOrderDetails(order.id);
      }
    });
  };

  const handleCancelClick = (orderId: number) => {
    setOrderToCancel(orderId);
  };

  const handleCancelOrder = async () => {
    if (!orderToCancel) return;
    
    const orderId = orderToCancel;
    try {
      setIsCancelling(prev => ({ ...prev, [orderId]: true }));
      setError(null);
      
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/denegar_pedido`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_user_action: userData.userId,
            id_order: orderId,
            id_manager: userData.userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo cancelar el pedido. Intente nuevamente.");
      }

      // Actualizar el estado del pedido a cancelado (-1)
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, state: -1 } : order
        )
      );
      
      // Cerrar el modal
      setOrderToCancel(null);
    } catch (err) {
      console.error("Error al cancelar el pedido:", err);
      setError(err instanceof Error ? err.message : "Error al cancelar el pedido");
    } finally {
      setIsCancelling(prev => ({ ...prev, [orderId]: false }));
    }
  };

  // Render del modal de confirmación de cancelación
  const renderCancelConfirmationModal = () => (
    <AnimatePresence>
      {orderToCancel !== null && (
        <>
          {/* Overlay con difuminado */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setOrderToCancel(null)}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl z-50 w-full max-w-md p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Confirmar cancelación</h3>
              <button 
                onClick={() => setOrderToCancel(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700">
                ¿Está seguro que desea cancelar el pedido #{orderToCancel}? Esta acción no se puede deshacer.
              </p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setOrderToCancel(null)}
                disabled={isCancelling[orderToCancel]}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Volver
              </button>
              <button
                onClick={handleCancelOrder}
                disabled={isCancelling[orderToCancel]}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center"
              >
                {isCancelling[orderToCancel] ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Cancelando...
                  </>
                ) : 'Sí, cancelar pedido'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-12 h-12 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin mx-auto mb-3"></div>
          <div className="text-gray-600 font-medium">Cargando tus pedidos...</div>
        </motion.div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-[#022953] mb-4">No tienes pedidos aún</h1>
          <p className="text-gray-600 mb-6">Aún no has realizado ningún pedido. Explora nuestros productos y encuentra lo que necesitas.</p>
          <button
            onClick={() => window.location.href = '/products'}
            className="w-full bg-[#022953] text-white font-bold py-3 px-6 rounded hover:bg-opacity-90 transition-colors"
          >
            Ver productos
          </button>
        </div>
      </div>
    );
  }

  const ProductLoadingSkeleton = () => (
     <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white border-b border-gray-100 last:border-b-0 animate-pulse">
       <div className="flex-shrink-0">
         <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded"></div>
       </div>
       <div className="flex-1 space-y-2">
         <div className="h-4 bg-gray-200 rounded w-3/4"></div>
         <div className="h-3 bg-gray-200 rounded w-1/2"></div>
       </div>
     </div>
   );

     return (
     <div className="min-h-screen bg-gray-50 py-8">
       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="text-center mb-8"
         >
           <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Pedidos</h1>
           <p className="text-gray-600">Historial de todas tus compras</p>
         </motion.div>

                 {orders.length === 0 ? (
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5 }}
             className="text-center py-16"
           >
             <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
             <h3 className="text-lg font-medium text-gray-600 mb-1">No tienes pedidos aún</h3>
             <p className="text-gray-500 text-sm">Cuando realices tu primera compra, aparecerá aquí</p>
           </motion.div>
                 ) : (
           <>
                           {/* Paginación superior */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-6 px-2"
                >
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Anterior</span>
                  </button>

                  <div className="flex gap-1 flex-wrap justify-center">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="hidden sm:inline">Siguiente</span>
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </motion.div>
              )}

             {/* Información de paginación superior */}
             {orders.length > 0 && (
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 0.3 }}
                 className="text-center mb-6 text-sm text-gray-500"
               >
                 Mostrando {indexOfFirstOrder + 1} a {Math.min(indexOfLastOrder, orders.length)} de {orders.length} pedidos
               </motion.div>
             )}

             <div className="space-y-6">
               <AnimatePresence mode="wait">
                 {currentOrders.map((order, index) => (
                   <motion.div
                     key={order.id}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     transition={{ duration: 0.3, delay: index * 0.05 }}
                     className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors"
                   >
                                         {/* Header del pedido */}
                     <div 
                       className="text-white p-6"
                       style={{
                         background: "linear-gradient(90deg, #011d30, #1a2d52)",
                       }}
                     >
                       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                         <div className="flex items-center gap-3">
                           <div className="p-2 rounded-full bg-white/10">
                             {getEstadoIcon(order.state)}
                           </div>
                           <div>
                             <div className="flex items-center gap-2">
                               <span className="font-semibold text-lg">Pedido #{order.id}</span>
                               <span className={`flex items-center justify-center text-center px-3 py-1 rounded-full text-xs font-medium ${getEstadoStyle(order.state)}`} style={{ display: 'flex', justifyContent: 'center' }}>
                                 {getEstadoText(order.state)}
                               </span>
                               {order.state === 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelClick(order.id);
                        }}
                        disabled={isCancelling[order.id]}
                        className={`px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 border border-red-200 hover:bg-red-200 transition-colors ${isCancelling[order.id] ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {isCancelling[order.id] ? 'Cancelando...' : 'Cancelar pedido'}
                      </button>
                    )}
                             </div>
                             <div className="flex items-center gap-4 text-sm text-gray-300 mt-1">
                               <div className="flex items-center gap-1">
                                 <Calendar className="w-4 h-4" />
                                 {order.date.split(" ")[0]}
                               </div>
                               <div className="flex items-center gap-1">
                                 <Clock className="w-4 h-4" />
                                 {order.date.split(" ")[1]}
                               </div>
                             </div>
                           </div>
                         </div>
                         
                         {order.direccionExacta && (
                           <div className="flex items-center gap-2 text-sm text-gray-300">
                             <MapPin className="w-4 h-4" />
                             <span className="truncate max-w-xs">{order.direccionExacta}</span>
                           </div>
                         )}
                         <span className="md:ml-16">Teléfono del cliente: {order.client_cell}</span>
                         <span>Carnet de identidad del cliente: {`${order.client_ci}`.padStart(11, '0')}</span>
                       </div>
                     </div>

                                         {/* Contenido del pedido */}
                     <div className="p-6">
                       {isLoadingDetails[order.id] ? (
                         <div className="space-y-4">
                           {[1, 2, 3].map((index) => (
                             <ProductLoadingSkeleton key={index} />
                           ))}
                         </div>
                       ) : selectedProducts[order.id] ? (
                         <div className="space-y-4">
                           {selectedProducts[order.id].map((product, productIndex) => (
                                                          <motion.div
                               key={productIndex}
                               initial={{ opacity: 0, x: -10 }}
                               animate={{ opacity: 1, x: 0 }}
                               transition={{ duration: 0.2, delay: productIndex * 0.05 }}
                               className="flex flex-col sm:flex-row gap-4 p-4 bg-white border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                             >
                               <div className="flex-shrink-0">
                                 <img
                                   src={`${process.env.NEXT_PUBLIC_API_URL}/${product.img}`}
                                   alt={product.name}
                                   className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg shadow-md"
                                   onError={(e) => {
                                     const target = e.target as HTMLImageElement;
                                     target.style.display = 'none';
                                   }}
                                 />
                               </div>
                               <div className="flex-1 min-w-0">
                                 <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                   {product.name}
                                 </h3>
                                 <div className="flex items-center gap-2 text-gray-600">
                                   <DollarSign className="w-4 h-4" />
                                   <span className="font-medium">{getPrecioCorrecto(product)}</span>
                                 </div>
                               </div>
                             </motion.div>
                           ))}
                         </div>
                       ) : (
                         <div className="text-center py-8 text-gray-500">
                           <Package className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                           <p>No se pudieron cargar los productos</p>
                         </div>
                       )}
                     </div>
                  </motion.div>
                ))}
                                            </AnimatePresence>
             </div>

                           {/* Paginación inferior */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-8 px-2"
                >
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Anterior</span>
                  </button>

                  <div className="flex gap-1 flex-wrap justify-center">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="hidden sm:inline">Siguiente</span>
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </motion.div>
              )}

             {/* Información de paginación inferior */}
             {orders.length > 0 && (
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 0.3 }}
                 className="text-center mt-4 text-sm text-gray-500"
               >
                 Mostrando {indexOfFirstOrder + 1} a {Math.min(indexOfLastOrder, orders.length)} de {orders.length} pedidos
               </motion.div>
             )}
           </>
         )}
         
         {/* Render the cancel confirmation modal */}
         {renderCancelConfirmationModal()}
         
         {/* Error notification */}
         <AnimatePresence>
           {error && (
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 20 }}
               className="fixed bottom-6 right-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-lg z-50 max-w-sm"
             >
               <div className="flex items-center">
                 <XCircle className="h-5 w-5 mr-2" />
                 <p className="font-medium">{error}</p>
                 <button 
                   onClick={() => setError(null)}
                   className="ml-4 text-red-500 hover:text-red-700"
                 >
                   <XCircle className="h-5 w-5" />
                 </button>
               </div>
             </motion.div>
           )}
         </AnimatePresence>
       </div>
     </div>
   );
 }
