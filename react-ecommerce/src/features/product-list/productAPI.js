// A mock function to mimic making an async request for data

export function fetchProductById(id) {
  return new Promise(async (resolve) =>{
    const response = await fetch('/products/'+id);
    const data = await response.json();
    resolve({data});
  } 
  );
}

export function createProduct(product) {
  return new Promise(async (resolve) =>{
    const response = await fetch('/products/', {
      method: 'POST',
      body: JSON.stringify(product),
      headers : {'content-type': 'application/json'},
    });
    const data = await response.json();
    resolve({data});
  } 
  );
}

export function updateProduct(update){
  return new Promise(async (resolve) => {
    const response = await fetch('/products/' + update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: {'content-type': 'application/json'},
    })
    const data = await response.json();
    resolve({data});
  })
}
export function fetchProductsByFilters(filter, sort, pagination, admin) {
  // filter = {"category": "smartphone"}
  let queryString = '';

  for(let key in filter){
    const categoryValues = filter[key];  // filter[key] is the array of the brands(category) n we have to get its last value
    if(categoryValues.length > 0){
      const lastCategoryValue = categoryValues[categoryValues.length-1];
      queryString += `${key}=${lastCategoryValue}&`
    }
  }

  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }
  console.log('pagination ', pagination);
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`;
    console.log(queryString);
  }
  if(admin){
    queryString += `admin=true`;
  }
  
  return new Promise(async (resolve) =>{
    const response = await fetch('/products?' + queryString );
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count');  // returns the total number of products getting from the api
    resolve({data: {products:data, totalItems: +totalItems}});
  } 
  );
}


export function fetchCategories() {
  return new Promise(async (resolve) =>{
    const response = await fetch('/categories');
    const data = await response.json();
    resolve({data});
  } 
  );
}

export function fetchBrands() {
  return new Promise(async (resolve) =>{
    const response = await fetch('/brands');
    const data = await response.json();
    resolve({data});
  } 
  );
}
