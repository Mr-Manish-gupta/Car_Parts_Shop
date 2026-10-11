package com.carparts.service;


import com.carparts.entity.SellerProfile;
import com.carparts.entity.SellerRequest;
import com.carparts.entity.User;
import com.carparts.enums.Role;
import com.carparts.enums.SellerStatus;
import com.carparts.exception.ResourceNotFoundException;
import com.carparts.repository.SellerProfileRepository;
import com.carparts.repository.SellerRequestRepository;
import com.carparts.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final SellerRequestRepository sellerRequestRepository;
    private final SellerProfileRepository sellerProfileRepository;
    private final UserRepository userRepository;


    public AdminService(
            SellerRequestRepository sellerRequestRepository,
            SellerProfileRepository sellerProfileRepository,
            UserRepository userRepository
    ){
        this.sellerRequestRepository = sellerRequestRepository;
        this.sellerProfileRepository = sellerProfileRepository;
        this.userRepository = userRepository;
    }



    @Transactional
    public String approveSellerRequest (Long requestId){
        SellerRequest request = sellerRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Seller request not found with ID:" + requestId));

        if(request.getStatus() != SellerStatus.PENDING){
            throw new IllegalStateException("This request is not pending");
        }

        request.setStatus(SellerStatus.APPROVED);
        sellerRequestRepository.save(request);


        User user = request.getUser();
        user.setRole(Role.SELLER);
        userRepository.save(user);

        SellerProfile profile = SellerProfile.builder()
                .user(user)
                .businessName(request.getBusinessName())
                .businessAddresss(request.getBusinessAddress())
                .panNumber(request.getPanNumber())
                .gstin(request.getGstin())
                .build();

        sellerProfileRepository.save(profile);
        return "Seller request approved! User is now a registered seller";
    }

    @Transactional
    public String rejectSellerRequest (Long requestId){
        SellerRequest request = sellerRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Seller request not found with Id:" + requestId));

        if(request.getStatus() != SellerStatus.PENDING){
            throw new IllegalStateException("This request is not pending");
        }

        request.setStatus(SellerStatus.REJECTED);
        sellerRequestRepository.save(request);

        return "Seller request rejected! User is now a registered seller";
    }


    public List<SellerRequest> getPendingRequests() {
     return sellerRequestRepository.findByStatus(SellerStatus.PENDING);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public List<SellerProfile> getSellerProfiles() {
        return sellerProfileRepository.findAll();
    }
}
