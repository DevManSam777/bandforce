import { useState } from 'react';
import { FaSave, FaUndo } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { useGetAllTaxRatesQuery, useUpdateTaxRateMutation, useDeactivateTaxRateMutation, useActivateTaxRateMutation } from '../../slices/taxRateApiSlice';
import { toast } from 'react-toastify';

const TaxRateScreen = () => {
  const { data: taxRates, isLoading, error, refetch } = useGetAllTaxRatesQuery();
  const [updateTaxRate] = useUpdateTaxRateMutation();
  const [deactivateTaxRate] = useDeactivateTaxRateMutation();
  const [activateTaxRate] = useActivateTaxRateMutation();
  
  const [editingRates, setEditingRates] = useState({});

  const handleRateChange = (state, newRate) => {
    setEditingRates({
      ...editingRates,
      [state]: newRate,
    });
  };

  const handleSaveRate = async (state) => {
    const newRate = parseFloat(editingRates[state]);
    
    if (isNaN(newRate) || newRate < 0 || newRate > 1) {
      toast.error('Tax rate must be a number between 0 and 1');
      return;
    }

    try {
      await updateTaxRate({ state, rate: newRate }).unwrap();
      setEditingRates({ ...editingRates, [state]: undefined });
      refetch();
      toast.success(`Tax rate for ${state} updated`);
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update tax rate');
    }
  };

  const handleToggleActive = async (state, isActive) => {
    try {
      if (isActive) {
        await deactivateTaxRate(state).unwrap();
        toast.success(`Tax rate for ${state} deactivated`);
      } else {
        await activateTaxRate(state).unwrap();
        toast.success(`Tax rate for ${state} activated`);
      }
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to toggle tax rate');
    }
  };

  const handleCancel = (state) => {
    setEditingRates({ ...editingRates, [state]: undefined });
  };

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error?.data?.message || error.error}</Message>;

  return (
    <FormContainer>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Tax Rates Management</h1>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">
            <strong>Note:</strong> These tax rates are used for all new orders. Rates are stored in the database 
            and can be updated without redeploying the application. All active tax rates are automatically applied 
            based on the customer's shipping state.
          </p>
        </div>

        {taxRates && taxRates.length === 0 ? (
          <Message>No tax rates found</Message>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 gap-4 p-6">
              {taxRates?.map((taxRate) => (
                <div key={taxRate.state} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 text-lg">
                        {taxRate.state} - {taxRate.stateName}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">
                        Status: {taxRate.isActive ? (
                          <span className="text-green-600 font-semibold">Active</span>
                        ) : (
                          <span className="text-red-600 font-semibold">Inactive</span>
                        )}
                      </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-3 items-start md:items-center w-full md:w-auto">
                      <div className="flex gap-2 items-center">
                        <label className="text-slate-700 font-semibold">Rate:</label>
                        <input
                          type="number"
                          step="0.001"
                          min="0"
                          max="1"
                          value={editingRates[taxRate.state] !== undefined ? editingRates[taxRate.state] : taxRate.rate}
                          onChange={(e) => handleRateChange(taxRate.state, e.target.value)}
                          className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-slate-900"
                        />
                        <span className="text-slate-700 font-semibold">
                          ({((editingRates[taxRate.state] !== undefined ? editingRates[taxRate.state] : taxRate.rate) * 100).toFixed(2)}%)
                        </span>
                      </div>

                      <div className="flex gap-2">
                        {editingRates[taxRate.state] !== undefined ? (
                          <>
                            <button
                              onClick={() => handleSaveRate(taxRate.state)}
                              className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition"
                            >
                              <FaSave /> Save
                            </button>
                            <button
                              onClick={() => handleCancel(taxRate.state)}
                              className="flex items-center gap-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition"
                            >
                              <FaUndo /> Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleToggleActive(taxRate.state, taxRate.isActive)}
                            className={`px-4 py-2 rounded-lg text-sm transition font-semibold ${
                              taxRate.isActive
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-green-500 hover:bg-green-600 text-white'
                            }`}
                          >
                            {taxRate.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </FormContainer>
  );
};

export default TaxRateScreen;
