export const fetchCarDataByMake = (makeName: string) => {
    return new Promise((resolve, reject) => {
        // Fetch the JSON data from the public directory
        fetch('/data.json')
            .then(response => {
                // Check if the request was successful
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Parse the JSON data
            })
            .then(data => {
                // Filtering the data based on makeName
            setTimeout(() => {
                const result = data.data.find(car => car.makeName === makeName || car.makeMaskingName === makeName || car.modelName === makeName || car.modelMaskingName === makeName);
                if (result) {
                    resolve(result); // Resolve with the found car
                } else {
                    reject('Car make not found'); // Reject if no match found
                }
            }, 2000);
               
            })
            .catch(error => {
                reject(`Error fetching the car data: ${error.message}`); // Handle any errors
            });
    });
}


export const fetchCarListFromJson = () => {
    return new Promise((resolve, reject) => {
        // Fetch the JSON data from the public directory
        fetch('/data.json')
            .then(response => {
                // Check if the request was successful
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Parse the JSON data
            })
            .then(res => {
                const data = res.data; // Assuming `res.data` contains the array of objects
                if (!Array.isArray(data) || data.length < 12) {
                    throw new Error('Not enough data to select 12 unique items.');
                }
                
                // Function to get 12 unique random elements from an array
                const getRandomItems = (array: any[], numItems: number) => {
                    const shuffled = array.slice(); // Copy the array
                    let i = array.length;
                    while (i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
                    }
                    return shuffled.slice(0, numItems); // Return the first `numItems` elements
                };

                // Get 12 random unique items
                const selectedItems = getRandomItems(data, 12);
                
                setTimeout(() => {
                    resolve(selectedItems); // Resolve with the selected items
                }, 2500);


            })
            .catch(error => {
                reject(`Error fetching the car data: ${error.message}`); // Handle any errors
            });
    });
}


export const formatDate = (dateString: any) => {
    const date = new Date(dateString);
  
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
  
    const daySuffix = (day) => {
      if (day > 3 && day < 21) return 'th'; // most common suffix
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
  
    return `${day}${daySuffix(day)} ${month} ${year}`;
  };
