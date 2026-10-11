package com.carparts.repository;

import com.carparts.entity.SellerRequest;
import com.carparts.enums.SellerStatus;
import com.carparts.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface SellerRequestRepository extends JpaRepository<SellerRequest, Long> {

    List<SellerRequest>findByStatus(SellerStatus status);
    Optional<SellerRequest> findByUserAndStatus(User user, SellerStatus status);
}
