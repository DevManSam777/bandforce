import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import FormInput from '../../components/FormInput';
import { toast } from 'react-toastify';
import { useUpdateProductMutation, useGetProductDetailsQuery, useUploadProductImageMutation, useGetCategoriesQuery } from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [featured, setFeatured] = useState(false);
  const [images, setImages] = useState([]);

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  const { data: categories = [] } = useGetCategoriesQuery();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      // Handle both old string categories and new object categories
      setCategory(product.category?._id || product.category || '');
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setFeatured(product.featured || false);
      setImages(product.images || []);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Validate countInStock
    if (countInStock < 0) {
      toast.error('Count in stock cannot be negative');
      return;
    }

    const updatedProduct = {
      _id: productId,
      name,
      price,
      image,
      images,
      brand,
      category: category || null,
      countInStock: Math.max(0, parseInt(countInStock) || 0),
      description,
      featured,
    };

    try {
      await updateProduct(updatedProduct).unwrap();
      toast.success('Product updated');
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const files = Array.from(e.target.files);
    
    for (const file of files) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const res = await uploadProductImage(formData).unwrap();
        const newImage = { url: res.image, alt: file.name };
        
        setImages([...images, newImage]);
        if (images.length === 0) {
          setImage(res.image);
        }
        toast.success(res.message);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const removeImage = (indexToRemove) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);
    
    if (updatedImages.length > 0) {
      setImage(updatedImages[0].url);
    } else {
      setImage('');
    }
  };

  const setPrimaryImage = (index) => {
    setImage(images[index].url);
  };

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error?.data?.message || error.error}</Message>;

  return (
    <>
      <Link to="/admin/productlist" className="inline-block mb-6 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-lg transition font-semibold">
        ← Go Back
      </Link>

      <FormContainer>
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8 text-slate-900">Edit Product</h1>

          <form onSubmit={submitHandler} className="space-y-6">
            <FormInput
              label="Name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product name"
              required
            />

            <FormInput
              label="Price"
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              placeholder="0.00"
              required
            />

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Product Images
              </label>
              <input
                type="file"
                multiple
                onChange={uploadFileHandler}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              {loadingUpload && <Loader />}
              
              {images.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-slate-700 mb-3">Product Images ({images.length})</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {images.map((img, index) => (
                      <div key={index} className={`relative rounded-lg overflow-hidden border-2 transition ${
                        image === img.url ? 'border-blue-600 ring-2 ring-blue-400' : 'border-gray-300'
                      }`}>
                        <img
                          src={img.url}
                          alt={img.alt}
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex flex-col items-center justify-center gap-1 text-white text-xs">
                          <button
                            type="button"
                            onClick={() => setPrimaryImage(index)}
                            className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded whitespace-nowrap"
                          >
                            Set Primary
                          </button>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded whitespace-nowrap"
                          >
                            Delete
                          </button>
                        </div>
                        {image === img.url && (
                          <div className="absolute top-1 left-1 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            ✓
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <FormInput
              label="Brand"
              type="text"
              name="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Product brand"
              required
            />

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 pr-10 bg-white text-slate-900 border border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none transition hover:border-gray-400 appearance-none cursor-pointer"
                style={{backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23334155' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em'}}
              >
                <option value="">Select a category</option>
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <FormInput
              label="Count In Stock"
              type="number"
              name="countInStock"
              value={countInStock}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setCountInStock(isNaN(val) ? 0 : Math.max(0, val));
              }}
              placeholder="0"
              min="0"
              required
            />

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product description"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none transition"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="featured" className="text-sm font-semibold text-slate-700 cursor-pointer">
                Featured in Carousel
              </label>
            </div>

            <button
              type="submit"
              disabled={loadingUpdate}
              className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Update Product
            </button>

            {loadingUpdate && <Loader />}
          </form>
        </div>
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
