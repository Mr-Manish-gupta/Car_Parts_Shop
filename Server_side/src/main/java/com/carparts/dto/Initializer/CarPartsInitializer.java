package com.carparts.dto.Initializer;


import com.carparts.entity.Coupon;
import com.carparts.entity.User;
import com.carparts.enums.Role;
import com.carparts.repository.CouponRepository;
import com.carparts.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class CarPartsInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CouponRepository couponRepository;
    private final PasswordEncoder passwordEncoder;



    @Override
    public  void  run(String...args) throws Exception{
        String adminEmail = "admin@carparts.com";
        Optional<User> existingUser = userRepository.findByEmail(adminEmail);

        if(existingUser.isPresent()){
            User admin = existingUser.get();
            admin.setPassword(passwordEncoder.encode("AdminParts#2026"));
            admin.setRole(Role.ADMIN);
            admin.setEnabled(true);
            userRepository.save(admin);
        }else {
            User admin = User.builder()
                    .name("System Admin")
                    .email(adminEmail)
                    .password(passwordEncoder.encode("AdminParts#2026"))
                    .phoneNumber("9999999999")
                    .role(Role.ADMIN)
                    .enabled(true)
                    .build();
            userRepository.save(admin);
        }

        seedCouponIfMissing("FIRST10", "PERCENTAGE", 10.0, 999.0, 500.0, "10% Instant Discount on First Order");
        seedCouponIfMissing("SAVE20", "PERCENTAGE", 20.0, 2499.0, 1000.0, "20% Discount on Orders Above ₹2,499");
        seedCouponIfMissing("WELCOME500", "FLAT", 500.0, 4999.0, null, "Flat ₹500 Off on Premium Service Kits");
    }


    private void seedCouponIfMissing (String code, String  type, Double value, Double minOrder, Double maxOrder, String  desc){
        if(couponRepository.findByCodeIgnoreCaseAndIsActiveTrue(code).isEmpty()){
            Coupon coupon = Coupon.builder()
                    .code(code)
                    .discountType(type)
                    .discountValue(value)
                    .minOrderValue(minOrder)
                    .maxDiscountCap(maxOrder)
                    .description(desc)
                    .isActive(true)
                    .build();

            couponRepository.save(coupon);

            System.out.println(" >>> Seeded Coupon into postGreSql: " + code);
        }
    }
}
