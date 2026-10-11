package com.carparts.service;

import com.carparts.entity.Address;
import com.carparts.entity.User;
import com.carparts.exception.BadRequestException;
import com.carparts.exception.ResourceNotFoundException;
import com.carparts.repository.AddressRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class AddressService {

    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }


    public Address saveAddress(User user , Address address){
        address.setUser(user);

        return addressRepository.save(address);
    }

    public List<Address> getUserAddresses(User user){
        return addressRepository.findByUser(user);
    }

    public void deleteAddress(User user, Long addressId){
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Not found address with id: " + addressId));
         if(!address.getUser().getId().equals(user.getId())){
             throw new BadRequestException("You are not authorized to perform this operation");
         }
         addressRepository.delete(address);
    }
}
