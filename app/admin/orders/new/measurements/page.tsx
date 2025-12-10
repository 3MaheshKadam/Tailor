'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function NewOrderStep2Page() {
  const router = useRouter();
  
  // Selected garment types
  const [selectedGarments, setSelectedGarments] = useState<string[]>([]);
  
  // Measurements data
  const [shirtMeasurements, setShirtMeasurements] = useState({
    chest: '',
    shoulder: '',
    waist: '',
    shirtLength: '',
    sleeveLength: '',
    collar: '',
  });

  const [pantMeasurements, setPantMeasurements] = useState({
    waist: '',
    hip: '',
    thigh: '',
    knee: '',
    ankle: '',
    pantLength: '',
    crotch: '',
  });

  const [blouseMeasurements, setBlouseMeasurements] = useState({
    chest: '',
    shoulder: '',
    waist: '',
    blouseLength: '',
    sleeveLength: '',
    armhole: '',
  });

  const [kurtaMeasurements, setKurtaMeasurements] = useState({
    chest: '',
    shoulder: '',
    waist: '',
    kurtaLength: '',
    sleeveLength: '',
    slit: '',
  });

  const [commonData, setCommonData] = useState({
    fitPreference: 'Regular',
    fabricType: '',
    specialInstructions: '',
  });

  const [customerGender, setCustomerGender] = useState('Male');
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    // Load customer data from session
    const customerId = sessionStorage.getItem('orderCustomerId');
    const newCustomer = sessionStorage.getItem('orderNewCustomer');
    
    if (newCustomer) {
      const customer = JSON.parse(newCustomer);
      setCustomerGender(customer.gender);
    } else {
      // In real app, fetch customer details by ID
      setCustomerGender('Male'); // Dummy data
    }

    // Load any saved measurement data
    const savedMeasurements = sessionStorage.getItem('orderMeasurements');
    if (savedMeasurements) {
      const data = JSON.parse(savedMeasurements);
      setSelectedGarments(data.selectedGarments || []);
      setShirtMeasurements(data.shirtMeasurements || shirtMeasurements);
      setPantMeasurements(data.pantMeasurements || pantMeasurements);
      setBlouseMeasurements(data.blouseMeasurements || blouseMeasurements);
      setKurtaMeasurements(data.kurtaMeasurements || kurtaMeasurements);
      setCommonData(data.commonData || commonData);
    }
  }, []);

  const toggleGarment = (garment: string) => {
    if (selectedGarments.includes(garment)) {
      setSelectedGarments(selectedGarments.filter(g => g !== garment));
    } else {
      setSelectedGarments([...selectedGarments, garment]);
    }
  };

  const validateMeasurements = () => {
    const newErrors: any = {};

    if (selectedGarments.length === 0) {
      newErrors.garments = 'Please select at least one garment type';
      alert('Please select at least one garment type');
      return false;
    }

    // Validate shirt measurements
    if (selectedGarments.includes('Shirt')) {
      if (!shirtMeasurements.chest) newErrors.shirtChest = 'Required';
      if (!shirtMeasurements.shoulder) newErrors.shirtShoulder = 'Required';
      if (!shirtMeasurements.shirtLength) newErrors.shirtLength = 'Required';
    }

    // Validate pant measurements
    if (selectedGarments.includes('Pant')) {
      if (!pantMeasurements.waist) newErrors.pantWaist = 'Required';
      if (!pantMeasurements.pantLength) newErrors.pantLength = 'Required';
    }

    // Validate blouse measurements
    if (selectedGarments.includes('Blouse')) {
      if (!blouseMeasurements.chest) newErrors.blouseChest = 'Required';
      if (!blouseMeasurements.blouseLength) newErrors.blouseLength = 'Required';
    }

    // Validate kurta measurements
    if (selectedGarments.includes('Kurta')) {
      if (!kurtaMeasurements.chest) newErrors.kurtaChest = 'Required';
      if (!kurtaMeasurements.kurtaLength) newErrors.kurtaLength = 'Required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert('Please fill all required measurements');
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateMeasurements()) {
      // Save measurements to session
      const measurementsData = {
        selectedGarments,
        shirtMeasurements,
        pantMeasurements,
        blouseMeasurements,
        kurtaMeasurements,
        commonData,
      };
      sessionStorage.setItem('orderMeasurements', JSON.stringify(measurementsData));
      router.push('/admin/orders/new/billing');
    }
  };

  const handleBack = () => {
    router.push('/admin/orders/new');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-3xl font-black text-gray-900">Create New Order</h1>
          <p className="text-gray-600 mt-1">Step 2 of 4: Enter measurements</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
              ✓
            </div>
            <span className="font-semibold text-green-600">Customer</span>
          </div>
          <div className="flex-1 h-1 bg-green-600 mx-4"></div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
              2
            </div>
            <span className="font-bold text-blue-600">Measurements</span>
          </div>
          <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <span className="font-semibold text-gray-500">Billing</span>
          </div>
          <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-bold">
              4
            </div>
            <span className="font-semibold text-gray-500">Review</span>
          </div>
        </div>
      </div>

      {/* Garment Type Selection */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Garment Types</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Shirt */}
          <button
            onClick={() => toggleGarment('Shirt')}
            className={`p-6 rounded-xl border-2 transition-all ${
              selectedGarments.includes('Shirt')
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className={`w-16 h-16 mx-auto mb-3 rounded-xl flex items-center justify-center ${
              selectedGarments.includes('Shirt') ? 'bg-blue-600' : 'bg-gray-100'
            }`}>
              <svg className={`w-8 h-8 ${selectedGarments.includes('Shirt') ? 'text-white' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900">Shirt</h3>
          </button>

          {/* Pant */}
          <button
            onClick={() => toggleGarment('Pant')}
            className={`p-6 rounded-xl border-2 transition-all ${
              selectedGarments.includes('Pant')
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className={`w-16 h-16 mx-auto mb-3 rounded-xl flex items-center justify-center ${
              selectedGarments.includes('Pant') ? 'bg-blue-600' : 'bg-gray-100'
            }`}>
              <svg className={`w-8 h-8 ${selectedGarments.includes('Pant') ? 'text-white' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900">Pant</h3>
          </button>

          {/* Kurta */}
          <button
            onClick={() => toggleGarment('Kurta')}
            className={`p-6 rounded-xl border-2 transition-all ${
              selectedGarments.includes('Kurta')
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className={`w-16 h-16 mx-auto mb-3 rounded-xl flex items-center justify-center ${
              selectedGarments.includes('Kurta') ? 'bg-blue-600' : 'bg-gray-100'
            }`}>
              <svg className={`w-8 h-8 ${selectedGarments.includes('Kurta') ? 'text-white' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900">Kurta</h3>
          </button>

          {/* Blouse */}
          <button
            onClick={() => toggleGarment('Blouse')}
            className={`p-6 rounded-xl border-2 transition-all ${
              selectedGarments.includes('Blouse')
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className={`w-16 h-16 mx-auto mb-3 rounded-xl flex items-center justify-center ${
              selectedGarments.includes('Blouse') ? 'bg-blue-600' : 'bg-gray-100'
            }`}>
              <svg className={`w-8 h-8 ${selectedGarments.includes('Blouse') ? 'text-white' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900">Blouse</h3>
          </button>

        </div>
      </div>

      {/* Shirt Measurements */}
      {selectedGarments.includes('Shirt') && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Shirt Measurements
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Chest <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={shirtMeasurements.chest}
                  onChange={(e) => setShirtMeasurements({...shirtMeasurements, chest: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.shirtChest ? 'border-red-500' : 'border-gray-200'
                  } focus:border-blue-600 focus:outline-none text-lg`}
                  placeholder="38"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  inches
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Shoulder <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={shirtMeasurements.shoulder}
                  onChange={(e) => setShirtMeasurements({...shirtMeasurements, shoulder: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.shirtShoulder ? 'border-red-500' : 'border-gray-200'
                  } focus:border-blue-600 focus:outline-none text-lg`}
                  placeholder="17"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  inches
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Waist <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={shirtMeasurements.waist}
                  onChange={(e) => setShirtMeasurements({...shirtMeasurements, waist: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                  placeholder="34"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  inches
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Shirt Length <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={shirtMeasurements.shirtLength}
                  onChange={(e) => setShirtMeasurements({...shirtMeasurements, shirtLength: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.shirtLength ? 'border-red-500' : 'border-gray-200'
                  } focus:border-blue-600 focus:outline-none text-lg`}
                  placeholder="30"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  inches
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Sleeve Length <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={shirtMeasurements.sleeveLength}
                  onChange={(e) => setShirtMeasurements({...shirtMeasurements, sleeveLength: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                  placeholder="24"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  inches
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Collar <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={shirtMeasurements.collar}
                  onChange={(e) => setShirtMeasurements({...shirtMeasurements, collar: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                  placeholder="15"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  inches
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pant Measurements */}
      {selectedGarments.includes('Pant') && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Pant Measurements
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Waist <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={pantMeasurements.waist}
                  onChange={(e) => setPantMeasurements({...pantMeasurements, waist: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.pantWaist ? 'border-red-500' : 'border-gray-200'
                  } focus:border-blue-600 focus:outline-none text-lg`}
                  placeholder="32"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  inches
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Hip <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={pantMeasurements.hip}
                  onChange={(e) => setPantMeasurements({...pantMeasurements, hip: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                  placeholder="38"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  inches
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Thigh <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={pantMeasurements.thigh}
                  onChange={(e) => setPantMeasurements({...pantMeasurements, thigh: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                  placeholder="22"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  inches
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Knee <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={pantMeasurements.knee}
                  onChange={(e) => setPantMeasurements({...pantMeasurements, knee: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                  placeholder="16"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  inches
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Ankle <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={pantMeasurements.ankle}
                  onChange={(e) => setPantMeasurements({...pantMeasurements, ankle: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                  placeholder="14"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  inches
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Pant Length <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={pantMeasurements.pantLength}
                  onChange={(e) => setPantMeasurements({...pantMeasurements, pantLength: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.pantLength ? 'border-red-500' : 'border-gray-200'
                  } focus:border-blue-600 focus:outline-none text-lg`}
                  placeholder="40"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  inches
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Crotch <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={pantMeasurements.crotch}
                  onChange={(e) => setPantMeasurements({...pantMeasurements, crotch: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                  placeholder="12"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  inches
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Kurta Measurements */}
      {selectedGarments.includes('Kurta') && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            Kurta Measurements
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Chest <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={kurtaMeasurements.chest}
                  onChange={(e) => setKurtaMeasurements({...kurtaMeasurements, chest: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.kurtaChest ? 'border-red-500' : 'border-gray-200'
                  } focus:border-blue-600 focus:outline-none text-lg`}
                  placeholder="40"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  inches
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Shoulder <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={kurtaMeasurements.shoulder}
                  onChange={(e) => setKurtaMeasurements({...kurtaMeasurements, shoulder: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                  placeholder="17"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  inches
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Waist <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={kurtaMeasurements.waist}
                  onChange={(e) => setKurtaMeasurements({...kurtaMeasurements, waist: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                  placeholder="36"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  inches
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Kurta Length <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={kurtaMeasurements.kurtaLength}
                  onChange={(e) => setKurtaMeasurements({...kurtaMeasurements, kurtaLength: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.kurtaLength ? 'border-red-500' : 'border-gray-200'
                  } focus:border-blue-600 focus:outline-none text-lg`}
                  placeholder="42"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  inches
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Sleeve Length <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={kurtaMeasurements.sleeveLength}
                  onChange={(e) => setKurtaMeasurements({...kurtaMeasurements, sleeveLength: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                  placeholder="24"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  inches
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Slit <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={kurtaMeasurements.slit}
                  onChange={(e) => setKurtaMeasurements({...kurtaMeasurements, slit: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                  placeholder="6"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  inches
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blouse Measurements */}
      {selectedGarments.includes('Blouse') && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Blouse Measurements
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Chest <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={blouseMeasurements.chest}
                  onChange={(e) => setBlouseMeasurements({...blouseMeasurements, chest: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.blouseChest ? 'border-red-500' : 'border-gray-200'
                  } focus:border-blue-600 focus:outline-none text-lg`}
                  placeholder="36"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  inches
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Shoulder <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={blouseMeasurements.shoulder}
                  onChange={(e) => setBlouseMeasurements({...blouseMeasurements, shoulder: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                  placeholder="14"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  inches
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Waist <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={blouseMeasurements.waist}
                  onChange={(e) => setBlouseMeasurements({...blouseMeasurements, waist: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                  placeholder="30"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  inches
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Blouse Length <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={blouseMeasurements.blouseLength}
                  onChange={(e) => setBlouseMeasurements({...blouseMeasurements, blouseLength: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.blouseLength ? 'border-red-500' : 'border-gray-200'
                  } focus:border-blue-600 focus:outline-none text-lg`}
                  placeholder="15"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  inches
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Sleeve Length <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={blouseMeasurements.sleeveLength}
                  onChange={(e) => setBlouseMeasurements({...blouseMeasurements, sleeveLength: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                  placeholder="12"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  inches
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Armhole <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={blouseMeasurements.armhole}
                  onChange={(e) => setBlouseMeasurements({...blouseMeasurements, armhole: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                  placeholder="18"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  inches
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Common Preferences */}
      {selectedGarments.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Preferences</h2>
          
          <div className="space-y-6">
            {/* Fit Preference */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Fit Preference
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setCommonData({...commonData, fitPreference: 'Slim'})}
                  className={`flex-1 px-6 py-3 rounded-xl border-2 font-semibold transition-all ${
                    commonData.fitPreference === 'Slim'
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-200 text-gray-600 hover:border-blue-300'
                  }`}
                >
                  Slim Fit
                </button>
                <button
                  onClick={() => setCommonData({...commonData, fitPreference: 'Regular'})}
                  className={`flex-1 px-6 py-3 rounded-xl border-2 font-semibold transition-all ${
                    commonData.fitPreference === 'Regular'
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-200 text-gray-600 hover:border-blue-300'
                  }`}
                >
                  Regular Fit
                </button>
                <button
                  onClick={() => setCommonData({...commonData, fitPreference: 'Loose'})}
                  className={`flex-1 px-6 py-3 rounded-xl border-2 font-semibold transition-all ${
                    commonData.fitPreference === 'Loose'
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-200 text-gray-600 hover:border-blue-300'
                  }`}
                >
                  Loose Fit
                </button>
              </div>
            </div>

            {/* Fabric Type */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Fabric Type <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <input
                type="text"
                value={commonData.fabricType}
                onChange={(e) => setCommonData({...commonData, fabricType: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                placeholder="e.g., Cotton, Linen, Silk"
              />
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Special Instructions <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <textarea
                value={commonData.specialInstructions}
                onChange={(e) => setCommonData({...commonData, specialInstructions: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg resize-none"
                placeholder="Any special design preferences, pocket requirements, button style, etc."
              />
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center bg-white rounded-2xl border border-gray-200 p-6">
        <button
          onClick={handleBack}
          className="px-8 py-3 bg-white text-gray-700 font-bold rounded-xl border-2 border-gray-300 hover:bg-gray-100 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back: Customer</span>
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2"
        >
          <span>Next: Billing</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>

    </div>
  );
}