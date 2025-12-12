'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function CreateOrderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preSelectedCustomerId = searchParams.get('customerId');
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');
  // Customer Selection
  const [selectionMode, setSelectionMode] = useState<'existing' | 'new'>(
    preSelectedCustomerId ? 'existing' : 'existing'
  );
  const [selectedCustomerId, setSelectedCustomerId] = useState(preSelectedCustomerId || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [newCustomerData, setNewCustomerData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    gender: 'Male',
  });
  // Measurements
  const [selectedGarments, setSelectedGarments] = useState<string[]>([]);
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
  // Tailor Assignment
  const [assignedTailor, setAssignedTailor] = useState('');
  // Billing
  const [billingData, setBillingData] = useState({
    itemCosts: [] as { garment: string; quantity: number; costPerItem: number }[],
    additionalCharges: '',
    discount: '',
    advancePaid: '',
    paymentMode: 'Cash',
    deliveryDate: '',
  });
  const [errors, setErrors] = useState<any>({});
  // Dummy customers
  const allCustomers = [
    {
      id: 'CUST-001',
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh@email.com',
      address: 'Shop No. 12, MG Road, Mumbai',
      gender: 'Male',
      totalOrders: 8,
      avatar: 'RK',
    },
    {
      id: 'CUST-002',
      name: 'Priya Sharma',
      phone: '+91 98765 43211',
      email: 'priya@email.com',
      address: '45, Connaught Place, Delhi',
      gender: 'Female',
      totalOrders: 12,
      avatar: 'PS',
    },
    {
      id: 'CUST-003',
      name: 'Amit Patel',
      phone: '+91 98765 43212',
      email: 'amit@email.com',
      address: '78, CG Road, Ahmedabad',
      gender: 'Male',
      totalOrders: 5,
      avatar: 'AP',
    },
    {
      id: 'CUST-004',
      name: 'Sneha Reddy',
      phone: '+91 98765 43213',
      email: 'sneha@email.com',
      address: '23, Jubilee Hills, Hyderabad',
      gender: 'Female',
      totalOrders: 15,
      avatar: 'SR',
    },
    {
      id: 'CUST-005',
      name: 'Vikram Singh',
      phone: '+91 98765 43214',
      email: 'vikram@email.com',
      address: '56, Lajpat Nagar, New Delhi',
      gender: 'Male',
      totalOrders: 3,
      avatar: 'VS',
    },
  ];
  // Dummy tailors
  const tailors = [
    { id: 'TAILOR-001', name: 'Ramesh Kumar' },
    { id: 'TAILOR-002', name: 'Suresh Patil' },
    { id: 'TAILOR-003', name: 'Mahesh Rao' },
  ];
  const filteredCustomers = allCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    if (selectedGarments.length > 0) {
      const initialCosts = selectedGarments.map((garment) => ({
        garment,
        quantity: 1,
        costPerItem: getDefaultPrice(garment),
      }));
      setBillingData(prev => ({ ...prev, itemCosts: initialCosts }));
    }
  }, [selectedGarments]);
  const getDefaultPrice = (garment: string) => {
    const prices: any = {
      'Shirt': 1200,
      'Pant': 1000,
      'Kurta': 1500,
      'Blouse': 800,
    };
    return prices[garment] || 1000;
  };
  const toggleGarment = (garment: string) => {
    if (selectedGarments.includes(garment)) {
      setSelectedGarments(selectedGarments.filter(g => g !== garment));
    } else {
      setSelectedGarments([...selectedGarments, garment]);
    }
  };
  const handleItemCostChange = (index: number, field: string, value: string) => {
    const newItemCosts = [...billingData.itemCosts];
    newItemCosts[index] = {
      ...newItemCosts[index],
      [field]: field === 'garment' ? value : parseFloat(value) || 0,
    };
    setBillingData({ ...billingData, itemCosts: newItemCosts });
  };
  const calculateSubtotal = () => {
    return billingData.itemCosts.reduce((sum, item) =>
      sum + (item.quantity * item.costPerItem), 0
    );
  };
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const additional = parseFloat(billingData.additionalCharges) || 0;
    const discount = parseFloat(billingData.discount) || 0;
    return subtotal + additional - discount;
  };
  const calculateRemaining = () => {
    const total = calculateTotal();
    const advance = parseFloat(billingData.advancePaid) || 0;
    return total - advance;
  };
  const validateStep1 = () => {
    if (selectionMode === 'existing') {
      if (!selectedCustomerId) {
        alert('Please select a customer');
        return false;
      }
    } else {
      const newErrors: any = {};
      if (!newCustomerData.name.trim()) newErrors.name = 'Name is required';
      if (!newCustomerData.phone.trim()) {
        newErrors.phone = 'Phone is required';
      } else if (!/^[0-9]{10}$/.test(newCustomerData.phone)) {
        newErrors.phone = 'Enter valid 10-digit phone number';
      }
      if (!newCustomerData.address.trim()) newErrors.address = 'Address is required';
      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return false;
    }
    return true;
  };
  const validateStep2 = () => {
    const newErrors: any = {};
    if (selectedGarments.length === 0) {
      alert('Please select at least one garment type');
      return false;
    }
    if (selectedGarments.includes('Shirt')) {
      if (!shirtMeasurements.chest) newErrors.shirtChest = 'Required';
      if (!shirtMeasurements.shoulder) newErrors.shirtShoulder = 'Required';
      if (!shirtMeasurements.shirtLength) newErrors.shirtLength = 'Required';
    }
    if (selectedGarments.includes('Pant')) {
      if (!pantMeasurements.waist) newErrors.pantWaist = 'Required';
      if (!pantMeasurements.pantLength) newErrors.pantLength = 'Required';
    }
    if (selectedGarments.includes('Blouse')) {
      if (!blouseMeasurements.chest) newErrors.blouseChest = 'Required';
      if (!blouseMeasurements.blouseLength) newErrors.blouseLength = 'Required';
    }
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
  const validateStep3 = () => {
    if (!assignedTailor) {
      alert('Please assign a tailor to this order');
      return false;
    }
    return true;
  };
  const validateStep4 = () => {
    const newErrors: any = {};
    billingData.itemCosts.forEach((item, index) => {
      if (item.quantity <= 0) {
        newErrors[`quantity_${index}`] = 'Quantity must be at least 1';
      }
      if (item.costPerItem <= 0) {
        newErrors[`cost_${index}`] = 'Cost must be greater than 0';
      }
    });
    if (!billingData.deliveryDate) {
      newErrors.deliveryDate = 'Delivery date is required';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(billingData.deliveryDate);
      if (selectedDate < today) {
        newErrors.deliveryDate = 'Delivery date cannot be in the past';
      }
    }
    const total = calculateTotal();
    const advance = parseFloat(billingData.advancePaid) || 0;
    if (advance > total) {
      newErrors.advancePaid = 'Advance cannot be greater than total amount';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      alert('Please fix the errors before proceeding');
      return false;
    }
    return true;
  };
  const handleNext = () => {
    let isValid = false;
   
    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      case 4:
        isValid = validateStep4();
        break;
    }
    if (isValid && currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  const handleSubmit = () => {
    if (!validateStep4()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
      setGeneratedOrderId(orderId);
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 2000);
  };
  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.push(`/admin/orders/${generatedOrderId}`);
  };
  const getSelectedCustomer = () => {
    if (selectionMode === 'existing') {
      return allCustomers.find(c => c.id === selectedCustomerId);
    }
    return newCustomerData;
  };
  return (
    <div className="max-w-7xl mx-auto space-y-6">
     
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/orders"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-3xl font-black text-gray-900">Create New Order</h1>
          <p className="text-gray-600 mt-1">Complete all steps to create an order</p>
        </div>
      </div>
      {/* Progress Steps */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
         
          {/* Step 1 */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg ${
              currentStep > 1 ? 'bg-green-600 text-white' : currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {currentStep > 1 ? '✓' : '1'}
            </div>
            <span className={`font-bold hidden md:block ${currentStep === 1 ? 'text-blue-600' : currentStep > 1 ? 'text-green-600' : 'text-gray-500'}`}>
              Customer
            </span>
          </div>
          <div className={`flex-1 h-1 mx-4 ${currentStep > 1 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
         
          {/* Step 2 */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg ${
              currentStep > 2 ? 'bg-green-600 text-white' : currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {currentStep > 2 ? '✓' : '2'}
            </div>
            <span className={`font-bold hidden md:block ${currentStep === 2 ? 'text-blue-600' : currentStep > 2 ? 'text-green-600' : 'text-gray-500'}`}>
              Measurements
            </span>
          </div>
          <div className={`flex-1 h-1 mx-4 ${currentStep > 2 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
         
          {/* Step 3 */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg ${
              currentStep > 3 ? 'bg-green-600 text-white' : currentStep === 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {currentStep > 3 ? '✓' : '3'}
            </div>
            <span className={`font-bold hidden md:block ${currentStep === 3 ? 'text-blue-600' : currentStep > 3 ? 'text-green-600' : 'text-gray-500'}`}>
              Tailor
            </span>
          </div>
          <div className={`flex-1 h-1 mx-4 ${currentStep > 3 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
         
          {/* Step 4 */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg ${
              currentStep > 4 ? 'bg-green-600 text-white' : currentStep === 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {currentStep > 4 ? '✓' : '4'}
            </div>
            <span className={`font-bold hidden md:block ${currentStep === 4 ? 'text-blue-600' : currentStep > 4 ? 'text-green-600' : 'text-gray-500'}`}>
              Billing
            </span>
          </div>
          <div className={`flex-1 h-1 mx-4 ${currentStep > 4 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
         
          {/* Step 5 */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg ${
              currentStep === 5 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              5
            </div>
            <span className={`font-bold hidden md:block ${currentStep === 5 ? 'text-blue-600' : 'text-gray-500'}`}>
              Review
            </span>
          </div>
        </div>
      </div>
      {/* STEP 1: Customer Selection */}
      {currentStep === 1 && (
        <div className="space-y-6">
         
          {/* Selection Mode Toggle */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Customer Option</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => setSelectionMode('existing')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectionMode === 'existing'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectionMode === 'existing' ? 'border-blue-600' : 'border-gray-300'
                  }`}>
                    {selectionMode === 'existing' && (
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-900 text-lg">Select Existing Customer</h3>
                    <p className="text-sm text-gray-600">Choose from your customer database</p>
                  </div>
                </div>
              </button>
              <button
                onClick={() => setSelectionMode('new')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectionMode === 'new'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectionMode === 'new' ? 'border-blue-600' : 'border-gray-300'
                  }`}>
                    {selectionMode === 'new' && (
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-900 text-lg">Create New Customer</h3>
                    <p className="text-sm text-gray-600">Add a new customer to database</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
          {/* Existing Customer Selection */}
          {selectionMode === 'existing' && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Customer</h2>
               
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search by name, phone, or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none text-lg"
                  />
                </div>
              </div>
              <div className="p-6 max-h-96 overflow-y-auto space-y-3">
                {filteredCustomers.map((customer) => (
                  <button
                    key={customer.id}
                    onClick={() => setSelectedCustomerId(customer.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      selectedCustomerId === customer.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedCustomerId === customer.id ? 'border-blue-600' : 'border-gray-300'
                      }`}>
                        {selectedCustomerId === customer.id && (
                          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                     
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        {customer.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{customer.name}</h3>
                        <p className="text-sm text-gray-600">{customer.phone}</p>
                        <p className="text-xs text-gray-500">{customer.address}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{customer.totalOrders} orders</p>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
                          {customer.gender}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
                {filteredCustomers.length === 0 && (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No customers found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your search</p>
                    <button
                      onClick={() => setSelectionMode('new')}
                      className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Create New Customer
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* New Customer Form */}
          {selectionMode === 'new' && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">New Customer Details</h2>
             
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newCustomerData.name}
                      onChange={(e) => setNewCustomerData({...newCustomerData, name: e.target.value})}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.name ? 'border-red-500' : 'border-gray-200'
                      } focus:border-blue-600 focus:outline-none text-lg`}
                      placeholder="Rajesh Kumar"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={newCustomerData.phone}
                        onChange={(e) => setNewCustomerData({...newCustomerData, phone: e.target.value})}
                        maxLength={10}
                        className={`w-full pl-14 pr-4 py-3 rounded-xl border-2 ${
                          errors.phone ? 'border-red-500' : 'border-gray-200'
                        } focus:border-blue-600 focus:outline-none text-lg`}
                        placeholder="9876543210"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={newCustomerData.email}
                      onChange={(e) => setNewCustomerData({...newCustomerData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                      placeholder="rajesh@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4 mt-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={newCustomerData.gender === 'Male'}
                          onChange={(e) => setNewCustomerData({...newCustomerData, gender: e.target.value})}
                          className="w-5 h-5 text-blue-600"
                        />
                        <span className="text-lg font-semibold text-gray-700">Male</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={newCustomerData.gender === 'Female'}
                          onChange={(e) => setNewCustomerData({...newCustomerData, gender: e.target.value})}
                          className="w-5 h-5 text-blue-600"
                        />
                        <span className="text-lg font-semibold text-gray-700">Female</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={newCustomerData.address}
                    onChange={(e) => setNewCustomerData({...newCustomerData, address: e.target.value})}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.address ? 'border-red-500' : 'border-gray-200'
                    } focus:border-blue-600 focus:outline-none text-lg resize-none`}
                    placeholder="Shop No. 12, MG Road, Mumbai"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {/* STEP 2: Measurements */}
      {currentStep === 2 && (
        <div className="space-y-6">
         
          {/* Garment Selection */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Garment Types</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             
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
                      placeholder="12"
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
                      placeholder="28"
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
                      placeholder="18"
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
                      placeholder="6"
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
          {/* Common Preferences */}
          {selectedGarments.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Preferences</h2>
             
              <div className="space-y-6">
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
        </div>
      )}
      {/* STEP 3: Tailor Assignment */}
      {currentStep === 3 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Assign Tailor</h2>
         
          <div className="space-y-4">
            {tailors.map((tailor) => (
              <button
                key={tailor.id}
                onClick={() => setAssignedTailor(tailor.id)}
                className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                  assignedTailor === tailor.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    assignedTailor === tailor.id ? 'border-blue-600' : 'border-gray-300'
                  }`}>
                    {assignedTailor === tailor.id && (
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {tailor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-xl">{tailor.name}</h3>
                    <p className="text-sm text-gray-600">Expert Tailor</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-500">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-bold">4.8</span>
                    </div>
                    <p className="text-xs text-gray-500">15 active orders</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* STEP 4: Billing */}
      {currentStep === 4 && (
        <div className="space-y-6">
         
          {/* Item Costs */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Item Costs
            </h2>
            <div className="space-y-4">
              {billingData.itemCosts.map((item, index) => (
                <div key={index} className="grid md:grid-cols-4 gap-4 items-center p-4 bg-gray-50 rounded-xl">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Garment Type
                    </label>
                    <input
                      type="text"
                      value={item.garment}
                      disabled
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-lg font-semibold text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemCostChange(index, 'quantity', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors[`quantity_${index}`] ? 'border-red-500' : 'border-gray-200'
                      } focus:border-blue-600 focus:outline-none text-lg`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Cost Per Item (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="50"
                      value={item.costPerItem}
                      onChange={(e) => handleItemCostChange(index, 'costPerItem', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors[`cost_${index}`] ? 'border-red-500' : 'border-gray-200'
                      } focus:border-blue-600 focus:outline-none text-lg`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Subtotal
                    </label>
                    <div className="px-4 py-3 bg-white rounded-xl border-2 border-gray-200">
                      <p className="text-lg font-bold text-gray-900">
                        ₹{(item.quantity * item.costPerItem).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Additional Charges & Discount */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Details</h2>
           
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Additional Charges (₹) <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={billingData.additionalCharges}
                  onChange={(e) => setBillingData({...billingData, additionalCharges: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                  placeholder="0"
                />
                <p className="text-sm text-gray-500 mt-1">Extra charges for buttons, zippers, etc.</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Discount (₹) <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={billingData.discount}
                  onChange={(e) => setBillingData({...billingData, discount: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                  placeholder="0"
                />
                <p className="text-sm text-gray-500 mt-1">Any discount offered to customer</p>
              </div>
            </div>
          </div>
          {/* Payment Details */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Payment Details
            </h2>
           
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Payment Mode
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setBillingData({...billingData, paymentMode: 'Cash'})}
                    className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all ${
                      billingData.paymentMode === 'Cash'
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-200 text-gray-600 hover:border-blue-300'
                    }`}
                  >
                    💵 Cash
                  </button>
                  <button
                    onClick={() => setBillingData({...billingData, paymentMode: 'Online'})}
                    className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all ${
                      billingData.paymentMode === 'Online'
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-200 text-gray-600 hover:border-blue-300'
                    }`}
                  >
                    💳 Online
                  </button>
                  <button
                    onClick={() => setBillingData({...billingData, paymentMode: 'UPI'})}
                    className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all ${
                      billingData.paymentMode === 'UPI'
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-200 text-gray-600 hover:border-blue-300'
                    }`}
                  >
                    📱 UPI
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Advance Paid (₹) <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={billingData.advancePaid}
                  onChange={(e) => setBillingData({...billingData, advancePaid: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.advancePaid ? 'border-red-500' : 'border-gray-200'
                  } focus:border-blue-600 focus:outline-none text-lg`}
                  placeholder="0"
                />
                {errors.advancePaid && <p className="text-red-500 text-sm mt-1">{errors.advancePaid}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Delivery Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={billingData.deliveryDate}
                  onChange={(e) => setBillingData({...billingData, deliveryDate: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.deliveryDate ? 'border-red-500' : 'border-gray-200'
                  } focus:border-blue-600 focus:outline-none text-lg`}
                />
                {errors.deliveryDate && <p className="text-red-500 text-sm mt-1">{errors.deliveryDate}</p>}
              </div>
            </div>
          </div>
          {/* Billing Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing Summary</h2>
           
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-blue-200">
                <span className="text-lg text-gray-700">Items Subtotal</span>
                <span className="text-xl font-bold text-gray-900">₹{calculateSubtotal().toLocaleString()}</span>
              </div>
              {(parseFloat(billingData.additionalCharges) || 0) > 0 && (
                <div className="flex items-center justify-between py-3 border-b border-blue-200">
                  <span className="text-lg text-gray-700">Additional Charges</span>
                  <span className="text-xl font-bold text-green-600">
                    +₹{parseFloat(billingData.additionalCharges).toLocaleString()}
                  </span>
                </div>
              )}
              {(parseFloat(billingData.discount) || 0) > 0 && (
                <div className="flex items-center justify-between py-3 border-b border-blue-200">
                  <span className="text-lg text-gray-700">Discount</span>
                  <span className="text-xl font-bold text-red-600">
                    -₹{parseFloat(billingData.discount).toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between py-4 border-b-2 border-blue-400">
                <span className="text-xl font-bold text-gray-900">Total Amount</span>
                <span className="text-3xl font-black text-blue-600">₹{calculateTotal().toLocaleString()}</span>
              </div>
              {(parseFloat(billingData.advancePaid) || 0) > 0 && (
                <div className="flex items-center justify-between py-3 border-b border-blue-200">
                  <span className="text-lg text-gray-700">Advance Paid</span>
                  <span className="text-xl font-bold text-green-600">
                    ₹{parseFloat(billingData.advancePaid).toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between py-4 bg-white rounded-xl px-6">
                <span className="text-xl font-bold text-gray-900">Remaining Amount</span>
                <span className={`text-3xl font-black ${
                  calculateRemaining() > 0 ? 'text-orange-600' : 'text-green-600'
                }`}>
                  ₹{calculateRemaining().toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* STEP 5: Review */}
      {currentStep === 5 && (
        <div className="grid lg:grid-cols-3 gap-6">
         
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
           
            {/* Customer Details */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Customer Details
              </h2>
              <div className="space-y-3">
                {selectionMode === 'existing' ? (
                  <>
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-bold text-gray-900">{getSelectedCustomer()?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-semibold text-gray-900">{getSelectedCustomer()?.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-semibold text-gray-900">{getSelectedCustomer()?.email || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-semibold text-gray-900">{getSelectedCustomer()?.address}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-bold text-gray-900">{newCustomerData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-semibold text-gray-900">+91 {newCustomerData.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-semibold text-gray-900">{newCustomerData.email || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-semibold text-gray-900">{newCustomerData.address}</p>
                    </div>
                  </>
                )}
              </div>
              <button
                onClick={() => setCurrentStep(1)}
                className="mt-4 block w-full text-center px-4 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors"
              >
                Edit Customer
              </button>
            </div>
            {/* Tailor Assignment */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Assigned Tailor</h2>
              <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {tailors.find(t => t.id === assignedTailor)?.name.split(' ').map(n => n[0]).join('') || 'T'}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{tailors.find(t => t.id === assignedTailor)?.name || 'Not Assigned'}</p>
                  <p className="text-sm text-gray-600">Tailor</p>
                </div>
              </div>
              <button
                onClick={() => setCurrentStep(3)}
                className="mt-4 block w-full text-center px-4 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors"
              >
                Change Tailor
              </button>
            </div>
            {/* Billing Summary */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Payment Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-gray-700">Total Amount</span>
                  <span className="font-bold text-gray-900">₹{calculateTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-gray-700">Advance Paid</span>
                  <span className="font-bold text-green-600">
                    ₹{parseFloat(billingData.advancePaid || '0').toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 bg-white rounded-xl px-4">
                  <span className="font-bold text-gray-900">Remaining</span>
                  <span className={`text-xl font-black ${
                    calculateRemaining() > 0 ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    ₹{calculateRemaining().toLocaleString()}
                  </span>
                </div>
                <div className="pt-3 border-t border-blue-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Payment Mode</span>
                    <span className="text-sm font-semibold text-gray-900">{billingData.paymentMode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Delivery Date</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {new Date(billingData.deliveryDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setCurrentStep(4)}
                className="mt-4 block w-full text-center px-4 py-2 text-blue-600 font-semibold hover:bg-blue-100 rounded-lg transition-colors"
              >
                Edit Billing
              </button>
            </div>
          </div>
          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
           
            {/* Order Items */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Order Items
                </h2>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Edit
                </button>
              </div>
             
              <div className="space-y-4">
                {billingData.itemCosts.map((item, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{item.garment}</h3>
                      <span className="text-xl font-bold text-blue-600">
                        ₹{(item.quantity * item.costPerItem).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Quantity: <span className="font-semibold text-gray-900">{item.quantity}</span></span>
                      <span>•</span>
                      <span>Price: <span className="font-semibold text-gray-900">₹{item.costPerItem.toLocaleString()}</span> each</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Measurements Summary */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Measurements
                </h2>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Edit
                </button>
              </div>
              {selectedGarments.includes('Shirt') && (
                <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Shirt Measurements</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(shirtMeasurements).map(([key, value]: any) => (
                      value && (
                        <div key={key}>
                          <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                          <p className="font-semibold text-gray-900">{value} inches</p>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
              {selectedGarments.includes('Pant') && (
                <div className="mb-6 p-4 bg-green-50 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Pant Measurements</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(pantMeasurements).map(([key, value]: any) => (
                      value && (
                        <div key={key}>
                          <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                          <p className="font-semibold text-gray-900">{value} inches</p>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
              {selectedGarments.includes('Kurta') && (
                <div className="mb-6 p-4 bg-purple-50 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Kurta Measurements</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(kurtaMeasurements).map(([key, value]: any) => (
                      value && (
                        <div key={key}>
                          <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                          <p className="font-semibold text-gray-900">{value} inches</p>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
              {selectedGarments.includes('Blouse') && (
                <div className="mb-6 p-4 bg-pink-50 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Blouse Measurements</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(blouseMeasurements).map(([key, value]: any) => (
                      value && (
                        <div key={key}>
                          <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                          <p className="font-semibold text-gray-900">{value} inches</p>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-3">Preferences</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Fit Preference</p>
                    <p className="font-semibold text-gray-900">{commonData.fitPreference}</p>
                  </div>
                  {commonData.fabricType && (
                    <div>
                      <p className="text-xs text-gray-500">Fabric Type</p>
                      <p className="font-semibold text-gray-900">{commonData.fabricType}</p>
                    </div>
                  )}
                  {commonData.specialInstructions && (
                    <div className="md:col-span-3">
                      <p className="text-xs text-gray-500">Special Instructions</p>
                      <p className="font-semibold text-gray-900">{commonData.specialInstructions}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
  {/* Navigation Buttons */}
  <div className="flex justify-between items-center bg-white rounded-2xl border border-gray-200 p-6">
    {currentStep > 1 ? (
      <button
        onClick={handleBack}
        className="px-8 py-3 bg-white text-gray-700 font-bold rounded-xl border-2 border-gray-300 hover:bg-gray-100 transition-colors flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back</span>
      </button>
    ) : (
      <Link
        href="/admin/orders"
        className="px-8 py-3 bg-white text-gray-700 font-bold rounded-xl border-2 border-gray-300 hover:bg-gray-100 transition-colors"
      >
        Cancel
      </Link>
    )}
    {currentStep < 5 ? (
      <button
        onClick={handleNext}
        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2"
      >
        <span>Next Step</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    ) : (
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`px-8 py-3 font-bold rounded-xl transition-all flex items-center gap-2 ${
          isSubmitting
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
            : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105'
        }`}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Creating Order...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Submit Order</span>
          </>
        )}
      </button>
    )}
  </div>
  {/* Success Modal */}
  {showSuccessModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 transform scale-100 animate-bounce-in">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-black text-gray-900 text-center mb-2">Order Created!</h2>
        <p className="text-gray-600 text-center mb-6">
          Order <span className="font-bold text-blue-600">{generatedOrderId}</span> has been created successfully.
        </p>
        <div className="space-y-3">
          <button
            onClick={handleSuccessClose}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            View Order Details
          </button>
          <Link
            href="/admin/orders"
            className="block w-full px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors text-center"
          >
            Go to Orders List
          </Link>
        </div>
      </div>
    </div>
  )}
</div>
);
}