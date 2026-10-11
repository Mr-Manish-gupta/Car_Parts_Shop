package com.carparts.controller;


import com.carparts.entity.Address;
import com.carparts.security.CustomUserDetails;
import com.carparts.service.AddressService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/addresses")
@CrossOrigin(origins = "http://localhost:3000")
public class AddressController {


    private final AddressService addressService;


    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @PostMapping
    public ResponseEntity<Address> addAddress(@RequestBody Address address ,
                                    @AuthenticationPrincipal CustomUserDetails userDetails){
        Address savedAddress =  addressService.saveAddress(userDetails.getUser(), address);
        return ResponseEntity.ok(savedAddress);
    }


    @GetMapping
    public ResponseEntity<List<Address>> getAddresses(@AuthenticationPrincipal CustomUserDetails userDetails){
        List<Address> addresses =
                addressService.getUserAddresses(userDetails.getUser());
        return ResponseEntity.ok(addresses);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String ,String>> deleteAddress(@PathVariable Long id,
                                                             @AuthenticationPrincipal CustomUserDetails userDetails){
        addressService.deleteAddress(userDetails.getUser(),id);
        Map<String, String > response = new HashMap<>();
        response.put("Status", "Address deleted successfully");
        return ResponseEntity.ok(response);
    }
}
