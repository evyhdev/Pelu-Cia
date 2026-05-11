import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        adotar: resolve(__dirname, "src/pages/adotar.html"),
        ajudar: resolve(__dirname, "src/pages/ajudar.html"),
        noticias: resolve(__dirname, "src/pages/noticias.html"),
        sobre: resolve(__dirname, "src/pages/sobre.html"),
        voluntario: resolve(__dirname, "src/pages/voluntario.html"),
      },
    },
  },
});
