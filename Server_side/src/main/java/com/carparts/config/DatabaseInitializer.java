package com.carparts.config;

import com.carparts.entity.Car;
import com.carparts.entity.Category;
import com.carparts.entity.Product;
import com.carparts.entity.ProductCarCompatibility;
import com.carparts.entity.User;
import com.carparts.enums.Role;
import com.carparts.repository.CarRepository;
import com.carparts.repository.CategoryRepository;
import com.carparts.repository.ProductCarCompatibilityRepository;
import com.carparts.repository.ProductRepository;
import com.carparts.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class DatabaseInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final CarRepository carRepository;
    private final ProductRepository productRepository;
    private final ProductCarCompatibilityRepository compatibilityRepository;
    private final PasswordEncoder passwordEncoder;
    private final JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        // 0. Drop obsolete typo column 'modal' if it exists in PostgreSQL
        try {
            jdbcTemplate.execute("ALTER TABLE cars DROP COLUMN IF EXISTS modal");
        } catch (Exception e) {
            System.out.println(">>> Schema cleanup notice: " + e.getMessage());
        }

        // 1. Initialize Default Admin Account
        String adminEmail = "admin@carparts.com";
        Optional<User> existingUser = userRepository.findByEmail(adminEmail);

        if (existingUser.isPresent()) {
            User admin = existingUser.get();
            admin.setPassword(passwordEncoder.encode("AdminParts#2026"));
            admin.setRole(Role.ADMIN);
            admin.setEnabled(true);
            userRepository.save(admin);
            System.out.println(">>> Existing ADMIN password refreshed to AdminParts#2026");
        } else {
            User admin = User.builder()
                    .name("System Admin")
                    .email(adminEmail)
                    .password(passwordEncoder.encode("AdminParts#2026"))
                    .phoneNumber("9999999999")
                    .role(Role.ADMIN)
                    .enabled(true)
                    .build();

            userRepository.save(admin);
            System.out.println(">>> Default ADMIN account successfully initialized");
        }

        // 2. Initialize Default Categories if empty
        if (categoryRepository.count() == 0) {
            List<String> defaultCategories = Arrays.asList(
                    "Brake Systems",
                    "Engine & Transmission",
                    "Suspension & Steering",
                    "Electrical & Lighting",
                    "Body & Exterior",
                    "Exhaust & Cooling"
            );

            for (String catName : defaultCategories) {
                categoryRepository.save(Category.builder().name(catName).build());
            }
            System.out.println(">>> Initialized " + defaultCategories.size() + " default product categories in PostgreSQL");
        }

        // 3. Initialize Default Popular Cars if empty
        if (carRepository.count() == 0) {
            List<Car> defaultCars = Arrays.asList(
                    Car.builder().brand("Maruti").model("Swift").year(2022).variant("VXi 1.2L").fuelType("Petrol").build(),
                    Car.builder().brand("Maruti").model("Baleno").year(2023).variant("Zeta 1.2L").fuelType("Petrol").build(),
                    Car.builder().brand("Hyundai").model("Creta").year(2023).variant("SX 1.5L").fuelType("Petrol").build(),
                    Car.builder().brand("Hyundai").model("i20").year(2021).variant("Asta 1.2L").fuelType("Petrol").build(),
                    Car.builder().brand("Tata").model("Nexon").year(2022).variant("XZ+ 1.2L").fuelType("Petrol").build(),
                    Car.builder().brand("Tata").model("Punch").year(2023).variant("Creative 1.2L").fuelType("Petrol").build(),
                    Car.builder().brand("Mahindra").model("Scorpio-N").year(2022).variant("Z8 2.2L").fuelType("Diesel").build(),
                    Car.builder().brand("Honda").model("City").year(2021).variant("ZX 1.5L").fuelType("Petrol").build()
            );

            carRepository.saveAll(defaultCars);
            System.out.println(">>> Initialized " + defaultCars.size() + " popular Indian car models in PostgreSQL");
        }

        // 4. Initialize or Synchronize Default Real Products
        User seller = userRepository.findByEmail(adminEmail).orElse(null);
        List<Category> allCategories = categoryRepository.findAll();
        List<Car> allCars = carRepository.findAll();

        if (!allCategories.isEmpty() && !allCars.isEmpty()) {
            Category brakeCat = allCategories.stream().filter(c -> c.getName().toLowerCase().contains("brake")).findFirst().orElse(allCategories.get(0));
            Category engineCat = allCategories.stream().filter(c -> c.getName().toLowerCase().contains("engine")).findFirst().orElse(allCategories.get(0));
            Category suspensionCat = allCategories.stream().filter(c -> c.getName().toLowerCase().contains("suspension")).findFirst().orElse(allCategories.get(0));
            Category electricalCat = allCategories.stream().filter(c -> c.getName().toLowerCase().contains("electrical")).findFirst().orElse(allCategories.get(0));
            Category bodyCat = allCategories.stream().filter(c -> c.getName().toLowerCase().contains("body")).findFirst().orElse(allCategories.get(0));

            // Product 1: Bosch Brake Pads
            List<String> p1Images = Arrays.asList(
                    "https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80"
            );
            upsertProduct("BP-BSH-9921", "Bosch QuietCast Front Ceramic Brake Pad Set",
                    "Premium ceramic formulation for silent braking, low dust, and exceptional thermal stability under heavy city braking conditions.",
                    new BigDecimal("1850.00"), 30, p1Images, brakeCat, seller, allCars);

            // Product 2: Mobil 1 Synthetic Engine Oil
            List<String> p2Images = Arrays.asList(
                    "https://images.unsplash.com/photo-1635773054018-22c66315264b?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80"
            );
            upsertProduct("MO-SYN-0020", "Mobil 1 Advanced Full Synthetic Engine Oil 0W-20 (3.5L)",
                    "Engineered with Triple Action Formula for unmatched engine performance, thermal breakdown resistance, and enhanced fuel economy.",
                    new BigDecimal("3499.00"), 45, p2Images, engineCat, seller, allCars);

            // Product 3: Monroe Shock Absorber
            List<String> p3Images = Arrays.asList(
                    "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&auto=format&fit=crop&q=80"
            );
            upsertProduct("SA-MNR-4412", "Monroe OESpectrum Front Gas Shock Absorber Strut",
                    "Nitrogen gas-charged strut with Twin Technology Active Control System for reduced body roll and smooth highway handling.",
                    new BigDecimal("2890.00"), 20, p3Images, suspensionCat, seller, allCars);

            // Product 4: Philips LED Headlights
            List<String> p4Images = Arrays.asList(
                    "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?w=800&auto=format&fit=crop&q=80"
            );
            upsertProduct("LT-PHL-1297", "Philips Ultinon Pro9000 H4 High-Output LED Headlight Set",
                    "Up to 250% brighter crisp white 5800K light beam for safer night driving with integrated AirBoost cooling.",
                    new BigDecimal("2150.00"), 35, p4Images, electricalCat, seller, allCars);

            // Product 5: Mercedes-Benz Car Brack Parts (Edited by user)
            List<String> p5Images = Arrays.asList(
                    "https://www.pngitem.com/pimgs/m/287-2875989_add-more-life-to-your-car-car-parts.png",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqIEIjxPGqMV6Bh9gCAVI7tC4VXIdBIETp1eJTPKfg5w&s=10",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqIEIjxPGqMV6Bh9gCAVI7tC4VXIdBIETp1eJTPKfg5w&s=10",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqIEIjxPGqMV6Bh9gCAVI7tC4VXIdBIETp1eJTPKfg5w&s=10"
            );
            upsertProduct("BR-BRM-8831", "Mercedes-Benz Car Brack Parts",
                    "Add More Life To Your Car - Car Parts Png, Transparent Png ",
                    new BigDecimal("4200.00"), 18, p5Images, brakeCat, seller, allCars);

            // Product 6: Bosch Wiper Blades
            List<String> p6Images = Arrays.asList(
                    "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&auto=format&fit=crop&q=80"
            );
            upsertProduct("WB-BSH-2216", "Bosch Clear Advantage Frameless All-Weather Wiper Blades (Set)",
                    "Precision-tensioned steel spring creates uniform pressure across the entire windscreen for crystal clear visibility in all downpours.",
                    new BigDecimal("780.00"), 60, p6Images, bodyCat, seller, allCars);

            System.out.println(">>> Synchronized real automotive products with full car compatibility in PostgreSQL");
        }
    }

    private Product upsertProduct(String partNumber, String name, String description, BigDecimal price, int stock,
                                  List<String> images, Category category, User seller, List<Car> allCars) {
        Product p = productRepository.findByPartNumber(partNumber).orElse(new Product());
        p.setPartNumber(partNumber);
        p.setName(name);
        p.setDescription(description);
        p.setPrice(price);
        p.setStock(stock);
        p.setCategory(category);
        p.setSeller(seller);
        if (images != null && !images.isEmpty()) {
            p.setImageUrl(images.get(0));
            p.setImages(new java.util.ArrayList<>(images));
        }
        Product saved = productRepository.save(p);

        if (compatibilityRepository.findByProduct(saved).isEmpty()) {
            for (Car car : allCars) {
                compatibilityRepository.save(ProductCarCompatibility.builder()
                        .product(saved)
                        .car(car)
                        .build());
            }
        }
        return saved;
    }
}
