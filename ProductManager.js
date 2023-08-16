const fs = require("fs");

class ProductManager {
  products;
  static id = 0;

  constructor() {
    this.products = [];
    this.path = "./products.json";

    if (fs.existsSync(this.path)) {
        const content = fs.readFileSync(this.path, "utf-8");
        const products = JSON.parse(content);
        if (products.length > 0) {
          ProductManager.id = products[products.length - 1].id + 1;
        }
      }
  }

  async getProducts() {
    const data = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    return data;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const product = {
      id: ProductManager.id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    try {
        if (!fs.existsSync(this.path)) {
          const arrayProducts = [];
          arrayProducts.push(product);
      
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(arrayProducts, null, "\t")
          );
        } else {
          const content = await this.getProducts();
          console.log("File content:", content);
      
          content.push(product);
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(content, null, "\t")
          );
      
          ProductManager.id++; // Incrementar el ID después de actualizar el archivo
        }
      } catch (error) {
        console.log(error);
      }
      

    // if (
    //   product.title === undefined ||
    //   product.id === undefined ||
    //   product.description === undefined ||
    //   product.price === undefined ||
    //   product.thumbnail === undefined ||
    //   product.code === undefined ||
    //   product.stock === undefined
    // ) {
    //   console.error("Faltan completar campos");
    //   return;
    // }

    //  this.products.push(product);
    //  ProductManager.id++;
    // return product;
  }

  //   async getProducts() {
  //     const data = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
  //     return data;
  //   }

  //   getProductsById(id) {
  //     const foundProduct = this.products.find((prod) => prod.id === id);
  //     if (!foundProduct) {
  //       console.error(
  //         "Error, el ID ingresado no coincide con ningun producto. Ingrese un ID válido"
  //       );
  //       return;
  //     }
  //     return console.log(
  //       "El id ingresado corresponde al siguiente producto: ",
  //       foundProduct
  //     );
  //   }

  //   getProductRepetido(code) {
  //     const repetido = this.products.find((prod) => prod.code === code);
  //     if (repetido) {
  //       console.log("Producto repetido", repetido);
  //       return repetido;
  //     }
  //   }
}

const asyncFunction = async () => {
  const manager = new ProductManager();
  await manager.addProduct(
    "producto prueba2",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  );
  await manager.getProducts();
};

asyncFunction();

// manager.addProduct(
//   "producto prueba2",
//   "Este es un producto prueba2",
//   200,
//   "Sin imagen2",
//   "abc123",
//   10
// );

// const verProducts = manager.getProducts();
// console.log("Products:", verProducts);

// const productoBuscado = manager.getProductsById(4);

// const productoRepetido = manager.getProductRepetido("abc123");
