package com.carparts.service;

import com.carparts.dto.seller.SellerRequestDto;
import com.carparts.entity.SellerRequest;
import com.carparts.enums.SellerStatus;
import com.carparts.exception.BadRequestException;
import com.carparts.repository.SellerRequestRepository;
import jakarta.transaction.Transactional;
import com.carparts.entity.User;
import org.springframework.stereotype.Service;
@Service
public class SellerService {

    private final SellerRequestRepository sellerRequestRepository;

    public SellerService(SellerRequestRepository sellerRequestRepository){
        this.sellerRequestRepository = sellerRequestRepository;
    }


    @Transactional
    public String applyToBecomeSeller(SellerRequestDto sellerRequestDto, User currentUser){
        sellerRequestRepository.findByUserAndStatus(currentUser , SellerStatus.PENDING)
                .ifPresent(r -> {throw new BadRequestException("You already pending request!");
                });

        SellerRequest request = SellerRequest.builder()
                .user(currentUser)
                .businessName(sellerRequestDto.getBusinessName())
                .businessAddress(sellerRequestDto.getBusinessAddress())
                .gstin(sellerRequestDto.getGstin())
                .panNumber(sellerRequestDto.getPanNumber())
                .status(SellerStatus.PENDING)
                .build();


        sellerRequestRepository.save(request);
        return "Seller application submitted successfully! Waiting for Admin approval.";

    }
}
