import { MenuItem, TextField, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Stack, Button } from '@mui/material';
import './App.css';
import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    mobile: '',
    email: '',
    course: '',
    dob: '',
    gender: ''
  });

  const [error, setError] = useState({});
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, [name]: value,
    });
  };

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsAlertVisible(true);
    }
  };

  // handle form reset
  const handleReset = () => {
    setFormData({
      name: '',
      address: '',
      mobile: '',
      email: '',
      course: '',
      dob: '',
      gender: ''
    });
    setError({});
    setIsAlertVisible(false); // Reset alert visibility when resetting the form
  };

  const validate = () => {
    let tempErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    const addressRegex = /^[A-Za-z0-9\s,.-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Added email validation
    const yearRegex = /^(200[2-9])-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;// Date validation

    if (!formData.name || !nameRegex.test(formData.name)) {
      tempErrors.name = 'Name should only contain letters and spaces';
    }

    if (!formData.mobile || !mobileRegex.test(formData.mobile)) {
      tempErrors.mobile = 'Mobile number must contain exactly 10 digits';
    }

    if (!formData.address || !addressRegex.test(formData.address)) {
      tempErrors.address = 'Address can only contain letters, numbers, and common punctuation';
    }

    if (!formData.email || !emailRegex.test(formData.email)) {
      tempErrors.email = 'Invalid email format';
    }
    if (!formData.dob || !yearRegex.test(formData.dob)) {
      tempErrors.dob = 'The candidate must be atleast 15 years old';
    }

    setError(tempErrors);

    // Return true if no errors
    return Object.keys(tempErrors).length === 0;
  };

  return (
    <>
      <div className='container' style={{ display: 'flex',flexWrap:'wrap', paddingTop: '0px' }}>
        <div className='form' style={{ border: 'solid white' }}>
          <h1 style={{ textAlign: 'center', marginTop: '10px', fontSize: '40px',color:'white' }}>Student Registration Form</h1>
          <form onSubmit={handleSubmit}>
            <div style={{ marginTop: '30px', marginLeft: '10px'}} className='mb-5'>
              <TextField error={!!error.name} helperText={error.name} name="name" value={formData.name} onChange={handleChange} label="Name" variant="outlined" style={{ width: '500px' }} slotProps={{
                    inputLabel: {
                        style: { color: 'white' } 
                    }
                }}  />
            </div>
            <div style={{ marginTop: '30px', marginLeft: '10px' }} className='mb-5'>
              <TextField error={!!error.address} helperText={error.address} name="address" value={formData.address} onChange={handleChange} label="Address" variant="outlined" style={{ width: '500px' }} slotProps={{
                    inputLabel: {
                        style: { color: 'white' } 
                    }
                }}  />
            </div>
            <div style={{ marginTop: '30px', marginLeft: '10px' }} className='mb-5'>
              <TextField error={!!error.mobile} helperText={error.mobile} name="mobile" value={formData.mobile} onChange={handleChange} label="Mobile" variant="outlined" style={{ width: '500px' }} slotProps={{
                    inputLabel: {
                        style: { color: 'white' } 
                    }
                }} />
            </div>
            <div style={{ marginTop: '30px', marginLeft: '10px' }} className='mb-5 '>
              <TextField error={!!error.email} helperText={error.email} name="email" value={formData.email} onChange={handleChange} type='email' label="Email" variant="outlined" style={{ width: '500px' }} slotProps={{
                    inputLabel: {
                        style: { color: 'white' } 
                    }
                }} />
            </div>
            <div style={{ marginTop: '30px', marginLeft: '10px' }} className='mb-5'>
              <TextField name="course" value={formData.course} onChange={handleChange} select label="Course" variant="outlined" style={{ width: '500px' }}slotProps={{
                    inputLabel: {
                        style: { color: 'white' } 
                    }
                }}  >
                <MenuItem value="biology">Biology</MenuItem>
                <MenuItem value="computer science">Computer Science</MenuItem>
                <MenuItem value="commerce">Commerce</MenuItem>
                <MenuItem value="humanities">Humanities</MenuItem>
              </TextField>
            </div>

            <div className='GENDER'>
              <div style={{ marginTop: '30px', marginLeft: '10px' }} className='mb-5'>
                <TextField name="dob" error={!!error.dob} helperText={error.dob} value={formData.dob} onChange={handleChange} label="Date of Birth" variant="outlined" type='date' style={{ width: '220px' }} slotProps={{ inputLabel:{shrink: true,style: { color: 'white' } } }} />
              </div>

              {/* Gender Field - Radio Button */}
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend"></FormLabel>
                      <RadioGroup
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        row>
                        <FormControlLabel style={{ marginTop: '40px', marginLeft: '20px' }} value="Male" control={<Radio />} label="Male" />
                        <FormControlLabel style={{ marginTop: '40px' }} value="Female" control={<Radio />} label="Female" />
                        <FormControlLabel style={{ marginTop: '40px' }} value="Other" control={<Radio />} label="Other" />
                      </RadioGroup>
                   </FormControl>
                </Grid>
              </Grid>

            </div>

            <Stack direction="row" spacing={2}>
              <Button type='submit' variant="contained" className='bg-dark' style={{ width: '40%', height: '60px', marginLeft: '30px', marginTop: '15px', backgroundColor: 'blue', borderRadius: '30px' }}>Register</Button>
              <Button onClick={handleReset} variant="outlined" style={{ width: '40%', height: '60px', marginLeft: '30px', marginTop: '15px', backgroundColor: 'blue', color: 'white', borderRadius: '30px' }}>RESET</Button>
            </Stack>

          </form>
        </div>
      </div>

      {isAlertVisible && (
        <div className='container' style={{ display: 'flex',flexWrap:'wrap', backgroundColor: '#04043c', justifyContent: 'center', width: '500px',height:'370px', margin: 'auto', borderRadius: '20px', position: 'fixed', top: '0%', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
          <div style={{ color: 'white' }}>
            <h2 style={{ margin: '1rem 0px', color: 'yellow' }}>Registration Complete Successfully</h2>
            <h3 style={{ marginTop: '1rem' }}>Name: {formData.name}</h3>
            <h3 style={{ marginTop: '1rem' }}>Address: {formData.address}</h3>
            <h3 style={{ marginTop: '1rem' }}>Mobile: {formData.mobile}</h3>
            <h3 style={{ marginTop: '1rem' }}>Email: {formData.email}</h3>
            <h3 style={{ marginTop: '1rem' }}>Course: {formData.course}</h3>
            <h3 style={{ marginTop: '1rem' }}>DOB: {formData.dob}</h3>
            <h3 style={{ margin: '1rem 0px' }}>Gender: {formData.gender}</h3>
            <button onClick={() => setIsAlertVisible(false)} style={{
              position:'absolute',
               left: '50%', transform: 'translateX(-50%)',
               bottom:'10px',
              padding: '10px 20px',
              backgroundColor: 'orangered',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize:'1.2rem'
            }}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;