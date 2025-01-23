// src/index.js

// Add a button to the HTML body to trigger the dynamic import
document.body.innerHTML = '<button id="loadHello">Load Hello Module</button>';

// Add an event listener to the button
document.getElementById('loadHello').addEventListener('click', () => {
  // Use dynamic import to load the hello.js module
  import('./hello')
    .then((module) => {
      module.sayHello(); // Call the function from the dynamically loaded module
    })
    .catch((err) => {
      console.error('Failed to load module', err);
    });
});
