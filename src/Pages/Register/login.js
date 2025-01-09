  //Getting  UserData Function
export async function fetchUserData() {
    try {
      const url="http://localhost:3000/accounts"
      // Fetch options
      const options = {
        method: 'GET', // Specify the request method
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
      };
  
      // Await the fetch call
      const response = await fetch(url, options);
  
      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the JSON response
      const result = await response.json();
  
      // Log the result
      console.log('Success:', result);
      return result; // Return the parsed result
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  }

  // UserData Function

 const userLogin = async ()=>{

    const userData = await fetchUserData()
    console.log("🚀 ~ userLogin ~ userData:", userData)

    

    //Referance FILTER Returns All the element that matches the data
    // const userfilter = userData.filter((data)=> {
    //  return ( data.email == userEmail.email && data.password ==userEmail.password)
    // })

    //Referance Some Returns True or False
    // const usersome = userData.some((data)=> {
    // return ( data.email == userEmail.email && data.password ==userEmail.password)
    // })

    //Referance FIND Returns First Element It finds
    let userEmail ={"email":"mlolo80013@gmail.com","password":"mano@6"}

    const userfind = userData.find((data)=> {
        return ( data.email == userEmail.email && data.password ==userEmail.password)
        })
     
    // if (userfind) {   
    //     console.log("User exists:", userfind);
    //     alert(`you are Logged in ${userfind.firstName}`)
    //   } else {
    //     console.log("🚀 ~ userfind ~ userfind:", userfind)
    //     alert("User does not exist");
    //   }
    
      userCookies("Auth",userfind,'1')
 

    
 }
 userLogin()
 function userCookies(name, value, daysToExpire) {
    const date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    const userData=   JSON.stringify(value)
    console.log(userData)
    document.cookie = `${name}=${(userData)}; ${expires}; path=/`;
}
