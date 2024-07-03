// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' }
    });
    const data = await response.json();
    resolve({ data });
  }
  );
}

export function signOut(userId) {
  return new Promise(async (resolve) => {

    resolve({ data: 'success' });
  }
  );
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: { 'content-type': 'application/json' },
      });
      console.log('this is login info coming, ', loginInfo);
      console.log('and response', response);
      if (response.ok) {
        const data = await response.json();
        console.log({ data });
        resolve({ data });
      } else {
        console.log('i am in error of loginUser in authAPi');
        const error = await response.text();
        reject( error);
      }
    } catch (error) {
        reject(error);
    }
    // if(data){
    //   if(password===data[0].password) {resolve({data: data[0]});}
    //   else {reject({message: 'wrong credentials'})}
    // }
    // else{
    //   reject({message:' user not found'});
    // }
  }
  );
}


export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/check');

      if (response.ok) {
        const data = await response.json();
        console.log({ data });
        resolve({ data });
      } else {
        const error = await response.text();
        console.log('in the error of cheeck auth');
        reject( error);
      }
    } catch (error) {
      console.log(' i am in catch of authApi checkAuth');
        reject(error);
    }
  
  }
  );
}

