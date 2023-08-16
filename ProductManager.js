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

        ProductManager.id++;
      }
    } catch (error) {
      console.log(error);
    }
  }


  async getProductsById(id) {
    const data = await this.getProducts();
    const foundProduct = data.find((prod) => prod.id === id);
    if (!foundProduct) {
      console.error(
        "Error, el ID ingresado no coincide con ningun producto. Ingrese un ID válido"
      );
      return;
    }
    return foundProduct;
  }


  async deleteProduct(id) {
    const data = await this.getProducts();
    const findDelete = data.findIndex((prod) => prod.id === id);
    if (findDelete !== -1) {
      data.splice(findDelete, 1);

      try {
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(data, null, "\t")
        );
        console.log(`Producto con id: ${id} eliminado.`);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("No se encontro el producto que se desea eliminar");
    }
  }


  async updateProduct(id, productChanged) {
    const data = await this.getProducts();
    const findProduct = data.find((prod) => prod.id === id);

    if (findProduct) {
      Object.assign(findProduct, productChanged);
      productChanged.id = id;
      await fs.promises.writeFile(this.path, JSON.stringify(data, null, "\t"));
      return findProduct;
    } else {
      console.log(error);
      return null;
    }
  }


  async getProductRepetido(code) {
    const data = await this.getProducts();
    const repetido = data.find((prod) => prod.code === code);
    if (repetido) {
      console.log("Producto repetido", repetido);
      return repetido;
    }
    return undefined;
  }
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
