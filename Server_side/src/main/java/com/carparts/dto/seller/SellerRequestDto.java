package com.carparts.dto.seller;


import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SellerRequestDto {

    @NotBlank(message = "Business name cannot be blank")
    private String businessName;

    @NotBlank(message = "Business address cannot be blank")
    private String businessAddress;

    @NotBlank(message = "PanNumber cannot be blank")
    private String panNumber;

    @NotBlank(message = "GSTIN cannot be blank")
    private String gstin;

}
