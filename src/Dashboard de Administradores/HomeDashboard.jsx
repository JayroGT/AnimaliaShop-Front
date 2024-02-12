import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';


const HomeDashboard = () => {
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
 
  const [deleteCategoryMessage, setDeleteCategoryMessage] = useState(null);
  const [deleteProductMessage,setDeleteProductMessage] = useState(null)

  const ObtenerDatos = async () => {
    try {
      const responseProduct = await fetch('http://localhost:3001/products');
      const dataProducts = await responseProduct.json();

      const responseCategory = await fetch('http://localhost:3001/categories');
      const dataCategories = await responseCategory.json();

      setProductData(dataProducts);
      setCategoryData(dataCategories);
    } catch (error) {
      console.log('Error al obtener estadísticas:', error);
    }
  };

  useEffect(() => {
    ObtenerDatos();
  }, []);
  
  const handleDeleteCategory = async (categoryName) => {
    
    try {
      const response = await fetch(`http://localhost:3001/deleteCategories/${categoryName}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setDeleteCategoryMessage('Categoría eliminada con éxito');
    
      } else {
        setDeleteCategoryMessage('Error al eliminar la categoría');
      }
    } catch (error) {
      setDeleteCategoryMessage('Error en la solicitud DELETE');
    }
  };
  const handleDeleteProduct = async (ProductId) => {
    try {
      const response = await fetch(`http://localhost:3001/deleteProduct/${ProductId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDeleteProductMessage('Producto eliminado con éxito');
        
      } else {
        setDeleteProductMessage('Error al eliminar el producto');
      }
    } catch (error) {
      setDeleteProductMessage('Error en la solicitud DELETE');
    }
  };
  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-blue-500 via-blue-400 to-green-500 text-white min-h-screen">
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Dashboard AnimaliaShop</h1>
       
        <div className="flex justify-between max-w-md mx-auto mb-4">
          <div className="w-1/2 mr-2">
            <Link to='/dashboard/formularioProducto' className="block w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded text-center">
              Creación de Producto
            </Link>
          </div>
          <div className="w-1/2 ml-2">
            <Link to='/dashboard/creationCategory' className="block w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded text-center">
              Creación de Categoría
            </Link>
          </div>
        </div>

        {/* Datos Productos*/}
        <div> 
        {deleteProductMessage && (
            <div className="bg-green-200 text-green-800 rounded-md p-4 mb-4">{deleteProductMessage}</div>
          )}
          <h2  className="text-2xl font-semibold mb-2 text-center text-black mb-4">Lista de productos:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {productData.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded shadow text-black mb-4">
                <h3 className="text-2xl font-bold mb-2 text-center text-gray-900">{product.title}</h3>

                <img src={product.image} alt={product.title} />
                <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                <p className="text-sm text-gray-600">Price: {product.price}</p>
                <p className="text-sm text-gray-600">Description: {product.description}</p>
                <p className="text-sm text-gray-600 mb-4">Category: {product.category}</p>

                <div className="flex justify-center">
                  <button  onClick={()=>handleDeleteProduct(product.id)}className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                    Eliminar
                  </button>
                  <Link to={`/modifications/product/${product.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Editar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Datos categorias*/}
        <div> 
          {deleteCategoryMessage && (
            <div className="bg-green-200 text-green-800 rounded-md p-4 mb-4">{deleteCategoryMessage}</div>
          )}
          <h2 className="text-2xl font-semibold mb-2 text-center text-black mb-4">Lista de Categorías:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryData.map((category, index) => (
              <div key={index} className="bg-gray-100 rounded-lg shadow-md p-4 text-center">
                <h3 className="text-xl font-semibold mb-4 text-black">{category.category}</h3>
                <div className="flex justify-center">
                <button onClick={() => handleDeleteCategory(category.category)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Eliminar</button>


                  <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Editar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;