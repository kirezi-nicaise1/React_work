import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './App.css';

// Change yup.date() to yup.string() for year field
const schema = yup.object().shape({
  carMake: yup.string().required('Car Make is required'),
  carModel: yup.string().required('Car Model is required'),
  // year: yup.date().required('Year is required'),
  year: yup.string().required('Year is required'),

  mileage: yup.number().required('Mileage is required'),
  condition: yup.string().required('Condition is required'),
  features: yup.array().min(1, 'At least one feature is required').of(
    yup.string().required()
  ),
  transmission: yup.string(),
  priceRange: yup.string(),
  // Add validation schema for contactNumber field
  contactNumber: yup.number().positive().integer().required('Contact Number is required'),
});

const CarSellForm = () => {
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [condition, setCondition] = useState('');
  const [features, setFeatures] = useState([]);
  const [transmission, setTransmission] = useState('');
  const [priceRange, setPriceRange] = useState('0');
  const [contactNumber, setContactNumber] = useState();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    data.priceRange = parseInt(data.priceRange); // Convert priceRange to a number
    data.transmission=transmission
    console.log(data);
  };

  const featuresOptions = [
    { label: 'Air Conditioning', value: 'airConditioning' },
    { label: 'Power Steering', value: 'powerSteering' },
    { label: 'Power Windows', value: 'powerWindows' },
    { label: 'ABS', value: 'abs' },
    { label: 'Navigation System', value: 'navigationSystem' },
  ];

  return (
    <div className="main">
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className='label'>
        Car Make:
        <input
          type="text"
          {...register('carMake')}
          value={carMake}
          onChange={(e) => setCarMake(e.target.value)}
        />
        {errors.carMake && <p>{errors.carMake.message}</p>}
      </label> <br /><br />

      <label>
        Car Model:
        <input
          type="text"
          {...register('carModel')}
          value={carModel}
          onChange={(e) => setCarModel(e.target.value)}
        />
        {errors.carModel && <p>{errors.carModel.message}</p>}
      </label> <br /><br />

      <label>
        Year:
        <input
          type="date"
          {...register('year')}
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        {errors.year && <p>{errors.year.message}</p>}
      </label> <br /> <br />

      <label>
        Mileage:
        <input
          type="number"
          {...register('mileage')}
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
        />
        {errors.mileage && <p>{errors.mileage.message}</p>}
      </label> <br /><br />

      <label>
        Condition:
        <div>
          <label>
            <input
              type="radio"
              value="Excellent"
              {...register('condition')}
              checked={condition === 'Excellent'}
              onChange={(e) => setCondition(e.target.value)}
            />
            Excellent
          </label> <br /><br />

          <label>
            <input
              type="radio"
              value="Good"
              {...register('condition')}
              checked={condition === 'Good'}
              onChange={(e) => setCondition(e.target.value)}
            />
            Good
          </label> <br /><br />

          <label>
            <input
              type="radio"
              value="Fair"
              {...register('condition')}
              checked={condition === 'Fair'}
              onChange={(e) => setCondition(e.target.value)}
            />
            Fair
          </label> <br /><br />

          <label>
            <input
              type="radio"
              value="Poor"
              {...register('condition')}
              checked={condition === 'Poor'}
              onChange={(e) => setCondition(e.target.value)}
            />
            Poor
          </label> <br /><br />
        </div>
        {errors.condition && <p>{errors.condition.message}</p>}
      </label>

      <label>
        Features:
        <div>
          {featuresOptions.map((option) => (
            <label key={option.value}>
              <input
                type="checkbox"
                value={option.value}
                checked={features.includes(option.value)}
                onChange={(e) => {
                  const value = option.value;
                  if (e.target.checked) {
                    setFeatures((prevFeatures) => [...prevFeatures, value]);
                  } else {
                    setFeatures((prevFeatures) =>
                      prevFeatures.filter((feature) => feature !== value)
                    );
                  }
                }}
              />
              {option.label}
            </label> 
          ))}
        </div>
        {errors.features && <p>{errors.features.message}</p>}
      </label>

      <label> <br /><br />
  Transmission:
  <select
    value={transmission}
    onChange={(e) => {
      setTransmission(e.target.value);
      register('transmission'); // Move register function inside the onChange event handler
    }}
  >
    <option value="">Select Transmission</option>
    <option value="Automatic">Automatic</option>
    <option value="Manual">Manual</option>
  </select>
  {errors.transmission && <p>{errors.transmission.message}</p>}
</label> <br /><br />


      <label>
        Price Range:
        <input
          type="range"
          min="0"
          max="100"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          {...register('priceRange')}
        />
        {errors.priceRange && <p>{errors.priceRange.message}</p>}
        <span>{priceRange}</span> {/* Display the current value */}
      </label>  <br /><br />




      <label>
        Contact Number:
        <input
          type="number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          {...register('contactNumber')}
        />
        {errors.contactNumber && <p>{errors.contactNumber.message}</p>}
      </label>

      <button type="submit">Submit</button>
    </form>
    </div>
  );
};
export default CarSellForm;
