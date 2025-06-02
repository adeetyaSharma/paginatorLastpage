package com.example.demo.service;

import com.example.demo.model.Product;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    List<Product> products = new ArrayList<>();

    @PostConstruct
    public void init() throws IOException {
        String content = new String(Files.readAllBytes(Paths.get("src/main/resources/db.json")));
        JSONObject root = new JSONObject(content);
        JSONArray productsArray = root.getJSONArray("products");

        // Mapping to product objects
        for (int i = 0; i < productsArray.length(); i++) {
            JSONObject productJson = productsArray.getJSONObject(i);
            Product product = new Product();
            product.setId(productJson.getInt("id"));
            product.setTitle(productJson.getString("title"));
            product.setDescription(productJson.getString("description"));
            product.setPrice(productJson.getDouble("price"));
            product.setCategory(productJson.getString("category"));

            products.add(product);
        }
    }

    // Total number of entries in the array in db.json
    public long getTotalProductCount() {
        return products.toArray().length;
    }

    // Pagianted Products list
    public List<Product> getProductByPageNumber(int pageNumber) {
        List<Product>test = new ArrayList<>();
        test.addAll(products.subList((pageNumber-1)*1000,pageNumber*1000));
        return test;
    }
}
