
  import { defineConfig } from 'vite'
  import tailwindcss from '@tailwindcss/vite'
  
  export default defineConfig({
    plugins: [
      tailwindcss(),
      
    ],
    server: {port : 5175,
      proxy:{
        '/api': 'http://localhost:5001' // backend port
      }
    }
  })
