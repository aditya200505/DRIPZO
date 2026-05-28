async function testLogin() {
  console.log('Testing login request to http://localhost:5000/api/auth/login...');
  
  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'avajpayee2005@gmail.com',
        password: 'Aditya123'
      })
    });
    
    console.log('Response Status:', res.status);
    const text = await res.text();
    console.log('Response Text:', text);
  } catch (error) {
    console.error('Error during fetch:', error.message);
  }
}

testLogin();
